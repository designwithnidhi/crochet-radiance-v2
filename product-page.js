/**
 * Crochet Radiance - Product Page Interactivity
 * Lightbox gallery with navigation for individual product pages.
 */

document.addEventListener('DOMContentLoaded', () => {
  const productItems = document.querySelectorAll('.product-item');
  if (productItems.length === 0) return; // Only run on product pages

  // Collect all product image sources
  const images = [];
  productItems.forEach(item => {
    const img = item.querySelector('.product-img-wrapper img');
    if (img) images.push(img.src);
  });

  let currentIndex = 0;

  // Create lightbox DOM
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = `
    <button class="lightbox-close" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>
    <button class="lightbox-nav lightbox-prev" aria-label="Previous"><i class="fa-solid fa-chevron-left"></i></button>
    <img src="" alt="Product Image Zoomed">
    <button class="lightbox-nav lightbox-next" aria-label="Next"><i class="fa-solid fa-chevron-right"></i></button>
  `;
  document.body.appendChild(overlay);

  const lightboxImg = overlay.querySelector('img');
  const closeBtn = overlay.querySelector('.lightbox-close');
  const prevBtn = overlay.querySelector('.lightbox-prev');
  const nextBtn = overlay.querySelector('.lightbox-next');

  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = images[currentIndex];
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex];
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex];
  }

  // Click on product item to open lightbox
  productItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });

  // Controls
  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', showPrev);
  nextBtn.addEventListener('click', showNext);

  // Click on backdrop to close
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });
});
