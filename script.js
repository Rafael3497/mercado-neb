/* =====================================================
   MERCADO NEB — script.js
   ===================================================== */

const PRODUTOS_POR_PAGINA = 20;
let paginaAtual = 1;
let meusProdutos = [];
let produtosFiltrados = [];

/* =====================================================
   UTILITÁRIOS E FORMATAÇÃO
   ===================================================== */

// Converte qualquer formato de preço da planilha para um número matemático real
function converterParaNumero(valor) {
    if (!valor) return 0;
    let str = String(valor).trim();
    if (str.includes(',')) {
        str = str.replace(/\./g, '').replace(',', '.');
    }
    let num = parseFloat(str);
    return isNaN(num) ? 0 : num;
}

// Garante que o número sempre terá 2 casas decimais (ex: 19,9 vira 19,90)
function formatarMoeda(valor) {
    const num = converterParaNumero(valor);
    return num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

window.registrarClique = function(produto, loja) {
    if (typeof gtag === 'function') {
        gtag('event', 'clique_produto', { event_label: produto, loja_destino: loja });
    }
};

// Nova função BLINDADA: Recebe apenas o ID e constrói o texto em memória
window.compartilharOferta = function(id) {
    // Busca os dados originais do produto na memória
    const produto = meusProdutos.find(p => String(p.id) === String(id));
    if (!produto) return;

    const urlBase = window.location.href.split('#')[0];
    const urlComAncora = `${urlBase}#${produto.id}`;
    
    const precoFormatado = formatarMoeda(produto.preco);
    let textoPreco = `*R$ ${precoFormatado}*`;
    
    if (produto.precoAntigo && produto.precoAntigo !== 'undefined' && produto.precoAntigo.trim() !== '') {
        textoPreco = `~R$ ${formatarMoeda(produto.precoAntigo)}~ *R$ ${precoFormatado}*`;
    }

    const texto = `🌟 *OFERTA NO MERCADO NEB*\n\n*${produto.nome}* 📦\n\nPor apenas: ${textoPreco} 😯\n\nFrete Grátis 🚚\n\n🛒 *Link da Oferta:* ${urlComAncora}`;
    
    // Usando o wa.me que é a rota oficial e mais estável do WhatsApp para mobile
    window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`, '_blank');
};


/* =====================================================
   FAVORITOS
   ===================================================== */
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
    setTimeout(() => toast.remove(), 3000);
}

window.toggleFavorito = function(event, produtoId) {
    if (event) { event.preventDefault(); event.stopPropagation(); }
    const btn   = event.currentTarget;
    const icone = btn.querySelector('i');
    const index = listaFavoritosNEB.indexOf(String(produtoId));

    if (index === -1) {
        listaFavoritosNEB.push(String(produtoId));
        btn.classList.add('active');
        if (icone) icone.classList.replace('far', 'fas');
        mostrarNotificacao('Salvo nos favoritos! ❤️');
    } else {
        listaFavoritosNEB.splice(index, 1);
        btn.classList.remove('active');
        if (icone) icone.classList.replace('fas', 'far');
        mostrarNotificacao('Removido dos favoritos.');
    }

    localStorage.setItem('mercado_neb_favs', JSON.stringify(listaFavoritosNEB));

    if (document.querySelector('.btn-fav-filter.active')) {
        filtrarFavoritos();
    }
};

/* =====================================================
   PAGINAÇÃO E RENDERIZAÇÃO
   ===================================================== */
function renderizarPagina(lista, pagina) {
    const grid        = document.getElementById('offersGrid');
    const paginacaoEl = document.getElementById('paginacao-produtos');
    if (!grid) return;

    const totalPaginas   = Math.ceil(lista.length / PRODUTOS_POR_PAGINA);
    const inicio         = (pagina - 1) * PRODUTOS_POR_PAGINA;
    const produtosDaPagina = lista.slice(inicio, inicio + PRODUTOS_POR_PAGINA);

    grid.innerHTML = produtosDaPagina.map(p => {
        const eAmazon    = p.loja === 'amazon';
        const lojaNome   = eAmazon ? 'Amazon' : 'Mercado Livre';
        const textoBotao = eAmazon ? 'Comprar na Amazon' : 'Comprar no Mercado Livre';
        const iconeBotao = eAmazon ? 'fab fa-amazon' : 'fas fa-shopping-cart';
        const isFav      = verificarStatusFavorito(p.id);
        
        // Removemos o envio direto do texto pro botão, agora mandamos só o ID
        const tituloEscapado = p.nome.replace(/'/g, "\\'").replace(/"/g, '&quot;');

        return `
        <div class="card" id="${p.id}" data-name="${p.nome}" data-category="${p.categoria}">
            <div class="card-img">
                <span class="badge-loja ${p.loja}">${lojaNome}</span>
                <button class="btn-favorite ${isFav ? 'active' : ''}" onclick="toggleFavorito(event, '${p.id}')">
                    <i class="${isFav ? 'fas' : 'far'} fa-heart"></i>
                </button>
                <img src="${p.img}" alt="${p.nome}" loading="lazy">
            </div>
            <div class="card-info">
                <h3>${p.nome}</h3>
                <p>${p.desc || 'Oferta selecionada do dia!'}</p>
                
                <div class="price-container">
                    <span class="price-label">R$</span>
                    <span class="price-value">${formatarMoeda(p.preco)}</span>
                </div>

                <div class="card-actions">
                    <a href="${p.link}" target="_blank" class="btn-buy" onclick="registrarClique('${tituloEscapado}', '${lojaNome}')">
                        <i class="${iconeBotao}"></i> ${textoBotao}
                    </a>
                    <button class="btn-share" onclick="compartilharOferta('${p.id}')">
                        <i class="fas fa-share-alt"></i>
                    </button>
                </div>
            </div>
        </div>`;
    }).join('');

    if (pagina > 1) {
        const ofertasEl = document.getElementById('ofertas');
        if (ofertasEl) ofertasEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (window.location.hash && pagina === 1) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                target.classList.add('highlight-card');
                setTimeout(() => target.classList.remove('highlight-card'), 2000);
            }
        }, 500);
    }

    if (totalPaginas <= 1) {
        paginacaoEl.style.display = 'none';
        return;
    }

    paginacaoEl.style.display = 'flex';

    const btnAnterior = document.getElementById('btn-pag-anterior');
    const btnProximo  = document.getElementById('btn-pag-proximo');
    btnAnterior.disabled      = pagina === 1;
    btnProximo.disabled       = pagina === totalPaginas;
    btnAnterior.style.opacity = pagina === 1 ? '0.35' : '1';
    btnProximo.style.opacity  = pagina === totalPaginas ? '0.35' : '1';
    btnAnterior.style.cursor  = pagina === 1 ? 'default' : 'pointer';
    btnProximo.style.cursor   = pagina === totalPaginas ? 'default' : 'pointer';

    const numerados = document.getElementById('paginas-numeradas');
    numerados.innerHTML = '';
    for (let i = 1; i <= totalPaginas; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.className   = 'btn-pag-numero' + (i === pagina ? ' ativo' : '');
        btn.onclick     = i === pagina ? null : () => {
            paginaAtual = i;
            renderizarPagina(produtosFiltrados, paginaAtual);
        };
        numerados.appendChild(btn);
    }
}

window.mudarPagina = function(direcao) {
    const totalPaginas = Math.ceil(produtosFiltrados.length / PRODUTOS_POR_PAGINA);
    const nova = paginaAtual + direcao;
    if (nova < 1 || nova > totalPaginas) return;
    paginaAtual = nova;
    renderizarPagina(produtosFiltrados, paginaAtual);
};

/* =====================================================
   CARREGAMENTO VIA GOOGLE SHEETS
   ===================================================== */
async function carregarProdutos() {
    const grid = document.getElementById('offersGrid');
    if (grid) {
        grid.innerHTML = `
            <div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:#64748b;">
                <i class="fas fa-spinner fa-spin" style="font-size:2rem;margin-bottom:12px;display:block;"></i>
                Carregando ofertas...
            </div>`;
    }

    try {
        const res  = await fetch('/.netlify/functions/produtos-sheets');
        const data = await res.json();
        meusProdutos     = (data.produtos || []).slice().reverse(); // p78 primeiro
        produtosFiltrados = [...meusProdutos];
        paginaAtual = 1;
        renderizarPagina(produtosFiltrados, paginaAtual);
        configurarFiltroPrecoDinamico();
    } catch (err) {
        if (grid) {
            grid.innerHTML = `
                <div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:#ef4444;">
                    <i class="fas fa-exclamation-circle" style="font-size:2rem;margin-bottom:12px;display:block;"></i>
                    Erro ao carregar produtos. Tente novamente.
                </div>`;
        }
    }
}

/* =====================================================
   FILTROS E BUSCA
   ===================================================== */
function inicializarFiltros() {
    const botoes = document.querySelectorAll('.filter-btn');
    botoes.forEach(btn => {
        btn.addEventListener('click', (e) => {
            botoes.forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            paginaAtual = 1;
            if (e.currentTarget.id === 'btn-filtrar-favoritos') {
                filtrarFavoritos();
            } else {
                aplicarFiltroCategoria(e.currentTarget.dataset.categoria);
            }
        });
    });
}

function aplicarFiltroCategoria(cat) {
    produtosFiltrados = cat === 'todos'
        ? [...meusProdutos]
        : meusProdutos.filter(p => p.categoria === cat);
    paginaAtual = 1;
    renderizarPagina(produtosFiltrados, paginaAtual);
}

function filtrarFavoritos() {
    produtosFiltrados = meusProdutos.filter(p => listaFavoritosNEB.includes(String(p.id)));
    paginaAtual = 1;

    if (produtosFiltrados.length === 0) {
        mostrarNotificacao('Nenhum favorito salvo ainda! ❤️');
        produtosFiltrados = [...meusProdutos];
        document.querySelector('[data-categoria="todos"]')?.classList.add('active');
        document.getElementById('btn-filtrar-favoritos')?.classList.remove('active');
    }
    renderizarPagina(produtosFiltrados, paginaAtual);
}

window.filterOffers = function() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    produtosFiltrados = meusProdutos.filter(p =>
        p.nome.toLowerCase().includes(input)
    );
    paginaAtual = 1;
    renderizarPagina(produtosFiltrados, paginaAtual);
};

/* =====================================================
   FILTRO DE PREÇO DINÂMICO
   ===================================================== */
function configurarFiltroPrecoDinamico() {
    const btnToggle  = document.getElementById('togglePriceFilter');
    const panel      = document.getElementById('priceFilterPanel');
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');

    if (!priceRange || !meusProdutos.length) return;

    const precosNumericos = meusProdutos.map(p => converterParaNumero(p.preco));
    const maiorPreco = Math.ceil(Math.max(...precosNumericos));

    priceRange.max   = maiorPreco;
    priceRange.value = maiorPreco;
    priceValue.textContent = maiorPreco.toLocaleString('pt-BR');

    priceRange.addEventListener('input', () => {
        const maxPrice = parseFloat(priceRange.value);
        priceValue.textContent = maxPrice.toLocaleString('pt-BR');
        produtosFiltrados = meusProdutos.filter(p => {
            const price = converterParaNumero(p.preco);
            return price <= maxPrice;
        });
        paginaAtual = 1;
        renderizarPagina(produtosFiltrados, paginaAtual);
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

/* =====================================================
   CARROSSEL E INICIALIZAÇÃO
   ===================================================== */
let slideIndex = 0;

function showSlides() {
    const slides = document.getElementsByClassName('slide');
    if (!slides.length) return;
    Array.from(slides).forEach(s => { s.style.opacity = '0'; s.classList.remove('active'); });
    slideIndex = (slideIndex % slides.length) + 1;
    slides[slideIndex - 1].style.opacity = '1';
    slides[slideIndex - 1].classList.add('active');
    setTimeout(showSlides, 6000);
}

window.onload = function() {
    carregarProdutos();
    inicializarFiltros();
    showSlides();
};