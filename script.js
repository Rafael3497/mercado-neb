/* ==========================================
   BANCO DE DADOS DE PRODUTOS
   ========================================== */
const meusProdutos = [
     {
        nome: " Tapete de Yoga",
        desc: " Dupla Camada EVA 6mm Antiderrapante Pilates Fitness Ginástica",
        preco: "79,90",
        categoria: "fitness",
        loja: "amazon",
        img: " https://www.amazon.com.br/dp/B0F6NVMNY7/ref=cm_sw_r_as_gl_apa_gl_i_DK9Z1FS2D229HAXPQH40?linkCode=ml1&tag=estrelaneb-20&linkId=97b3b9854d0d000da5576c3161e0eeb0#",
        link: " https://amzn.to/4ceTu4j"
    },
     {
        nome: "Tênis Adidas",
        desc: "TênisAdventage Base 2.0 Adidas",
        preco: "209,75",
        categoria: "moda",
        loja: "mercadolivre",
        img: "https://http2.mlstatic.com/D_NQ_NP_779352-MLB107654833669_022026-O-tnis-advantage-base-20-adidas.webp",
        link: " https://meli.la/1kCbmwi"
    },
     {
        nome: "Aparador De Pelos Super Groom 10 Mondial 6W Bivolt",
        desc: "5 Cabeças Aparadoras, 4 Pentes de Corte, 1 Pente Ajustável, 1 Óleo Lubrificante, Carregador, Base Carregadora e Manual",
        preco: "102,71",
        categoria: "eletronicos",
        loja: "mercadolivre",
        img: " https://http2.mlstatic.com/D_NQ_NP_981084-MLA99522140924_122025-O.webp",
        link: "https://meli.la/1HP8xZD"
    },
     {
        nome: "Galaxy Tab A11",
        desc: "64gb, 4gb Ram, Tela De 8.7 , Bateria 5.100mah, Câmera Frontal 5mp, Câmera Traseira 8mp, Wifi Prata",
        preco: "899,00",
        categoria: "eletronicos",
        loja: "mercadolivre",
        img: " https://http2.mlstatic.com/D_NQ_NP_892318-MLA99419882190_112025-O.webp",
        link: "https://meli.la/31KwJHn"
    },
    {
        nome: "Medidor de Pressão Digital",
        desc: "O tensiômetro digital G-Tech BSP11 possui uma capacidade de memória total de 120 medições, ideal para monitorar a saúde cardiovascular.",
        preco: "99,00",
        categoria: "saude",
        loja: "mercadolivre",
        img: "https://http2.mlstatic.com/D_NQ_NP_635620-MLU73673867017_122023-O.webp",
        link: "https://meli.la/2HvbdrX"
    },
    {
        nome: "Mesa Dobravel Camping",
        desc: "Maleta Portatil 1.80m Com Alça Jardim Branco e Preto",
        preco: "261,04",
        categoria: "casa",
        loja: "mercadolivre",
        img: "https://http2.mlstatic.com/D_NQ_NP_2X_776852-MLB106988205071_022026-F.webp",
        link: "https://meli.la/1LZmkNP"
    },
    {
        nome: "O Pequeno Príncipe",
        desc: "Edição de Luxo Almofadada",
        preco: "12,90",
        categoria: "livros",
        loja: "amazon",
        img: "https://m.media-amazon.com/images/I/71IiouhdpAL._SL1500_.jpg",
        link: "https://amzn.to/4bbmQj0"
    },
    {
        nome: "Escrivaninha Trevalla Kuadra",
        desc: "Me150-E10 Industrial 150cm Preto Onix",
        preco: "240,86",
        categoria: "escritorio",
        loja: "amazon",
        img: "https://m.media-amazon.com/images/I/71b3InIEJyL._AC_SX679_.jpg",
        link: "https://amzn.to/4kUrBAK"
    },
    {
        nome: "Suporte De Celular Carro 360",
        desc: "Ventosa Giratória Veicular Ajustável Anti Queda",
        preco: "28,08",
        categoria: "eletronicos",
        loja: "mercadolivre",
        img: "https://http2.mlstatic.com/D_NQ_NP_2X_950271-MLA107488132969_022026-F.webp",
        link: "https://meli.la/1huEcfg"
    },
    {
        nome: "Base Suporte Para PC Notebook",
        desc: "Alumínio Portátil Articulado Dobrável Tablet Laptop",
        preco: "25,90",
        categoria: "escritorio",
        loja: "mercadolivre",
        img: "https://http2.mlstatic.com/D_NQ_NP_2X_862425-MLA95804056004_102025-F.webp",
        link: "https://meli.la/2hbQFNN"
    },
    {
        nome: "Creatina Monohidratada 250g",
        desc: "Growth Supplements - Sem sabor em Pó",
        preco: "39,90",
        categoria: "fitness",
        loja: "mercadolivre",
        img: "https://http2.mlstatic.com/D_NQ_NP_2X_662415-MLA97812910758_112025-F.webp",
        link: "https://meli.la/1hCrFuS"
    },
    {
        nome: "Quadro Decorativo Com Prateleira",
        desc: "Dupla Nicho Moldura Luxo",
        preco: "35,69",
        categoria: "casa",
        loja: "mercadolivre",
        img: "https://http2.mlstatic.com/D_NQ_NP_2X_739043-MLB100377785271_122025-F.webp",
        link: "https://meli.la/26B1nGJ"
    },
    {
        nome: "Tenis Branco Feminino",
        desc: "Esportivo Vili Olimp Academia Treino",
        preco: "96,52",
        categoria: "moda",
        loja: "mercadolivre",
        img: "https://http2.mlstatic.com/D_NQ_NP_2X_603676-MLB106109346865_012026-F-tenis-branco-feminino-esportivo-vili-olimp-academia-treino.webp",
        link: "https://meli.la/15n5AjN"
    },
    {
        nome: "Geladeira Electrolux Frost Free",
        desc: "Efficient com AutoSense Branca 390L (IF43) 220V",
        preco: "2.299,00",
        categoria: "casa",
        loja: "amazon",
        img: "https://m.media-amazon.com/images/I/31ZqPaGUjRL._AC_SX679_.jpg",
        link: "https://amzn.to/4b8NlWh"
    },
    {
        nome: "Bandeja de Bambu",
        desc: "Marrom Natural 20cm - Mesa Posta e Decoração",
        preco: "17,51",
        categoria: "casa",
        loja: "amazon",
        img: "https://m.media-amazon.com/images/I/61q2ZyGUf6L._AC_SX679_.jpg",
        link: "https://amzn.to/4cN6qyr"
    },
    {
        nome: "TCL QLED SMART TV 40",
        desc: "FHD GOOGLE TV com Wi-Fi e Bluetooth, HDR10",
        preco: "1.357,03",
        categoria: "eletronicos",
        loja: "amazon",
        img: "https://m.media-amazon.com/images/I/61Tyj-tyTtL._AC_SX569_.jpg",
        link: "https://amzn.to/4l7FcEX"
    },
    {
        nome: "Furadeira Parafusadeira 48v",
        desc: "2 Baterias Recarregáveis com Maleta e Kit Brocas",
        preco: "129,00",
        categoria: "casa",
        loja: "mercadolivre",
        img: "https://http2.mlstatic.com/D_NQ_NP_2X_903566-MLA103486375178_012026-F.webp",
        link: "https://meli.la/2akLXF8"
    },
    {
        nome: "Panela Pipoqueira",
        desc: "Tramontina profissional em alumínio.",
        preco: "120,21",
        categoria: "casa",
        loja: "mercadolivre",
        img: "img/panela.png",
        link: "https://meli.la/1xQkhGK"
    },
    {
        nome: "Tábua De Passar Roupa",
        desc: "Reforçada Com Porta Ferro 3 Alturas.",
        preco: "78,97",
        categoria: "casa",
        loja: "mercadolivre",
        img: "https://http2.mlstatic.com/D_NQ_NP_2X_860360-MLA98972660483_112025-F.webp",
        link: "https://meli.la/1nWFot7"
    },
    {
        nome: "Panela de Pressão Elétrica",
        desc: "Electrolux Digital 6L silenciosa e segura.",
        preco: "502,55",
        categoria: "casa",
        loja: "amazon",
        img: "img/PanelaEletrica.png",
        link: "https://amzn.to/4bcD1wo"
    },
    {
        nome: "Ventilador WAP de Coluna",
        desc: "50cm FLOW TURBO, silencioso e potente.",
        preco: "221,81",
        categoria: "casa",
        loja: "amazon",
        img: "img/ventiladorpe.jpeg",
        link: "https://amzn.to/46pQONx"
    },
    {
        nome: "Pipoqueira Elétrica Mondial",
        desc: "Pipoca pronta em 3 minutos sem usar óleo.",
        preco: "149,99",
        categoria: "casa",
        loja: "mercadolivre",
        img: "img/pipoqueiraeletrica.jpeg",
        link: "https://meli.la/2y41pzb"
    },
    {
        nome: "DOMEZ Tábua de Corte Inox",
        desc: "Tábua de corte em aço inox, higiênica e durável.",
        preco: "74,76",
        categoria: "casa",
        loja: "amazon",
        img: "https://m.media-amazon.com/images/I/71t1xnPvyTL._AC_SX679_.jpg",
        link: "https://amzn.to/4kYeHS9"
    },
    {
        nome: "Umidificador De Ar Ultrassônico",
        desc: "Umi Pop Health 2,3l Dellamed Cor Branco.",
        preco: "87,09",
        categoria: "saude",
        loja: "mercadolivre",
        img: "https://http2.mlstatic.com/D_NQ_NP_2X_900915-MLA84476647173_052025-F.webp",
        link: "https://meli.la/2TQSZUx"
    },
    {
        nome: "Veganpro Baunilha - 450g",
        desc: "À base de proteínas de arroz e ervilha.",
        preco: "131,58",
        categoria: "saude",
        loja: "amazon",
        img: "https://m.media-amazon.com/images/I/81R8-IDpwAL._AC_SX679_.jpg",
        link: "https://amzn.to/4cPO0NA"
    },
    {
        nome: "Downy Amaciante",
        desc: "Concentrado Brisa Intenso 3L, Rende 12L",
        preco: "49,44",
        categoria: "casa",
        loja: "amazon",
        img: "https://m.media-amazon.com/images/I/61a1dtQPN5L._AC_SX679_.jpg",
        link: "https://amzn.to/4aOVU7i"
    }
];

