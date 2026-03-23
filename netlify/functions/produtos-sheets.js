// netlify/functions/produtos-sheets.js
// Lê o Google Sheets publicado como CSV e retorna os produtos formatados de forma robusta

/**
 * Faz o parser completo do CSV tratando quebras de linha dentro das células
 * e aspas duplas escapadas. Muito mais seguro que usar split('\n').
 * * @param {string} text - O conteúdo bruto do CSV em texto.
 * @returns {Array<Array<string>>} - Matriz contendo as linhas e colunas.
 */
function parseCSVCompleto(text) {
  const result = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      // Se estamos dentro de aspas e o próximo caractere também é aspas, é um escape ("")
      if (inQuotes && nextChar === '"') {
        field += '"';
        i++; // Pula a próxima aspa pois já foi processada
      } else {
        // Alterna o estado de estar ou não dentro de aspas
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // Vírgula fora de aspas significa nova coluna
      row.push(field);
      field = '';
    } else if ((char === '\n' || (char === '\r' && nextChar === '\n')) && !inQuotes) {
      // Quebra de linha fora de aspas significa nova linha (suporta \n ou \r\n)
      if (char === '\r') i++; // Pula o \n do \r\n
      row.push(field);
      result.push(row);
      row = [];
      field = '';
    } else {
      // Qualquer outro caractere faz parte do valor da célula
      field += char;
    }
  }

  // Adiciona o último campo e a última linha caso o arquivo não termine com quebra de linha
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
    // Cache desativado para garantir dados sempre atualizados do Sheets
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    "Pragma": "no-cache",
    "Expires": "0"
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
    // Valida se a URL já possui parâmetros para concatenar corretamente (? ou &)
    const timestamp = new Date().getTime();
    const separator = SHEET_URL.includes("?") ? "&" : "?";
    const fetchUrl = `${SHEET_URL}${separator}t=${timestamp}`;
    
    const res = await fetch(fetchUrl);
    
    if (!res.ok) {
      throw new Error(`O Google Sheets retornou status ${res.status}`);
    }

    const csv = await res.text();
    
    // Processa todo o documento de forma segura
    const linhasParsed = parseCSVCompleto(csv.trim());

    // Se o CSV estiver vazio ou tiver só o cabeçalho
    if (!linhasParsed || linhasParsed.length <= 1) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ produtos: [] }),
      };
    }

    // Pula a primeira linha (cabeçalhos) e mapeia os produtos
    const produtos = linhasParsed.slice(1)
      .map((colunas, index) => {
        // Desestruturação segura para evitar erros se a linha estiver incompleta
        const [
          id = "", 
          nome = "", 
          preco = "", 
          img = "", 
          link = "", 
          categoria = "", 
          loja = "", 
          desc = ""
        ] = colunas;

        // Se a coluna de nome estiver vazia, ignora a linha (útil para linhas em branco no final da planilha)
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
      .filter(Boolean); // Remove os nulos resultantes de linhas inválidas

    console.log(`[SHEETS] Produtos carregados com sucesso: ${produtos.length}`);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ produtos }),
    };

  } catch (err) {
    console.error("[SHEETS] Falha no processamento:", err.message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Erro ao carregar e processar produtos da planilha", details: err.message }),
    };
  }
};