(() => {
  const d = document, de = d.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Menú móvil
  const btn = d.querySelector('.menu-btn'), nav = d.getElementById('nav');
  if (btn && nav) {
    const set = (open) => {
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      nav.classList.toggle('is-open', open);
      de.classList.toggle('no-scroll', open);
    };
    btn.addEventListener('click', () => set(btn.getAttribute('aria-expanded') !== 'true'));
    nav.addEventListener('click', (e) => { if (e.target.closest('a')) set(false); });
    d.addEventListener('keydown', (e) => { if (e.key === 'Escape') set(false); });
    matchMedia('(min-width: 900px)').addEventListener('change', (m) => { if (m.matches) set(false); });
  }

  // Aparecer al entrar en pantalla (con escalonado corto)
  d.querySelectorAll('.stagger').forEach((p) => [...p.children].forEach((c, i) => c.style.setProperty('--i', Math.min(i, 5))));
  const items = d.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach((el) => io.observe(el));
  }

  // Nivel de burbuja: se mueve con la velocidad del scroll y se asienta al centro
  const burbuja = d.querySelector('.nivel__burbuja');
  if (burbuja && !reduce) {
    const tubo = burbuja.parentElement;
    let lastY = scrollY, cur = 0, target = 0, raf = 0, visible = true;
    new IntersectionObserver((e) => { visible = e[0].isIntersecting; if (visible) loop(); }).observe(tubo);
    const max = () => tubo.clientWidth / 2 - 38;
    const loop = () => {
      cancelAnimationFrame(raf);
      if (!visible) return;
      cur += (target - cur) * 0.14;
      target *= 0.9;
      burbuja.style.transform = `translate3d(${cur.toFixed(1)}px,0,0)`;
      if (Math.abs(cur) > 0.15 || Math.abs(target) > 0.15) raf = requestAnimationFrame(loop);
      else burbuja.style.transform = 'translate3d(0,0,0)';
    };
    addEventListener('scroll', () => {
      const dy = scrollY - lastY; lastY = scrollY;
      target = Math.max(-1, Math.min(1, dy / 28)) * max();
      loop();
    }, { passive: true });
  }

  const y = d.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
})();
