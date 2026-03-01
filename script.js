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
  const dropWrap    = document.querySelector('.nav-dropdown');
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
  const toggle   = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      const [s1, s2] = toggle.querySelectorAll('span');
      s1.style.transform = open ? 'translateY(3px)  rotate(45deg)'  : '';
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

});