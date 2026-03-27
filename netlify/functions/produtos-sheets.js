// netlify/functions/produtos-sheets.js
// Lê o Google Sheets publicado como CSV e retorna os produtos formatados de forma robusta

function parseCSVCompleto(text) {
  const result = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        field += '"';
        i++; 
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push(field);
      field = '';
    } else if ((char === '\n' || (char === '\r' && nextChar === '\n')) && !inQuotes) {
      if (char === '\r') i++; 
      row.push(field);
      result.push(row);
      row = [];
      field = '';
    } else {
      field += char;
    }
  }

  if (field || text[text.length - 1] === ',') {
    row.push(field);
  }
  if (row.length > 0) {
    result.push(row);
  }

  return result;
}

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Content-Type": "application/json",
    // O SEGREDO DA VELOCIDADE ESTÁ AQUI:
    // s-maxage=300: O Netlify guarda a resposta no cache por 5 minutos.
    // stale-while-revalidate=86400: Se passar de 5 min, ele entrega a versão antiga na hora (rápido) e atualiza nos bastidores.
    "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=86400"
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  const SHEET_URL = process.env.GOOGLE_SHEET_CSV_URL;

  if (!SHEET_URL) {
    console.error("[ERRO] Variável de ambiente GOOGLE_SHEET_CSV_URL ausente.");
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Variável GOOGLE_SHEET_CSV_URL não configurada no servidor." }),
    };
  }

  try {
    // Como agora usamos o cache do Netlify, o servidor pode ler do Google Sheets usando uma URL fixa
    const res = await fetch(SHEET_URL);
    
    if (!res.ok) {
      throw new Error(`O Google Sheets retornou status ${res.status}`);
    }

    const csv = await res.text();
    const linhasParsed = parseCSVCompleto(csv.trim());

    if (!linhasParsed || linhasParsed.length <= 1) {
      return { statusCode: 200, headers, body: JSON.stringify({ produtos: [] }) };
    }

    const produtos = linhasParsed.slice(1)
      .map((colunas, index) => {
        const [
          id = "", nome = "", preco = "", img = "", link = "", categoria = "", loja = "", desc = ""
        ] = colunas;

        if (!nome || !nome.trim()) return null;

        return {
          id: id.trim() || `p${index + 1}`,
          nome: nome.trim(),
          preco: preco.trim() || "0",
          img: img.trim() || "",
          link: link.trim() || "#",
          categoria: categoria.trim() || "outros",
          loja: loja.trim() || "mercadolivre",
          desc: desc.trim() || "",
        };
      })
      .filter(Boolean);

    console.log(`[SHEETS] Produtos carregados com sucesso: ${produtos.length}`);

    return { statusCode: 200, headers, body: JSON.stringify({ produtos }) };

  } catch (err) {
    console.error("[SHEETS] Falha no processamento:", err.message);
    return { statusCode: 500, headers, body: JSON.stringify({ error: "Erro ao carregar e processar produtos", details: err.message }) };
  }
};
