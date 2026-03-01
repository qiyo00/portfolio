/* ═══════════════════════════════════════════
   GALLERY PAGE — card clicks + lightbox
═══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  const lightbox        = document.getElementById('lightbox');
  const lightboxImg     = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose   = document.getElementById('lightbox-close');
  const lightboxBg      = document.getElementById('lightbox-backdrop');

  // ── Open lightbox ──
  function openLightbox(src, caption) {
    lightboxImg.src = src;
    lightboxImg.alt = caption || '';
    lightboxCaption.textContent = caption || '';
    lightbox.classList.add('open');
    document.body.classList.add('lightbox-open');
    lightboxClose.focus();
  }

  // ── Close lightbox ──
  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.classList.remove('lightbox-open');
    // Clear src after transition so old image doesn't flash next time
    setTimeout(() => { lightboxImg.src = ''; }, 300);
  }

  // ── Card clicks ──
  document.querySelectorAll('.gallery-card').forEach(card => {
    card.addEventListener('click', () => {
      const caseStudy = card.dataset.casestudy;
      const lightboxSrc = card.dataset.lightbox;
      const caption = card.dataset.caption;

      if (caseStudy) {
        window.location.href = caseStudy;
      } else if (lightboxSrc) {
        openLightbox(lightboxSrc, caption);
      }
    });
  });

  // ── Close triggers ──
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxBg.addEventListener('click', closeLightbox);

  // ESC key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });

});
