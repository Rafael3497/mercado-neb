// netlify/functions/mercadolivre.js

// Cache do token de utilizador em memória (persiste em "warm starts" da serverless function)
let cachedToken = null;
let tokenExpiraEm = 0;

/**
 * Função auxiliar para buscar os detalhes de produtos no Mercado Livre com base em uma lista de IDs.
 * Separada do handler principal para evitar recriação a cada invocação, economizando memória.
 * * @param {Array<string>} ids - Lista de IDs de produtos.
 * @param {Object} authHeaders - Cabeçalhos de autenticação contendo o Bearer Token.
 * @returns {Promise<Array<Object>>} - Retorna um array com os produtos formatados.
 */
async function buscarProdutosPorIds(ids, authHeaders) {
  const promises = ids.map(async (productId) => {
    try {
      // Dispara as duas requisições simultaneamente para ganhar performance
      const [prodRes, itemRes] = await Promise.all([
        fetch(`https://api.mercadolibre.com/products/${productId}`, { headers: authHeaders }),
        fetch(`https://api.mercadolibre.com/products/${productId}/items?limit=1`, { headers: authHeaders }),
      ]);

      if (!prodRes.ok || !itemRes.ok) return null;

      const prodData = await prodRes.json();
      const itemData = await itemRes.json();
      
      const info = itemData.results?.[0];
      if (!info || typeof info.price === 'undefined') return null;

      const productTitle = prodData.name || prodData.family_name || info.item_id;
      
      // Pega a URL pura diretamente da API do Mercado Livre
      const rawLink = info.permalink || `https://produto.mercadolivre.com.br/${info.item_id}`;

      // Tenta obter a melhor imagem disponível
      const imagem = prodData.pictures?.[0]?.url 
        || prodData.pictures?.[0]?.thumbnail 
        || null;

      const precoOriginal = info.original_price || null;
      const desconto = precoOriginal 
        ? Math.round((1 - info.price / precoOriginal) * 100) 
        : null;

      return {
        id: info.item_id,
        titulo: productTitle,
        preco: info.price,
        preco_original: precoOriginal,
        desconto: desconto,
        moeda: info.currency_id,
        link: rawLink,
        imagem: imagem,
        vendedor: "",
        condicao: info.condition === "new" ? "Novo" : "Usado",
        frete_gratis: info.shipping?.free_shipping || false,
        disponivel: true,
        vendidos: info.sold_quantity || 0,
      };
    } catch (err) {
      console.warn(`[buscarProdutos] Erro ao processar o produto ${productId}:`, err.message);
      return null;
    }
  });

  const resultados = await Promise.all(promises);
  // Remove itens nulos que falharam na requisição
  return resultados.filter(Boolean);
}

