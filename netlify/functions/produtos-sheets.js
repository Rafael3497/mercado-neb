// netlify/functions/produtos-sheets.js
// Lê o Google Sheets publicado como CSV e retorna os produtos formatados exatamente como estão na planilha

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

        // Pega o link exatamente como foi digitado na planilha, sem nenhuma alteração
        const linkPuro = link?.trim() || "#";

        return {
          id:        id?.trim()        || `p${index + 1}`,
          nome:      nome?.trim()      || "",
          preco:     preco?.trim()     || "0",
          img:       img?.trim()       || "",
          link:      linkPuro, 
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
