let currentIdx = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    if (index >= slides.length) currentIdx = 0;
    else if (index < 0) currentIdx = slides.length - 1;
    else currentIdx = index;

    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    
    slides[currentIdx].classList.add('active');
    dots[currentIdx].classList.add('active');
}

function moveSlide(step) {
    showSlide(currentIdx + step);
}

function currentSlide(index) {
    showSlide(index);
}

// Auto Play a cada 5 segundos
setInterval(() => moveSlide(1), 5000);

// Filtro de Busca Inteligente
function filterOffers() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const name = card.getAttribute('data-name').toLowerCase();
        if (name.includes(input)) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
}