/* ==========================================
   FUNÇÃO PARA RENDERIZAR PRODUTOS
   ========================================== */
function carregarProdutos() {
    const grid = document.getElementById('offersGrid');
    if (!grid) return;

    grid.innerHTML = meusProdutos.map(p => {
        const éAmazon = p.loja === 'amazon';
        const lojaNome = éAmazon ? 'Amazon' : 'Mercado Livre';
        const artigo = éAmazon ? 'na' : 'no';
        
        return `
        <div class="card" data-name="${p.nome}" data-category="${p.categoria}">
            <div class="card-img">
                <span class="badge-loja ${p.loja}">${lojaNome}</span>
                <img src="${p.img}" alt="${p.nome}" loading="lazy">
            </div>
            <div class="card-info">
                <h3>${p.nome}</h3>
                <p>${p.desc}</p>
                <div class="price-container">
                    <span class="price-label">R$</span>
                    <span class="price-value">${p.preco}</span>
                </div>
                <div class="price-disclaimer">
                    <i class="fas fa-exclamation-triangle"></i> O valor poderá alterar a qualquer momento!
                </div>
                <div class="card-actions">
                    <a href="${p.link}" target="_blank" class="btn-buy">Comprar ${artigo} ${lojaNome}</a>
                    <button class="btn-share" onclick="compartilhar('${p.nome}', '${p.link}')" title="Compartilhar">
                        <i class="fas fa-share-alt"></i>
                    </button>
                </div>
            </div>
        </div>
    `}).join('');
}

