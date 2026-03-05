🧺 MERCADO NEB - Documentação do Projeto
Este arquivo contém as diretrizes técnicas e regras de negócio para o desenvolvimento e manutenção do site Mercado NEB.

🚀 1. ARQUITETURA DO PROJETO
O site é construído com HTML5, CSS3 e JavaScript Moderno (ES6+), utilizando uma estrutura modular:

index.html: Estrutura principal, cabeçalho, carrossel e filtros.

style.css: Identidade visual, responsividade mobile e animações (Toasts/Cards).

script.js: Inteligência do site (deve ser importado como type="module").

produtos.js: Banco de dados local onde todas as ofertas fixas são cadastradas.

🛠 2. REGRAS DE OURO (NÃO QUEBRAR)
Código Completo: Toda alteração no código deve resultar na reescrita total do arquivo para evitar perda de funções ou trechos ocultos.

Links de Afiliado: Os botões de compra devem exibir o texto personalizado: "Comprar na Amazon" ou "Comprar no Mercado Livre" com seus respectivos ícones.

Deep Linking (IDs): Cada produto deve possuir um ID único no produtos.js. O site deve ser capaz de rolar automaticamente até o card se o link compartilhado contiver um #ID.

Responsividade: O site deve ser otimizado para mobile, especialmente o sistema de notificações (Toast) e o grid de ofertas.

📋 3. FUNCIONALIDADES ATIVAS
Sistema de Favoritos: Salva a preferência do usuário no navegador (localStorage).

Filtro de Preço Dinâmico: O valor máximo do filtro é calculado automaticamente com base no produto mais caro da lista.

Filtro de Categorias: Permite alternar entre os nichos (Eletrônicos, Casa, etc).

Google Analytics: Rastreamento de cliques em ofertas via ID G-QTCN9HXRNL.

Compartilhamento Inteligente: Gera link direto via WhatsApp com âncora para o produto.

🔮 4. PRÓXIMAS ATUALIZAÇÕES (ROADMAPPING)
Integração com API Mercado Livre: Implementar o botão "Achadinhos" para buscar ofertas automáticas sem precisar cadastrar manualmente.

Otimização de Imagens: Garantir que as imagens carregadas da API sejam de alta resolução (-O.jpg).

ID de Afiliado Global: Configurar variável para injetar o ID de rastreio em todos os links da API.

📞 5. CONTATO E SUPORTE
WhatsApp Oficial: https://wa.me/558532344277

Objetivo: Transformar o Mercado NEB no maior portal de ofertas curadas do Brasil.