exports.handler = async (event, context) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Content-Type": "application/json",
  };

  // Responde imediatamente a requisições preflight do navegador (CORS)
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  const CLIENT_ID = process.env.ML_CLIENT_ID;
  const CLIENT_SECRET = process.env.ML_CLIENT_SECRET;
  const REFRESH_TOKEN = process.env.ML_REFRESH_TOKEN;

  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    console.error("[ERRO] Variáveis de ambiente ausentes.");
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Variáveis ML_CLIENT_ID, ML_CLIENT_SECRET e ML_REFRESH_TOKEN não configuradas." }),
    };
  }

  // ── 1. GESTÃO DO TOKEN DE AUTENTICAÇÃO ──────────────────────────────────────────
  const agora = Date.now();
  if (!cachedToken || agora >= tokenExpiraEm) {
    try {
      const tokenRes = await fetch("https://api.mercadolibre.com/oauth/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          refresh_token: REFRESH_TOKEN,
        }),
      });
      
      const tokenData = await tokenRes.json();
      console.log(`[TOKEN] Status da renovação: ${tokenRes.status} | Sucesso: ${!!tokenData.access_token}`);

      if (!tokenData.access_token) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: "Falha ao gerar access_token.", detalhes: tokenData }),
        };
      }
      
      cachedToken = tokenData.access_token;
      // Renova o token 5 minutos (300s) antes de expirar realmente para evitar falhas de borda
      tokenExpiraEm = agora + ((tokenData.expires_in || 21600) - 300) * 1000;
    } catch (e) {
      console.error("[TOKEN] Erro de rede ao obter token:", e.message);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "Erro de rede ao obter token", details: e.message }),
      };
    }
  }

  const authHeaders = {
    "Authorization": `Bearer ${cachedToken}`,
    "Accept": "application/json",
  };

  // ── 2. PARÂMETROS DA REQUISIÇÃO ───────────────────────────────────────────────
  const params = event.queryStringParameters || {};
  const categoria = params.categoria || "MLB1051";
  const limite = Math.min(parseInt(params.limite) || 20, 50); // Trava de segurança no limite
  const offset = parseInt(params.offset) || 0;
  const termoBusca = params.q ? params.q.trim() : null;
  const ordenacao = params.ordenacao || "relevance";

  // ── 3. ROTEAMENTO E LÓGICA DE BUSCA ───────────────────────────────────────────
  try {
    // ── FLUXO A: BUSCA POR TERMO ──────────────────────────────────────────────
    if (termoBusca) {
      console.log(`[BUSCA] Termo: "${termoBusca}" | Offset: ${offset} | Ordenação: ${ordenacao}`);

      let items = [];
      let total = 0;
      let buscaOffset = offset;
      const LOTE = 50;
      const MAX_ITER = 4; // Máximo de iterações para não causar timeout na Lambda

      for (let iter = 0; iter < MAX_ITER && items.length < limite; iter++) {
        const searchUrl = `https://api.mercadolibre.com/products/search?status=active&site_id=MLB&q=${encodeURIComponent(termoBusca)}&limit=${LOTE}&offset=${buscaOffset}`;
        
        console.log(`[BUSCA] Iteração ${iter + 1} | Offset Atual: ${buscaOffset}`);
        
        const searchRes = await fetch(searchUrl, { headers: authHeaders });
        if (!searchRes.ok) {
          const searchRaw = await searchRes.text();
          console.error(`[BUSCA] Erro HTTP ${searchRes.status}:`, searchRaw.slice(0, 200));
          break;
        }

        const searchData = await searchRes.json();
        total = searchData.paging?.total || total;
        
        const ids = (searchData.results || []).map(p => p.id);
        console.log(`[BUSCA] IDs recebidos nesta iteração: ${ids.length} | Total disponível no ML: ${total}`);

        if (ids.length === 0) break;

        const loteItems = await buscarProdutosPorIds(ids, authHeaders);
        console.log(`[BUSCA] Itens válidos processados no lote: ${loteItems.length}`);

        // Adiciona apenas os novos para evitar duplicatas (caso a paginação da API falhe)
        const existentes = new Set(items.map(i => i.id));
        const novos = loteItems.filter(i => !existentes.has(i.id));
        items = [...items, ...novos];

        buscaOffset += LOTE;

        if (buscaOffset >= total) break;
      }

      console.log(`[BUSCA] Total de itens válidos acumulados: ${items.length}`);

      // Corta o array para retornar apenas a quantidade requisitada
      items = items.slice(0, limite);

      // Aplica ordenação em memória se necessário
      if (ordenacao === "price_asc") items.sort((a, b) => a.preco - b.preco);
      else if (ordenacao === "price_desc") items.sort((a, b) => b.preco - a.preco);
      else if (ordenacao === "sold_quantity_desc") items.sort((a, b) => b.vendidos - a.vendidos);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ total, items }),
      };
    }

    // ── FLUXO B: MAIS VENDIDOS POR CATEGORIA ─────────────────────────────────
    let items = [];
    let totalItems = 0;

    const highlightsUrl = `https://api.mercadolibre.com/highlights/MLB/category/${categoria}`;
    console.log(`[HIGHLIGHTS] Acessando URL: ${highlightsUrl}`);
    
    const highlightsRes = await fetch(highlightsUrl, { headers: authHeaders });

    if (highlightsRes.ok) {
      const highlightsData = await highlightsRes.json();
      const allIds = (highlightsData.content || []).map(p => p.id);
      totalItems = allIds.length;

      // Paginação manual baseada no array de highlights (slice do array completo)
      const pageIds = allIds.slice(offset, offset + limite * 2);
      console.log(`[HIGHLIGHTS] Total de IDs: ${totalItems} | IDs buscados nesta página: ${pageIds.length}`);

      if (pageIds.length > 0) {
        const rawItems = await buscarProdutosPorIds(pageIds, authHeaders);
        items = rawItems.slice(0, limite);
      }
    } else {
      const raw = await highlightsRes.text();
      console.warn(`[HIGHLIGHTS] Endpoint falhou com status ${highlightsRes.status}. Resposta:`, raw.slice(0, 200));
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ total: totalItems, items }),
    };

  } catch (err) {
    console.error("[ERRO GERAL no Processamento]:", err.message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Erro interno do servidor durante o processamento.", details: err.message }),
    };
  }
};