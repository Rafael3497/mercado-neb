// 1. IMPORTAÇÃO DOS DADOS
import { meusProdutos } from './produtos.js';

/* ==========================================
   SISTEMA DE FAVORITOS
   ========================================== */
let listaFavoritosNEB = [];
try {
    const salvos = localStorage.getItem('mercado_neb_favs');
    listaFavoritosNEB = salvos ? JSON.parse(salvos) : [];
} catch (e) {
    listaFavoritosNEB = [];
}

function verificarStatusFavorito(produtoId) {
    return listaFavoritosNEB.includes(String(produtoId));
}

function mostrarNotificacao(mensagem) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fas fa-heart"></i> ${mensagem}`;
    container.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 3000);
}

window.toggleFavorito = function(event, produtoId) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    const btn = event.currentTarget;
    const icone = btn.querySelector('i');
    const index = listaFavoritosNEB.indexOf(String(produtoId));

    if (index === -1) {
        listaFavoritosNEB.push(String(produtoId));
        btn.classList.add('active');
        if(icone) { icone.classList.replace('far', 'fas'); }
        mostrarNotificacao("Salvo nos favoritos! ❤️");
    } else {
        listaFavoritosNEB.splice(index, 1);
        btn.classList.remove('active');
        if(icone) { icone.classList.replace('fas', 'far'); }
        mostrarNotificacao("Removido dos favoritos.");
    }
    localStorage.setItem('mercado_neb_favs', JSON.stringify(listaFavoritosNEB));
    
    if (document.querySelector('.btn-fav-filter.active')) {
        filtrarFavoritos(); 
    }
}

/* ==========================================
   CARREGAMENTO E FILTROS PROFISSIONAIS
   ========================================== */
function gerarCardHTML(p) {
    const identificador = p.id;
    const éAmazon = p.loja === 'amazon';
    
    // Define o texto e o ícone do botão baseado na loja
    const textoBotao = éAmazon ? 'Comprar na Amazon' : 'Comprar no Mercado Livre';
    const iconeBotao = éAmazon ? 'fab fa-amazon' : 'fas fa-shopping-cart';
    const lojaNome = éAmazon ? 'Amazon' : 'Mercado Livre';
    
    const isFav = verificarStatusFavorito(identificador);
    
    return `
    <div class="card" id="${identificador}" data-name="${p.nome}" data-category="${p.categoria}">
        <div class="card-img">
            <span class="badge-loja ${p.loja}">${lojaNome}</span>
            <button class="btn-favorite ${isFav ? 'active' : ''}" onclick="toggleFavorito(event, '${identificador}')">
                <i class="${isFav ? 'fas' : 'far'} fa-heart"></i>
            </button>
            <img src="${p.img}" alt="${p.nome}" loading="lazy">
        </div>
        <div class="card-info">
            <h3>${p.nome}</h3>
            <p>${p.desc || 'Oferta selecionada do dia!'}</p>
            <div class="price-container">
                <span class="price-label">R$</span>
                <span class="price-value">${p.preco}</span>
            </div>
            <div class="card-actions">
                <a href="${p.link}" target="_blank" class="btn-buy" onclick="registrarClique('${p.nome}', '${lojaNome}')">
                    <i class="${iconeBotao}"></i> ${textoBotao}
                </a>
                <button class="btn-share" onclick="compartilharOferta('${identificador}', '${p.nome}', '${p.preco}')">
                    <i class="fas fa-share-alt"></i>
                </button>
            </div>
        </div>
    </div>`;
}

function carregarProdutos() {
    const grid = document.getElementById('offersGrid');
    if (!grid) return;
    grid.innerHTML = meusProdutos.map(p => gerarCardHTML(p)).join('');

    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                target.classList.add('highlight-card');
                setTimeout(() => target.classList.remove('highlight-card'), 2000);
            }
        }, 500);
    }
}

/* ==========================================
   INTEGRAÇÃO API MERCADO LIVRE (ACHADINHOS)
   ========================================== */
async function buscarAchadinhosML() {
    const grid = document.getElementById('offersGrid');
    grid.innerHTML = '<p style="text-align:center; grid-column: 1/-1; padding: 50px;">Buscando melhores ofertas no Mercado Livre... <i class="fas fa-spinner fa-spin"></i></p>';

    try {
        const response = await fetch('https://api.mercadolibre.com/sites/MLB/search?q=oferta%20relampago&limit=20');
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            grid.innerHTML = data.results.map(item => {
                const precoFormatado = item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
                const prod = {
                    id: item.id,
                    nome: item.title,
                    desc: 'Produto em destaque no Mercado Livre.',
                    preco: precoFormatado,
                    categoria: 'achadinhos',
                    loja: 'mercadolivre',
                    img: item.thumbnail.replace('-I.jpg', '-O.jpg'),
                    link: item.permalink
                };
                return gerarCardHTML(prod);
            }).join('');
        }
    } catch (error) {
        grid.innerHTML = '<p style="text-align:center; grid-column: 1/-1;">Erro ao carregar achadinhos. Tente novamente mais tarde.</p>';
    }
}

