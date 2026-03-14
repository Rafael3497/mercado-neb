// netlify/functions/produtos-sheets.js
// Lê o Google Sheets publicado como CSV e retorna os produtos formatados

const AFILIADO_ID = "23098063";

// Adiciona parâmetros de afiliado apenas em links do Mercado Livre
function aplicarAfiliadoML(link) {
  if (!link || link === "#") return link;

  // Links Amazon — não mexe
  if (link.includes("amzn.to") || link.includes("amazon.com")) return link;

  // Troca domínio "produto.mercadolivre.com.br/MLB-XXXXXXX" 
  // por "www.mercadolivre.com.br/p/MLB-XXXXXXX"
  link = link.replace(
    /https?:\/\/produto\.mercadolivre\.com\.br\/MLB-/gi,
    "https://www.mercadolivre.com.br/p/MLB"
  );

  const sep = link.includes("?") ? "&" : "?";
  return `${link}${sep}matt_word=mercadoneb&matt_tool=${AFILIADO_ID}&forceInApp=true`;
}

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Content-Type": "application/json",
    "Cache-Control": "public, max-age=300",
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
    const res = await fetch(SHEET_URL);
    if (!res.ok) throw new Error(`Erro ao buscar planilha: ${res.status}`);

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
      body: JSON.stringify({ error: "Erro ao carregar produtos da planilha", details: err.message }),
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