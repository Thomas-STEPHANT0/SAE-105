
function chargerGalerie() {

    const container = document.getElementById('galerie-container');
    
    galerieData.forEach(item => {

        const article = document.createElement('article');
        article.className = 'card';

        article.innerHTML = `
            <img 
                src="${item.imgSmall}" 
                alt="${item.titre}" 
                data-large="${item.imgLarge}" 
                class="zoomable-img"
            >
            <h3>${item.titre}</h3>
            <p>${item.description}</p>
            <a href="${item.sourceUrl}" target="_blank" class="source-link" title="Voir la source : ${item.credit} (s'ouvre dans une nouvelle fenêtre)">
                © Source : ${item.credit}
            </a>
        `;

        container.appendChild(article);
    });

    initZoom();
}

function initZoom() {
    const modal = document.getElementById('zoomModal');
    const modalImg = document.getElementById('img01');
    const captionText = document.getElementById('caption');
    
    const images = document.querySelectorAll('.zoomable-img');

    images.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = "block";
            modalImg.src = this.getAttribute('data-large');
            captionText.innerHTML = this.alt;
        });
    });

    const span = document.querySelector(".close-zoom");
    span.onclick = function() { 
        modal.style.display = "none";
    }
}

const userUrl = document.getElementById('userUrl');
const userTitle = document.getElementById('userTitle');
const userDesc = document.getElementById('userDesc');
const previewArea = document.getElementById('preview-area');

function updatePreview() {

    if(userUrl.value.length > 0) {
        previewArea.classList.remove('hidden');
        
        document.getElementById('previewImg').src = userUrl.value;
        document.getElementById('previewTitle').textContent = userTitle.value || "Titre de votre photo";
        document.getElementById('previewDesc').textContent = userDesc.value || "Votre description apparaîtra ici...";
    } else {
        previewArea.classList.add('hidden');
    }
}

[userUrl, userTitle, userDesc].forEach(element => {
    element.addEventListener('input', updatePreview);
});

const legalLink = document.getElementById('legal-link');
const legalModal = document.getElementById('legalModal');
const closeLegal = document.querySelector(".close-legal");

legalLink.onclick = function(e) {
    e.preventDefault();
    legalModal.style.display = "block";
}

closeLegal.onclick = function() {
    legalModal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == legalModal) {
        legalModal.style.display = "none";
    }
    if (event.target == document.getElementById('zoomModal')) {
        document.getElementById('zoomModal').style.display = "none";
    }
}

const form = document.getElementById('addForm');
const feedbackBox = document.getElementById('msg-feedback');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const url = document.getElementById('userUrl').value;
    const titre = document.getElementById('userTitle').value;
    const desc = document.getElementById('userDesc').value;

    const newArticle = document.createElement('article');
    newArticle.className = 'card';
    newArticle.innerHTML = `
        <img 
            src="${url}" 
            alt="${titre}" 
            data-large="${url}" 
            class="zoomable-img"
        >
        <h3>${titre}</h3>
        <p>${desc}</p>
        <span class="source-link">© Contribution utilisateur</span>
    `;

    const container = document.getElementById('galerie-container');
    container.appendChild(newArticle);

    initZoom();

    feedbackBox.textContent = "Succès ! Votre évènement a été ajouté à la collection.";
    feedbackBox.className = "feedback success";
    
    form.reset();
    document.getElementById('preview-area').classList.add('hidden');

    setTimeout(function() {
        feedbackBox.className = "feedback hidden";
        feedbackBox.textContent = "";
    }, 5000);
});

document.addEventListener('DOMContentLoaded', chargerGalerie);