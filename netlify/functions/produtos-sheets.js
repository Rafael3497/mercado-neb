// netlify/functions/produtos-sheets.js
// Lê o Google Sheets publicado como CSV e retorna os produtos formatados

const AFILIADO_ID = "23098063";
const MATT_WORD = "mercadoneb";

function aplicarAfiliadoML(link) {
  if (!link || link === "#") return link;

  // Links Amazon — não mexe
  if (link.includes("amzn.to") || link.includes("amazon.com")) return link;

  try {
    const urlObj = new URL(link);
    const pathname = urlObj.pathname;

    // 1. Padrão Catálogo: (Contém /p/MLB...)
    const matchCat = pathname.match(/\/p\/(MLB\d+)/i);
    if (matchCat) {
      return `https://www.mercadolivre.com.br/p/${matchCat[1]}?matt_word=${MATT_WORD}&matt_tool=${AFILIADO_ID}&forceInApp=true`;
    }

    // 2. Padrão Anúncio Comum: (Contém MLB-123456 ou MLB123456)
    const matchItem = pathname.match(/(MLB[\-]?\d+)/i);
    // Mas garante que NÃO é um link social disfarçado antes de aplicar
    if (matchItem && !pathname.includes('/social/')) {
      let itemId = matchItem[1].replace("-", ""); 
      itemId = `MLB-${itemId.substring(3)}`;
      return `https://produto.mercadolivre.com.br/${itemId}?matt_word=${MATT_WORD}&matt_tool=${AFILIADO_ID}&forceInApp=true`;
    }

    // 3. Padrão Link Social: (Contém /social/...)
    if (pathname.includes('/social/')) {
      // Limpa chaves antigas caso venham sujas, mas PRESERVA o parâmetro "ref=" que é vital
      urlObj.searchParams.delete('matt_tool');
      urlObj.searchParams.delete('matt_word');
      urlObj.searchParams.delete('forceInApp');
      urlObj.searchParams.delete('affiliate_id');
      
      // Injeta os teus dados
      urlObj.searchParams.set('matt_word', MATT_WORD);
      urlObj.searchParams.set('matt_tool', AFILIADO_ID);
      urlObj.searchParams.set('forceInApp', 'true');
      
      return urlObj.toString();
    }

    // 4. Fallback Global: Limpa e injeta as tags para URLs desconhecidas
    urlObj.searchParams.delete('matt_tool');
    urlObj.searchParams.delete('matt_word');
    urlObj.searchParams.delete('forceInApp');
    urlObj.searchParams.delete('affiliate_id');
    urlObj.searchParams.delete('pdp_filters'); 
    
    urlObj.searchParams.set('matt_word', MATT_WORD);
    urlObj.searchParams.set('matt_tool', AFILIADO_ID);
    urlObj.searchParams.set('forceInApp', 'true');
    
    return urlObj.toString();
  } catch (e) {
    // Fallback de segurança extremo se a URL for textualmente inválida
    const urlBase = link.split("?")[0];
    return `${urlBase}?matt_word=${MATT_WORD}&matt_tool=${AFILIADO_ID}&forceInApp=true`;
  }
}

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Content-Type": "application/json",
    // Removido cache para o servidor e navegador atualizarem imediatamente
    "Cache-Control": "no-cache", 
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  const SHEET_URL = process.env.GOOGLE_SHEET_CSV_URL;

  if (!SHEET_URL) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Variável GOOGLE_SHEET_CSV_URL não configurada." }),
    };
  }

  try {
    // Burlar o cache da própria folha de cálculo do Google Sheets adicionando um timestamp
    const timestamp = new Date().getTime();
    const res = await fetch(`${SHEET_URL}&t=${timestamp}`);
    
    if (!res.ok) throw new Error(`Erro ao buscar a folha de cálculo: ${res.status}`);

    const csv = await res.text();
    const linhas = csv.trim().split("\n");

    const produtos = linhas.slice(1)
      .map((linha, index) => {
        const colunas = parseCsvLinha(linha);
        const [id, nome, preco, img, link, categoria, loja, desc] = colunas;

        if (!nome || !nome.trim()) return null;

        const linkBruto = link?.trim() || "#";

        return {
          id:        id?.trim()        || `p${index + 1}`,
          nome:      nome?.trim()      || "",
          preco:     preco?.trim()     || "0",
          img:       img?.trim()       || "",
          link:      aplicarAfiliadoML(linkBruto),
          categoria: categoria?.trim() || "outros",
          loja:      loja?.trim()      || "mercadolivre",
          desc:      desc?.trim()      || "",
        };
      })
      .filter(Boolean);

    console.log("[SHEETS] produtos carregados:", produtos.length);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ produtos }),
    };

  } catch (err) {
    console.error("[SHEETS] erro:", err.message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Erro ao carregar produtos da folha de cálculo", details: err.message }),
    };
  }
};

function parseCsvLinha(linha) {
  const resultado = [];
  let campo = "";
  let dentroDasAspas = false;

  for (let i = 0; i < linha.length; i++) {
    const char = linha[i];
    if (char === '"') {
      dentroDasAspas = !dentroDasAspas;
    } else if (char === "," && !dentroDasAspas) {
      resultado.push(campo);
      campo = "";
    } else {
      campo += char;
    }
  }
  resultado.push(campo);
  return resultado;
}