/* ==========================================
   SISTEMA DE FILTRO POR CATEGORIA
   ========================================== */
function filtrarCategoria(cat) {
    const botoes = document.querySelectorAll('.filter-btn');
    botoes.forEach(btn => btn.classList.remove('active'));
    
    // Identifica o botão clicado
    if (event) {
        event.target.classList.add('active');
    }

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const categoriaCard = card.getAttribute('data-category');
        if (cat === 'todos' || categoriaCard === cat) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
}

/* ==========================================
   FUNÇÃO DE COMPARTILHAMENTO
   ========================================== */
function compartilhar(nome, link) {
    const texto = `🌟 *Oferta no Mercado NEB!*\n\n*${nome}*\n\nConfira aqui: ${link}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Mercado NEB',
            text: texto,
            url: link
        }).catch(console.error);
    } else {
        const urlZap = `https://api.whatsapp.com/send?text=${encodeURIComponent(texto)}`;
        window.open(urlZap, '_blank');
    }
}

/* ==========================================
   CARROSSEL AUTOMÁTICO
   ========================================== */
let slideIndex = 0;
function showSlides() {
    let slides = document.getElementsByClassName("slide");
    if (slides.length === 0) return;

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.opacity = "0";
        slides[i].classList.remove("active");
    }
    
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }
    
    slides[slideIndex - 1].style.opacity = "1";
    slides[slideIndex - 1].classList.add("active");
    
    setTimeout(showSlides, 6000);
}

/* ==========================================
   SISTEMA DE BUSCA (POR NOME)
   ========================================= */
function filterOffers() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let cards = document.getElementsByClassName('card');
    
    for (let i = 0; i < cards.length; i++) {
        let name = cards[i].getAttribute('data-name').toLowerCase();
        cards[i].style.display = name.includes(input) ? "" : "none";
    }
}

/* ==========================================
   INICIALIZAÇÃO AO CARREGAR A PÁGINA
   ========================================== */
window.onload = function() {
    carregarProdutos();
    showSlides();
};