function inicializarFiltros() {
    const botoes = document.querySelectorAll('.filter-btn');
    botoes.forEach(btn => {
        btn.addEventListener('click', (e) => {
            botoes.forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');

            const categoria = e.currentTarget.dataset.categoria;

            if (e.currentTarget.id === 'btn-filtrar-favoritos') {
                filtrarFavoritos();
            } else if (categoria === 'achadinhos') {
                buscarAchadinhosML();
            } else {
                carregarProdutos();
                aplicarFiltroCategoria(categoria);
            }
        });
    });
}

function aplicarFiltroCategoria(cat) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const categoriaCard = card.getAttribute('data-category');
        card.style.display = (cat === 'todos' || categoriaCard === cat) ? "flex" : "none";
    });
}

function filtrarFavoritos() {
    carregarProdutos();
    const cards = document.querySelectorAll('.card');
    let encontrouAlgum = false;
    cards.forEach(card => {
        const btnFav = card.querySelector('.btn-favorite');
        const match = btnFav.getAttribute('onclick').match(/'([^']+)'/);
        const idDoCard = match ? match[1] : null;
        if (listaFavoritosNEB.includes(idDoCard)) {
            card.style.display = "flex";
            encontrouAlgum = true;
        } else {
            card.style.display = "none";
        }
    });
    if (!encontrouAlgum) {
        mostrarNotificacao("Nenhum favorito salvo ainda! ❤️");
        document.querySelector('[data-categoria="todos"]').click();
    }
}

/* ==========================================
   FILTRO DE PREÇO (DINÂMICO)
   ========================================== */
function configurarFiltroPrecoDinamico() {
    const btnToggle = document.getElementById('togglePriceFilter');
    const panel = document.getElementById('priceFilterPanel');
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');

    if (!priceRange || !meusProdutos.length) return;

    const precosNumericos = meusProdutos.map(p => 
        parseFloat(p.preco.replace(/\./g, '').replace(',', '.'))
    );
    const maiorPreco = Math.ceil(Math.max(...precosNumericos));

    priceRange.max = maiorPreco;
    priceRange.value = maiorPreco;
    priceValue.textContent = maiorPreco.toLocaleString('pt-BR');

    priceRange.addEventListener('input', () => {
        const maxPrice = parseFloat(priceRange.value);
        priceValue.textContent = maxPrice.toLocaleString('pt-BR');
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            const priceText = card.querySelector('.price-value').textContent;
            const price = parseFloat(priceText.replace(/\./g, '').replace(',', '.'));
            card.style.display = (price <= maxPrice) ? "flex" : "none";
        });
    });

    if (btnToggle) {
        btnToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            panel.classList.toggle('hidden');
        });
        document.addEventListener('click', (e) => {
            if (!panel.contains(e.target) && e.target !== btnToggle) {
                panel.classList.add('hidden');
            }
        });
    }
}

/* ==========================================
   CARROSSEL, BUSCA E UTILITÁRIOS
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
    if (slideIndex > slides.length) slideIndex = 1;
    slides[slideIndex - 1].style.opacity = "1";
    slides[slideIndex - 1].classList.add("active");
    setTimeout(showSlides, 6000);
}

window.filterOffers = function() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        let name = card.getAttribute('data-name').toLowerCase();
        card.style.display = name.includes(input) ? "flex" : "none";
    });
}

window.registrarClique = function(produto, loja) {
    if (typeof gtag === 'function') {
        gtag('event', 'clique_produto', { 'event_label': produto, 'loja_destino': loja });
    }
}

window.compartilharOferta = function(id, titulo, preco) {
    const urlBase = window.location.href.split('#')[0]; 
    const urlComAncora = `${urlBase}#${id}`;
    const texto = `🌟 *OFERTA NO MERCADO NEB*\n\n*${titulo}*\n*R$ ${preco}*\n\n🛒 *Link da Oferta:* ${urlComAncora}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(texto)}`, '_blank');
}

/* ==========================================
   INICIALIZAÇÃO GLOBAL
   ========================================== */
window.onload = function() {
    carregarProdutos();
    inicializarFiltros();
    configurarFiltroPrecoDinamico();
    showSlides();
};