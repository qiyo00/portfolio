/* ═══════════════════════════════════════════
   QINGYUE GUO — Portfolio Script
═══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  // 1. Header: transparent → frosted on scroll
  const header = document.getElementById('site-header');
  const updateHeader = () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // 2. Dropdown (Work menu)
  const dropWrap = document.querySelector('.nav-dropdown');
  const dropTrigger = document.querySelector('.dropdown-trigger');
  if (dropTrigger && dropWrap) {
    dropTrigger.addEventListener('click', e => {
      e.stopPropagation();
      const open = dropWrap.classList.toggle('open');
      dropTrigger.setAttribute('aria-expanded', open);
    });
    document.addEventListener('click', () => {
      dropWrap.classList.remove('open');
      dropTrigger.setAttribute('aria-expanded', false);
    });
    dropWrap.addEventListener('click', e => e.stopPropagation());
  }

  // 3. Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      const [s1, s2] = toggle.querySelectorAll('span');
      s1.style.transform = open ? 'translateY(3px)  rotate(45deg)' : '';
      s2.style.transform = open ? 'translateY(-3px) rotate(-45deg)' : '';
    });
  }

  // 4. Scroll reveal (generic .reveal elements)
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.reveal').forEach((el, i) => {
    // Stagger gallery cards
    if (el.classList.contains('gallery-card')) {
      el.style.transitionDelay = `${i * 0.07}s`;
    }
    observer.observe(el);
  });

  // 5. Lightbox
  const lightbox = document.getElementById('lightbox');
  const lbImg = lightbox.querySelector('.lightbox-img');
  const lbCaption = lightbox.querySelector('.lightbox-caption');
  const lbClose = lightbox.querySelector('.lightbox-close');
  const lbBackdrop = lightbox.querySelector('.lightbox-backdrop');

  function openLightbox(src, title) {
    lbImg.src = src;
    lbImg.alt = title || '';
    lbCaption.textContent = title || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    // Clear src after transition ends to avoid flash on re-open
    setTimeout(() => { lbImg.src = ''; }, 350);
  }

  // Open on card click (cards with data-lightbox attribute)
  document.querySelectorAll('.gallery-card[data-lightbox]').forEach(card => {
    card.addEventListener('click', () => {
      openLightbox(card.dataset.lightbox, card.dataset.lightboxTitle);
    });
  });

  // Close via button or backdrop
  lbClose.addEventListener('click', closeLightbox);
  lbBackdrop.addEventListener('click', closeLightbox);

  // Close via Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });
});