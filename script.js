/* =====================================================
   MERCADO NEB — script.js
   ===================================================== */

const PRODUTOS_POR_PAGINA = 20;
let paginaAtual = 1;
let meusProdutos = [];
let produtosFiltrados = [];
let hashScrollRealizado = false;

const EstadoFiltros = {
    categoria: 'todos',
    busca: '',
    favoritos: false,
    precoMax: Infinity
};

/* =====================================================
   UTILITÁRIOS E FORMATAÇÃO
   ===================================================== */

function converterParaNumero(valor) {
    if (!valor) return 0;
    let str = String(valor).trim();
    if (str.includes(',')) {
        str = str.replace(/\./g, '').replace(',', '.');
    }
    let num = parseFloat(str);
    return isNaN(num) ? 0 : num;
}

function formatarMoeda(valor) {
    const num = converterParaNumero(valor);
    return num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

window.registrarClique = function(produto, loja) {
    if (typeof gtag === 'function') {
        gtag('event', 'clique_produto', { event_label: produto, loja_destino: loja });
    }
};

window.compartilharOferta = function(id) {
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

    if (EstadoFiltros.favoritos) {
        aplicarFiltrosGerais();
    }
};

/* =====================================================
   PAGINAÇÃO E RENDERIZAÇÃO
   ===================================================== */

function gerarArrayPaginacao(atual, total) {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

    const paginas = [];
    if (atual <= 4) {
        paginas.push(1, 2, 3, 4, 5, '...', total);
    } else if (atual >= total - 3) {
        paginas.push(1, '...', total - 4, total - 3, total - 2, total - 1, total);
    } else {
        paginas.push(1, '...', atual - 1, atual, atual + 1, '...', total);
    }
    return paginas;
}

function renderizarPagina(lista, pagina) {
    const grid        = document.getElementById('offersGrid');
    const paginacaoEl = document.getElementById('paginacao-produtos');
    
    if (!grid) return;

    if (lista.length === 0) {
        grid.innerHTML = `
            <div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:#64748b;">
                <i class="fas fa-box-open" style="font-size:2rem;margin-bottom:12px;display:block;"></i>
                Nenhum produto encontrado para estes filtros.
            </div>`;
        if (paginacaoEl) paginacaoEl.style.display = 'none';
        return;
    }

    const totalPaginas   = Math.ceil(lista.length / PRODUTOS_POR_PAGINA);
    const inicio         = (pagina - 1) * PRODUTOS_POR_PAGINA;
    const produtosDaPagina = lista.slice(inicio, inicio + PRODUTOS_POR_PAGINA);

    grid.innerHTML = produtosDaPagina.map(p => {
        const eAmazon    = p.loja === 'amazon';
        const lojaNome   = eAmazon ? 'Amazon' : 'Mercado Livre';
        const textoBotao = 'Comprar'; 
        const iconeBotao = eAmazon ? 'fab fa-amazon' : 'fas fa-shopping-cart';
        const isFav      = verificarStatusFavorito(p.id);
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

    const rolandoParaHash = window.location.hash && !hashScrollRealizado;

    if (pagina > 1 && !rolandoParaHash) {
        const ofertasEl = document.getElementById('ofertas');
        if (ofertasEl) ofertasEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (window.location.hash && !hashScrollRealizado) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                target.classList.add('highlight-card');
                hashScrollRealizado = true; 
                setTimeout(() => target.classList.remove('highlight-card'), 2000);
            }
        }, 500);
    }

    if (totalPaginas <= 1) {
        if (paginacaoEl) paginacaoEl.style.display = 'none';
        return;
    }

    if (paginacaoEl) paginacaoEl.style.display = 'flex';

    const btnAnterior = document.getElementById('btn-pag-anterior');
    const btnProximo  = document.getElementById('btn-pag-proximo');
    if (btnAnterior && btnProximo) {
        btnAnterior.disabled      = pagina === 1;
        btnProximo.disabled       = pagina === totalPaginas;
        btnAnterior.style.opacity = pagina === 1 ? '0.35' : '1';
        btnProximo.style.opacity  = pagina === totalPaginas ? '0.35' : '1';
        btnAnterior.style.cursor  = pagina === 1 ? 'default' : 'pointer';
        btnProximo.style.cursor   = pagina === totalPaginas ? 'default' : 'pointer';
    }

    const numerados = document.getElementById('paginas-numeradas');
    if (numerados) {
        numerados.innerHTML = '';
        const arrayPaginacao = gerarArrayPaginacao(pagina, totalPaginas);

        arrayPaginacao.forEach(item => {
            if (item === '...') {
                const span = document.createElement('span');
                span.textContent = '...';
                span.style.display = 'flex';
                span.style.alignItems = 'flex-end';
                span.style.justifyContent = 'center';
                span.style.width = '30px';
                span.style.fontWeight = 'bold';
                span.style.color = '#1a42b9';
                span.style.userSelect = 'none';
                span.style.paddingBottom = '8px';
                numerados.appendChild(span);
            } else {
                const btn = document.createElement('button');
                btn.textContent = item;
                btn.className   = 'btn-pag-numero' + (item === pagina ? ' ativo' : '');
                btn.onclick     = item === pagina ? null : () => {
                    paginaAtual = item;
                    renderizarPagina(produtosFiltrados, paginaAtual);
                };
                numerados.appendChild(btn);
            }
        });
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
   CARREGAMENTO VIA GOOGLE SHEETS E NETLIFY
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
        // REMOVIDO: O timestamp anti-cache. 
        // Agora fazemos fetch direto da URL limpa. O Netlify entrega do cache em milissegundos.
        const res  = await fetch(`/.netlify/functions/produtos-sheets`);
        
        if (!res.ok) throw new Error("Falha na resposta da API");
        
        const data = await res.json();
        meusProdutos      = (data.produtos || []).slice().reverse();
        produtosFiltrados = [...meusProdutos];
        
        paginaAtual = 1;
        
        if (window.location.hash) {
            const idAlvo = window.location.hash.substring(1);
            const indexAlvo = produtosFiltrados.findIndex(p => String(p.id) === idAlvo);
            if (indexAlvo !== -1) {
                paginaAtual = Math.floor(indexAlvo / PRODUTOS_POR_PAGINA) + 1;
            }
        }

        renderizarPagina(produtosFiltrados, paginaAtual);
        configurarFiltroPrecoDinamico();
    } catch (err) {
        console.error("[Erro de Carregamento]", err);
        if (grid) {
            grid.innerHTML = `
                <div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:#ef4444;">
                    <i class="fas fa-exclamation-circle" style="font-size:2rem;margin-bottom:12px;display:block;"></i>
                    Erro ao carregar produtos. Tente recarregar a página.
                </div>`;
        }
    }
}

