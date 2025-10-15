// ======= Buton "sus" =======
const scrollBtn = document.createElement('button');
scrollBtn.textContent = "↑";
scrollBtn.id = "scrollTopBtn";
document.body.appendChild(scrollBtn);

const style = document.createElement('style');
style.textContent = `
  #scrollTopBtn {
    position: fixed;
    bottom: 25px;
    right: 25px;
    background-color: #ff6600;
    color: white;
    border: none;
    border-radius: 50%;
    width: 45px;
    height: 45px;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.4s;
    box-shadow: 0 3px 6px rgba(0,0,0,0.2);
    z-index: 9999;
  }
  #scrollTopBtn.show {
    opacity: 1;
  }
`;
document.head.appendChild(style);

window.addEventListener("scroll", () => {
  if (window.scrollY > 250) scrollBtn.classList.add("show");
  else scrollBtn.classList.remove("show");
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ======= Efect usor de aparitie pentru sectiuni si carduri =======
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.section, .card').forEach(el => observer.observe(el));

// ======= Galerie imagini si Lightbox (daca exista) =======
const galleryImages = document.querySelectorAll('.gallery-grid img');
if (galleryImages.length > 0) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const closeBtn = lightbox?.querySelector('.close');
  const prevBtn = lightbox?.querySelector('.prev');
  const nextBtn = lightbox?.querySelector('.next');
  let currentIndex = 0;

  function showLightbox(index) {
    if (!lightbox) return;
    currentIndex = index;
    lightboxImg.src = galleryImages[currentIndex].src;
    lightbox.classList.add('show');
  }

  galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => showLightbox(index));
  });

  if (closeBtn) closeBtn.addEventListener('click', () => lightbox.classList.remove('show'));
  if (lightbox) lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('show');
  });
  if (prevBtn) prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex].src;
  });
  if (nextBtn) nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex].src;
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('show')) return;
    if (e.key === 'ArrowLeft' && prevBtn) prevBtn.click();
    else if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
    else if (e.key === 'Escape' && closeBtn) closeBtn.click();
  });
}

// ======= Formular contact (simulare trimitere) =======
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Mesajul tau a fost trimis cu succes! Multumim pentru contact.");
    contactForm.reset();
  });
}

// ======= Meniu mobil =======
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      mobileMenu.classList.toggle('show');
    });

    // Inchidere meniu la click pe link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('show');
      });
    });
  }
});
// Adauga clasa loaded dupa ce pagina se incarca complet pentru animatia liniei
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});
// Toggle submeniuri mobile
document.querySelectorAll('.mobile-menu .has-submenu > a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const parent = link.parentElement;
    parent.classList.toggle('open');
  });
});

// Toggle meniul principal mobile
const burger = document.querySelector('.burger');
const mobileMenu = document.querySelector('.mobile-menu');
burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('show');
});
