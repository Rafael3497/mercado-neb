/* ==========================================
   BANCO DE DADOS DE PRODUTOS (COMPLETO)
   ========================================== */
const meusProdutos = [
    {
        nome: "Balança Digital De Vidro Corporal Temperado Até 180 Kg",
        desc: "A Balança Digital Comica é ideal para quem procura precisão, praticidade e um design moderno para o dia a dia. Desenvolvida em vidro temperado e com sensores de alta precisão, proporciona pesagens confiáveis e rápidas.",
        preco: "35,99",
        categoria: "fitness",
        loja: "mercadolivre",
        img: "https://http2.mlstatic.com/D_NQ_NP_2X_716290-MLA96186710666_102025-F.webp",
        link: "https://meli.la/2eyo2JC"
    },
    {
        nome: "Top Puma Sem Costura Microfibra de Poliamida Feminino Adulto",
        desc: "Top Academia Puma Alta Sustentação Sem Bojo Sem Costura,Conforto Inigualável: Design anatômico sem bojo, feito para se ajustar perfeitamente ao corpo",
        preco: "48,99",
        categoria: "fitness",
        loja: "amazon",
        img: "https://m.media-amazon.com/images/I/51-AezVhnAL._AC_SX679_.jpg",
        link: "https://amzn.to/4cTzyEg"
    },


    {
        nome: "Johnson's Baby Sabonete Líquido Recém Nascido, 200ml",
        desc: "A espuma leve e aveludada como algodão deixa o toque mais suave e delicado",
        preco: "20,40",
        categoria: "casa",
        loja: "amazon",
        img: "https://m.media-amazon.com/images/I/61RtxYSf-dL._AC_SX679_.jpg",
        link: "https://amzn.to/4aWaHgF"
    },
    {
        nome: "Teclado USB Com Fio B-Max BM-T02 ABNT2",
        desc: "Teclado B-Max BM-T02 é um teclado com fio, padrão ABNT2, com conexão USB e compatível com Windows XP/Vista/7/8/10. Ele possui teclas macias e silenciosas, design ergonômico e é resistente a salpicos, USB 2.0, com conexão estável e sem necessidade de pilhas ou baterias.",
        preco: "29,90",
        categoria: "escritorio",
        loja: "mercadolivre",
        img: "https://http2.mlstatic.com/D_NQ_NP_2X_958827-MLA106956089830_022026-F.webp",
        link: "https://meli.la/1UECRDK"
    },


    {
        nome: "DOWNY Amaciante Concentrado Brisa de Verão 1.6L, Rende 6.4L",
        desc: "VISTA-SE DE PERFUME O DIA TODO: com o amaciante Downy Concentrado. Esse amaciante concentrado é perfeito para manter suas roupas com aquele perfume gostoso por muito tempo.",
        preco: "27,22",
        categoria: "casa",
        loja: "amazon",
        img: "https://m.media-amazon.com/images/I/61qzAq1p+pL._AC_SX679_.jpg",
        link: "https://amzn.to/4rm3dd7"
    },
    {
        nome: "Ar Condicionado Split Dual Inverter 9000 Btus Lg Compact + Ia Frio S3nq09aaqak.eb2gam1-220v",
        desc: "AI - Inteligência Artificial, Refrigeração até 30% mais rápida, Até 60% de economia de energia",
        preco: "1.999,00",
        categoria: "casa",
        loja: "amazon",
        img: "https://m.media-amazon.com/images/I/51JaTQ4FFaL._AC_SX569_.jpg",
        link: "https://amzn.to/4aWTkfI"
    },


    {
        nome: "Finish Detergente para Lava Louças em pó 700g",
        desc: "Finish Power Powder Advanced é o seu detergente lava louças em pó que oferece limpeza profunda na dose certa.",
        preco: "32,69",
        categoria: "casa",
        loja: "amazon",
        img: "https://m.media-amazon.com/images/I/61rDfENoVVL._AC_SX679_.jpg",
        link: "https://amzn.to/4cSTN4Y"
    },
    {
        nome: "Kit Com 4 Toalhas Banhão Gigante Alta Absorção Sublime 70x150cm",
        desc: "Quantidade de Peças: 4 Toalhas Banhão Gigante Medidas 70cm x 150cm, Peso Unitário 350 Gramas Gramatura 330g/m2, Material100% Algodão Qualidade Premium",
        preco: "98,99",
        categoria: "casa",
        loja: "amazon",
        img: "https://m.media-amazon.com/images/I/81Arq7i+7ML._AC_SX679_.jpg",
        link: "https://amzn.to/4rEcjCH"
    },


    {
        nome: "Heinz Ketchup Tradicional 1,033KG",
        desc: "Tomate, açúcar, vinagre, sal, cebola e aroma natural. NÃO CONTÉM GLÚTEN.",
        preco: "23,50",
        categoria: "casa",
        loja: "amazon",
        img: "https://m.media-amazon.com/images/I/51653ltvYsL._AC_SY300_SX300_QL70_ML2_.jpg",
        link: "https://amzn.to/3MVIBdd"
    },
     {
        nome: "Finish Secante para Lava-Louças e Abrilhantador 250ml",
        desc: "Finish Secante e Abrilhantador é o líquido secante para máquina lava louças que deixa a louça seca e perfeitamente brilhante, pronta para o uso.",
        preco: "30,39",
        categoria: "casa",
        loja: "amazon",
        img: "https://m.media-amazon.com/images/I/71M8mqH9RrL._AC_SX679_.jpg",
        link: "https://amzn.to/4tYjkQo"
    },
     {
        nome: " Kit 2 Pulverizador Spray De Azeite , Vidro, 100ml, , Saladas Prateado",
        desc: "Mais controle, menos exagero! Esse kit com 2 pulverizadores de vidro (100ml cada) é perfeito para temperar saladas, finalizar pratos e usar no preparo de carnes e legumes sem encharcar tudo de óleo.",
        preco: "21,80",
        categoria: "casa",
        loja: "mercadolivre",
        img: " https://http2.mlstatic.com/D_NQ_NP_686019-MLA99827429533_112025-O.webp",
        link: "https://meli.la/2Vqr41E"
    },
    {
        nome: "Esteira Ergométrica",
        desc: "E41 Elétrica Dobrável 10km Acte Preto - Ideal para treinos em casa.",
        preco: "1.899,99",
        categoria: "fitness",
        loja: "mercadolivre",
        img: "https://http2.mlstatic.com/D_NQ_NP_880987-MLA95682115328_102025-O.webp",
        link: "https://meli.la/26Zkim4"
    },
    {
        nome: "X7 300g - Atlhetica Nutrition",
        desc: "Pré-treino Mix Berries para elevar seu desempenho e foco mental.",
        preco: "56,99",
        categoria: "fitness",
        loja: "mercadolivre",
        img: "https://http2.mlstatic.com/D_NQ_NP_836886-MLA99378573418_112025-O.webp",
        link: "https://meli.la/1BDm5y3"
    },
    {
        nome: "Tapete de Yoga",
        desc: "Dupla Camada EVA 6mm Antiderrapante para Pilates e Ginástica.",
        preco: "79,90",
        categoria: "fitness",
        loja: "amazon",
        img: "https://m.media-amazon.com/images/I/51EENVHPusL._AC_UF1000,1000_QL80_FMwebp_.jpg",
        link: "https://amzn.to/4ceTu4j"
    },
    {
        nome: "Tênis Adidas Advantage",
        desc: "Tênis Advantage Base 2.0 Adidas - Estilo e conforto para o dia a dia.",
        preco: "209,75",
        categoria: "moda",
        loja: "mercadolivre",
        img: "https://http2.mlstatic.com/D_NQ_NP_779352-MLB107654833669_022026-O-tnis-advantage-base-20-adidas.webp",
        link: "https://meli.la/1kCbmwi"
    },
    {
        nome: "Aparador De Pelos Mondial",
        desc: "Super Groom 10 Mondial 6W Bivolt - Kit completo com 5 cabeças.",
        preco: "102,71",
        categoria: "eletronicos",
        loja: "mercadolivre",
        img: "https://http2.mlstatic.com/D_NQ_NP_981084-MLA99522140924_122025-O.webp",
        link: "https://meli.la/1HP8xZD"
    },
    {
        nome: "Galaxy Tab A9+",
        desc: "64gb, 4gb Ram, Tela De 8.7 polegadas, Wifi Prata.",
        preco: "899,00",
        categoria: "eletronicos",
        loja: "mercadolivre",
        img: "https://http2.mlstatic.com/D_NQ_NP_892318-MLA99419882190_112025-O.webp",
        link: "https://meli.la/31KwJHn"
    },
    {
        nome: "Medidor de Pressão Digital",
        desc: "Tensiômetro digital G-Tech BSP11 - Memória para 120 medições.",
        preco: "99,00",
        categoria: "saude",
        loja: "mercadolivre",
        img: "https://http2.mlstatic.com/D_NQ_NP_635620-MLU73673867017_122023-O.webp",
        link: "https://meli.la/2HvbdrX"
    },
    {
        nome: "Mesa Dobravel Camping",
        desc: "Maleta Portatil 1.80m Com Alça Jardim Branco e Preto.",
        preco: "261,04",
        categoria: "casa",
        loja: "mercadolivre",
        img: "https://http2.mlstatic.com/D_NQ_NP_2X_776852-MLB106988205071_022026-F.webp",
        link: "https://meli.la/1LZmkNP"
    },
    {
        nome: "O Pequeno Príncipe",
        desc: "Edição de Luxo Almofadada - Um clássico para sua coleção.",
        preco: "12,90",
        categoria: "livros",
        loja: "amazon",
        img: "https://m.media-amazon.com/images/I/71IiouhdpAL._SL1500_.jpg",
        link: "https://amzn.to/4bbmQj0"
    },
    {
        nome: "Escrivaninha Trevalla Kuadra",
        desc: "Me150-E10 Industrial 150cm Preto Onix.",
        preco: "240,86",
        categoria: "escritorio",
        loja: "amazon",
        img: "https://m.media-amazon.com/images/I/71b3InIEJyL._AC_SX679_.jpg",
        link: "https://amzn.to/4kUrBAK"
    },
    {
        nome: "Suporte De Celular Carro 360",
        desc: "Ventosa Giratória Veicular Ajustável Anti Queda.",
        preco: "28,08",
        categoria: "eletronicos",
        loja: "mercadolivre",
        img: "https://http2.mlstatic.com/D_NQ_NP_2X_950271-MLA107488132969_022026-F.webp",
        link: "https://meli.la/1huEcfg"
    },
    {
        nome: "Base Suporte Para PC Notebook",
        desc: "Alumínio Portátil Articulado Dobrável Tablet Laptop.",
        preco: "25,90",
        categoria: "escritorio",
        loja: "mercadolivre",
        img: "https://http2.mlstatic.com/D_NQ_NP_2X_862425-MLA95804056004_102025-F.webp",
        link: "https://meli.la/2hbQFNN"
    },
    {
        nome: "Creatina Monohidratada 250g",
        desc: "Growth Supplements - Creatina pura em pó.",
        preco: "39,90",
        categoria: "fitness",
        loja: "mercadolivre",
        img: "https://http2.mlstatic.com/D_NQ_NP_2X_662415-MLA97812910758_112025-F.webp",
        link: "https://meli.la/1hCrFuS"
    },
    {
        nome: "Quadro Decorativo Prateleira",
        desc: "Dupla Nicho Moldura Luxo para decoração.",
        preco: "35,69",
        categoria: "casa",
        loja: "mercadolivre",
        img: "https://http2.mlstatic.com/D_NQ_NP_2X_739043-MLB100377785271_122025-F.webp",
        link: "https://meli.la/26B1nGJ"
    },
    {
        nome: "Tenis Branco Feminino",
        desc: "Esportivo Vili Olimp Academia Treino.",
        preco: "96,52",
        categoria: "moda",
        loja: "mercadolivre",
        img: "https://http2.mlstatic.com/D_NQ_NP_2X_603676-MLB106109346865_012026-F-tenis-branco-feminino-esportivo-vili-olimp-academia-treino.webp",
        link: "https://meli.la/15n5AjN"
    },
    {
        nome: "Geladeira Electrolux Frost Free",
        desc: "Efficient com AutoSense Branca 390L (IF43).",
        preco: "2.299,00",
        categoria: "casa",
        loja: "amazon",
        img: "https://m.media-amazon.com/images/I/31ZqPaGUjRL._AC_SX679_.jpg",
        link: "https://amzn.to/4b8NlWh"
    },
    {
        nome: "Bandeja de Bambu",
        desc: "Marrom Natural 20cm - Ideal para Mesa Posta.",
        preco: "17,51",
        categoria: "casa",
        loja: "amazon",
        img: "https://m.media-amazon.com/images/I/61q2ZyGUf6L._AC_SX679_.jpg",
        link: "https://amzn.to/4cN6qyr"
    },
    {
        nome: "TCL QLED SMART TV 40",
        desc: "FHD GOOGLE TV com Wi-Fi e Bluetooth integrados.",
        preco: "1.357,03",
        categoria: "eletronicos",
        loja: "amazon",
        img: "https://m.media-amazon.com/images/I/61Tyj-tyTtL._AC_SX569_.jpg",
        link: "https://amzn.to/4l7FcEX"
    },
    {
        nome: "Furadeira Parafusadeira 48v",
        desc: "2 Baterias Recarregáveis com Maleta e Kit Brocas.",
        preco: "129,00",
        categoria: "casa",
        loja: "mercadolivre",
        img: "https://http2.mlstatic.com/D_NQ_NP_2X_903566-MLA103486375178_012026-F.webp",
        link: "https://meli.la/2akLXF8"
    },
    {
        nome: "Panela Pipoqueira",
        desc: "Tramontina profissional em alumínio resistente.",
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
        desc: "Concentrado Brisa Intenso 3L, Rende 12L.",
        preco: "49,44",
        categoria: "casa",
        loja: "amazon",
        img: "https://m.media-amazon.com/images/I/61a1dtQPN5L._AC_SX679_.jpg",
        link: "https://amzn.to/4aOVU7i"
    }
];