/* =====================================================
   SISTEMA CENTRALIZADO DE FILTROS E BUSCA
   ===================================================== */

function aplicarFiltrosGerais() {
    let baseFiltro = meusProdutos;

    if (EstadoFiltros.favoritos) {
        baseFiltro = baseFiltro.filter(p => listaFavoritosNEB.includes(String(p.id)));
        
        if (baseFiltro.length === 0) {
            mostrarNotificacao('Nenhum favorito salvo ainda! ❤️');
            EstadoFiltros.favoritos = false;
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            document.querySelector('[data-categoria="todos"]')?.classList.add('active');
            baseFiltro = meusProdutos; 
        }
    }

    if (!EstadoFiltros.favoritos && EstadoFiltros.categoria !== 'todos') {
        baseFiltro = baseFiltro.filter(p => p.categoria === EstadoFiltros.categoria);
    }

    if (EstadoFiltros.busca) {
        const termo = EstadoFiltros.busca.toLowerCase();
        baseFiltro = baseFiltro.filter(p => p.nome.toLowerCase().includes(termo));
    }

    if (EstadoFiltros.precoMax !== Infinity) {
        baseFiltro = baseFiltro.filter(p => converterParaNumero(p.preco) <= EstadoFiltros.precoMax);
    }

    produtosFiltrados = baseFiltro;
    paginaAtual = 1;
    renderizarPagina(produtosFiltrados, paginaAtual);
}

function inicializarFiltros() {
    const botoes = document.querySelectorAll('.filter-btn');
    botoes.forEach(btn => {
        btn.addEventListener('click', (e) => {
            botoes.forEach(b => b.classList.remove('active'));
            const target = e.currentTarget;
            target.classList.add('active');
            
            if (target.id === 'btn-filtrar-favoritos') {
                EstadoFiltros.favoritos = true;
                EstadoFiltros.categoria = 'todos'; 
            } else {
                EstadoFiltros.favoritos = false;
                EstadoFiltros.categoria = target.dataset.categoria;
            }
            aplicarFiltrosGerais();
        });
    });
}

let debounceTimeout;
window.filterOffers = function() {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        const input = document.getElementById('searchInput');
        EstadoFiltros.busca = input ? input.value.trim() : '';
        aplicarFiltrosGerais();
    }, 300); 
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
    
    EstadoFiltros.precoMax = Infinity;

    priceRange.addEventListener('input', () => {
        const maxPrice = parseFloat(priceRange.value);
        priceValue.textContent = maxPrice.toLocaleString('pt-BR');
        EstadoFiltros.precoMax = maxPrice;
        aplicarFiltrosGerais();
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
    Array.from(slides).forEach(s => { 
        s.style.opacity = '0'; 
        s.classList.remove('active'); 
    });
    slideIndex = (slideIndex % slides.length) + 1;
    slides[slideIndex - 1].style.opacity = '1';
    slides[slideIndex - 1].classList.add('active');
    setTimeout(showSlides, 6000);
}

window.onload = function() {
    carregarProdutos();
    inicializarFiltros();
    showSlides();
    
    const infoBanner = document.querySelector('.info-database');
    if (infoBanner) {
        setTimeout(() => {
            infoBanner.style.transition = 'opacity 0.6s ease';
            infoBanner.style.opacity = '0';
            
            setTimeout(() => {
                infoBanner.style.display = 'none';
            }, 600);
        }, 15000);
    }
};
