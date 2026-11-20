// Muro que se levanta con el scroll: cuadros WebP en un canvas, con fundido entre cuadros.
// Plan B: movimiento reducido, ahorro de datos, conexión lenta o poca memoria = imagen fija.
(() => {
  const sec = document.querySelector('[data-obra]');
  if (!sec) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cn = navigator.connection || {};
  const lento = cn.saveData || /(^|-)(slow-2g|2g|3g)$/.test(cn.effectiveType || '');
  const pocaMem = (navigator.deviceMemory && navigator.deviceMemory <= 2);

  // Video de portada: se pausa con movimiento reducido, ahorro de datos o conexión lenta, y cuando no se ve
  const vid = document.querySelector('.hero__video');
  if (vid) {
    if (reduce || lento) { vid.removeAttribute('autoplay'); vid.pause(); }
    else {
      new IntersectionObserver((e) => { e[0].isIntersecting ? vid.play().catch(() => {}) : vid.pause(); }).observe(vid);
    }
  }

  if (reduce || lento || pocaMem) return;

  sec.classList.add('is-live');
  const sticky = sec.querySelector('.obra__sticky'), canvas = sec.querySelector('.obra__canvas');
  const ctx = canvas.getContext('2d', { alpha: false });
  const steps = [...sec.querySelectorAll('.obra__step')], cta = sec.querySelector('.obra__cta'), bar = sec.querySelector('.obra__bar');
  const D = sec.dataset;
  let set = null, frames = [], loaded = 0, started = false, raf = 0, shown = -1, visible = false;

  const pick = () => (innerHeight > innerWidth
    ? { base: D.v, n: +D.nv, w: 540, h: 960 }
    : { base: D.h, n: +D.nh, w: 1280, h: 720 });
  const name = (i) => String(i + 1).padStart(3, '0') + '.webp';

  function load() {
    const s = pick();
    if (set && set.base === s.base) return;
    set = s; frames = new Array(s.n); loaded = 0; shown = -1;
    canvas.width = s.w; canvas.height = s.h;
    // primero el primero y el último, luego en orden
    const order = [0, s.n - 1, ...Array.from({ length: s.n - 2 }, (_, i) => i + 1)];
    order.forEach((i) => {
      const im = new Image();
      im.decoding = 'async';
      im.onload = () => { frames[i] = im; loaded++; shown = -1; schedule(); };
      im.src = s.base + name(i);
    });
  }

  const nearest = (i) => { for (let k = 0; k < frames.length; k++) { const a = frames[i - k] ? i - k : frames[i + k] ? i + k : -1; if (a >= 0) return a; } return -1; };

  function draw(p) {
    if (!set) return;
    const f = p * (set.n - 1), i = Math.floor(f), t = f - i;
    const key = Math.round(f * 20);
    if (key === shown) return; shown = key;
    const a = nearest(i); if (a < 0) return;
    ctx.globalAlpha = 1; ctx.drawImage(frames[a], 0, 0, set.w, set.h); sec.classList.add('has-frame');
    const b = frames[i + 1] ? i + 1 : -1;
    if (b >= 0 && t > 0.02) { ctx.globalAlpha = t; ctx.drawImage(frames[b], 0, 0, set.w, set.h); ctx.globalAlpha = 1; }
  }

  function progress() {
    const r = sec.querySelector('.obra__track').getBoundingClientRect();
    const total = r.height - sticky.offsetHeight;
    return total > 0 ? Math.max(0, Math.min(1, -r.top / total)) : 0;
  }

  function frame() {
    raf = 0;
    const p = progress();
    draw(p);
    bar.style.transform = `scaleX(${p.toFixed(3)})`;
    const k = p < 0.34 ? 0 : p < 0.7 ? 1 : 2;
    steps.forEach((s, j) => s.classList.toggle('is-on', j === k));
    cta.classList.toggle('is-on', p > 0.88);
  }
  function schedule() { if (!raf && visible) raf = requestAnimationFrame(frame); }

  new IntersectionObserver((e) => {
    visible = e[0].isIntersecting;
    if (visible) { if (!started) { started = true; load(); } schedule(); }
  }, { rootMargin: '120% 0px 120% 0px' }).observe(sec);

  // Empezar a bajar los cuadros un poco antes de llegar
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', () => { if (started) { load(); schedule(); } });
})();
