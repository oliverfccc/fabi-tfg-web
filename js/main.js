/* ─── CUSTOM CURSOR ──────────────────────────────── */
const cursor = document.getElementById('cursor');
const halo   = document.getElementById('cursor-halo');

if (cursor && window.matchMedia('(pointer: fine)').matches) {
  let hx = window.innerWidth / 2;
  let hy = window.innerHeight / 2;

  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
    hx += (e.clientX - hx) * 0.16;
    hy += (e.clientY - hy) * 0.16;
  });

  (function loopHalo() {
    halo.style.left = hx + 'px';
    halo.style.top  = hy + 'px';
    hx += ((parseFloat(cursor.style.left) || hx) - hx) * 0.14;
    hy += ((parseFloat(cursor.style.top)  || hy) - hy) * 0.14;
    requestAnimationFrame(loopHalo);
  })();
}


/* ─── NAV SHOW/HIDE ──────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('visible', window.scrollY > 60);
}, { passive: true });


/* ─── PROGRESS BAR ───────────────────────────────── */
const fill = document.getElementById('progress-fill');
if (fill) {
  window.addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    fill.style.height = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
  }, { passive: true });
}


/* ─── REVEAL ON SCROLL ───────────────────────────── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const delay = el.dataset.delay || (i * 80);
    setTimeout(() => el.classList.add('in-view'), Number(delay));
    revealObs.unobserve(el);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.dataset.delay = i * 90;
  revealObs.observe(el);
});


/* ─── SMOOTH ANCHOR SCROLL ───────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
