document.addEventListener('DOMContentLoaded', () => {

  const lightbox        = document.getElementById('lightbox');
  const lightboxImg     = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose   = document.getElementById('lightbox-close');
  const lightboxBg      = document.getElementById('lightbox-backdrop');
  const lightboxPrev    = document.getElementById('lightbox-prev');
  const lightboxNext    = document.getElementById('lightbox-next');
  const lightboxDots    = document.getElementById('lightbox-dots');

  let images  = [];   // 当前 lightbox 的图片数组
  let current = 0;    // 当前显示的索引

  // ── 渲染指定索引的图片 ──
  function showImage(index) {
    current = (index + images.length) % images.length;
    lightboxImg.src = images[current].src;
    lightboxImg.alt = images[current].caption || '';
    lightboxCaption.textContent = images[current].caption || '';

    // 更新箭头显隐
    const multi = images.length > 1;
    lightboxPrev.style.display = multi ? 'flex' : 'none';
    lightboxNext.style.display = multi ? 'flex' : 'none';

    // 更新小圆点
    lightboxDots.innerHTML = '';
    if (multi) {
      images.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = 'lightbox-dot' + (i === current ? ' active' : '');
        dot.addEventListener('click', () => showImage(i));
        lightboxDots.appendChild(dot);
      });
    }
  }

  // ── 打开 lightbox ──
  function openLightbox(srcs, captions, startIndex = 0) {
    images = srcs.map((src, i) => ({ src, caption: captions[i] || '' }));
    lightbox.classList.add('open');
    document.body.classList.add('lightbox-open');
    showImage(startIndex);
    lightboxClose.focus();
  }

  // ── 关闭 lightbox ──
  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.classList.remove('lightbox-open');
    setTimeout(() => {
      lightboxImg.src = '';
      images = [];
    }, 300);
  }

  // ── 卡片点击 ──
  document.querySelectorAll('.gallery-card').forEach(card => {
    card.addEventListener('click', () => {
      const caseStudy  = card.dataset.casestudy;
      const lightboxSrc = card.dataset.lightbox;

      if (caseStudy) {
        window.location.href = caseStudy;
      } else if (lightboxSrc) {
        const srcs     = lightboxSrc.split('|').map(s => s.trim());
        const titles   = (card.dataset.lightboxTitle || '').split('|').map(s => s.trim());
        openLightbox(srcs, titles);
      }
    });
  });

  // ── 箭头按钮 ──
  lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); showImage(current - 1); });
  lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); showImage(current + 1); });

  // ── 关闭触发 ──
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxBg.addEventListener('click', closeLightbox);

  // ── 键盘控制 ──
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  showImage(current - 1);
    if (e.key === 'ArrowRight') showImage(current + 1);
  });

});