/* ==========================================
   FUNÇÕES DO SISTEMA (NÃO ALTERAR)
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
                    <a href="${p.link}" target="_blank" class="btn-buy" onclick="registrarClique('${p.nome}', '${lojaNome}')">Comprar ${artigo} ${lojaNome}</a>
                    <button class="btn-share" onclick="compartilhar('${p.nome}', '${p.link}')" title="Compartilhar">
                        <i class="fas fa-share-alt"></i>
                    </button>
                </div>
            </div>
        </div>
    `}).join('');
}

// NOVA FUNÇÃO PARA O ANALYTICS
function registrarClique(produto, loja) {
    if (typeof gtag === 'function') {
        gtag('event', 'clique_produto', {
            'event_category': 'vendas',
            'event_label': produto,
            'loja_destino': loja
        });
    }
}

function filtrarCategoria(cat) {
    const botoes = document.querySelectorAll('.filter-btn');
    botoes.forEach(btn => btn.classList.remove('active'));
    if (event) event.target.classList.add('active');

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

function compartilharOferta(titulo, preco) {
    // URL oficial do Mercado NEB no Netlify
    const urlSite = "https://mercadoneb.netlify.app/"; 
    
    // Montagem da mensagem com formatação para WhatsApp
    const texto = `🛍️ *OFERTA NO MERCADO NEB* \n\n` +
                  `📦 *Produto:* ${titulo}\n` +
                  `💰 *Preço:* R$ ${preco}\n\n` +
                  `🔗 *Confira os detalhes e compre pelo site:* \n` +
                  `${urlSite}`;

    // Codifica para URL e abre o compartilhamento
    const mensagemFinal = encodeURIComponent(texto);
    window.open(`https://api.whatsapp.com/send?text=${mensagemFinal}`, '_blank');
}

let slideIndex = 0;
function showSlides() {
    let slides = document.getElementsByClassName("slide");
    if (slides.length === 0) return;
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.opacity = "0";
        slides[i].classList.remove("active");
    }
    slideIndex++;
    if (slideIndex > slides.length) slideIndex = 1;
    slides[slideIndex - 1].style.opacity = "1";
    slides[slideIndex - 1].classList.add("active");
    setTimeout(showSlides, 6000);
}

function filterOffers() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let cards = document.getElementsByClassName('card');
    for (let i = 0; i < cards.length; i++) {
        let name = cards[i].getAttribute('data-name').toLowerCase();
        cards[i].style.display = name.includes(input) ? "" : "none";
    }
}

window.onload = function() {
    carregarProdutos();
    showSlides();
};
