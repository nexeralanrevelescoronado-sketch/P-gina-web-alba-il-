/* Nivel de burbuja con el sensor del celular.
   - Usa deviceorientation (beta/gamma) para sacar el vector "arriba" en el marco del cel.
   - Funciona con el cel de canto (horizontal) o contra la pared (vertical).
   - El instrumento se gira solo (0/90/180/270) para que lo leas derecho aunque el bloqueo de rotación esté activo.
   Nada se manda a ningún servidor: todo se calcula en el teléfono. */
(() => {
  const $ = (id) => document.getElementById(id);
  const inst = $('inst');
  if (!inst) return;

  const panel = $('panel'), gH = $('gH'), gV = $('gV'), vial = $('vial'), vialB = $('vialB'),
    disk = $('disk'), diskB = $('diskB'), deg = $('deg'), deg2 = $('deg2'), msg = $('msg'),
    start = $('start'), cal = $('cal'), reset = $('reset'), modeLbl = $('modeLbl'), tip = $('tip');
  const modeBtns = [...document.querySelectorAll('[data-mode-btn]')];

  const RAD = Math.PI / 180;
  const RANGE = 5;   // grados con los que la burbuja llega al extremo
  const LEVEL = 0.5; // grados para marcar "nivelado"
  const TIPS = {
    h: 'Pon el cel de canto (parado sobre su orilla) sobre la repisa, mesa, viga o piso, con la pantalla hacia ti. Si lo giras, el nivel se acomoda solo.',
    v: 'Recarga la parte de atrás del cel contra la pared, poste o marco de puerta, con la pantalla hacia ti.',
  };

  let mode = 'h', got = false, up = null, q = 0, rot = 0, raf = 0, wasLevel = false, lock = null;
  let offs = { h: 0, x: 0, z: 0 };
  try { const s = JSON.parse(localStorage.getItem('nivel-offs') || 'null'); if (s) offs = Object.assign(offs, s); } catch (e) {}
  const cur = { h: 0, x: 0, z: 0 }; // lecturas sin calibrar

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const setText = (el, t) => { if (el.textContent !== t) el.textContent = t; };

  // Vector "arriba" en el marco del dispositivo, a partir de beta/gamma (válido en iPhone y Android)
  function onOrient(e) {
    if (e.beta == null || e.gamma == null) return;
    const b = e.beta * RAD, g = e.gamma * RAD;
    const r = [-Math.sin(g) * Math.cos(b), Math.sin(b), Math.cos(g) * Math.cos(b)];
    if (!up) up = r.slice(); else for (let i = 0; i < 3; i++) up[i] += (r[i] - up[i]) * 0.3; // suavizado
    if (!got) { got = true; inst.classList.add('is-on'); start.hidden = true; getLock(); }
    if (!raf) raf = requestAnimationFrame(() => { raf = 0; render(); });
  }

  async function getLock() {
    try { if ('wakeLock' in navigator) lock = await navigator.wakeLock.request('screen'); } catch (e) {}
  }
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible' && got) getLock(); });

  // Pasa el vector al marco de la pantalla (por si el sistema giró la pantalla) y luego al del instrumento
  function frame() {
    const ang = (screen.orientation && typeof screen.orientation.angle === 'number') ? screen.orientation.angle
      : (typeof window.orientation === 'number' ? window.orientation : 0);
    const a = ((ang % 360) + 360) % 360;
    const [ux, uy, uz] = up;
    let sx, sy;
    if (a === 90) { sx = -uy; sy = ux; }
    else if (a === 180) { sx = -ux; sy = -uy; }
    else if (a === 270) { sx = uy; sy = -ux; }
    else { sx = ux; sy = uy; }

    if (Math.abs(uz) < 0.85) { // si está acostado no hay "arriba" en la pantalla: se conserva el giro
      const psi = Math.atan2(sx, sy) / RAD;
      const d = ((((psi - q) % 360) + 540) % 360) - 180;
      if (Math.abs(d) > 55) { q = Math.round(psi / 90) * 90; if (q === -180) q = 180; }
    }
    const c = Math.cos(q * RAD), s = Math.sin(q * RAD);
    return { lx: sx * c - sy * s, ly: sx * s + sy * c, lz: uz };
  }

  function render() {
    if (!up) return;
    const { lx, ly, lz } = frame();

    // giro del panel por el camino más corto
    const diff = ((((q - rot) % 360) + 540) % 360) - 180;
    if (Math.abs(diff) > 0.01) { rot += diff; panel.style.transform = `rotate(${rot}deg)`; }

    let level = false;
    if (mode === 'h') {
      const ok = Math.abs(lz) < 0.5;
      cur.h = Math.atan2(lx, Math.abs(ly)) / RAD;
      const v = cur.h - offs.h;
      const maxPx = (vial.clientWidth - vialB.offsetWidth) / 2 - 6;
      vialB.style.transform = `translate3d(${(ok ? clamp(v / RANGE, -1, 1) * maxPx : 0).toFixed(1)}px,0,0)`;
      setText(deg, ok ? `${Math.abs(v).toFixed(1)}°` : '—');
      setText(deg2, '');
      level = ok && Math.abs(v) < LEVEL;
      setText(msg, !ok ? 'Pon el cel de canto, parado sobre su orilla'
        : level ? '¡Nivelado!' : (v > 0 ? 'Lado derecho más alto' : 'Lado izquierdo más alto'));
    } else {
      const ok = Math.abs(lz) < 0.5;
      cur.x = Math.asin(clamp(lx, -1, 1)) / RAD;
      cur.z = Math.asin(clamp(lz, -1, 1)) / RAD;
      const vx = cur.x - offs.x, vz = cur.z - offs.z;
      let dx = clamp(vx / RANGE, -1, 1), dy = clamp(vz / RANGE, -1, 1);
      const m = Math.hypot(dx, dy); if (m > 1) { dx /= m; dy /= m; }
      const R = (disk.clientWidth - diskB.offsetWidth) / 2;
      diskB.style.transform = ok ? `translate3d(${(dx * R).toFixed(1)}px,${(-dy * R).toFixed(1)}px,0)` : 'translate3d(0,0,0)';
      setText(deg, ok ? `${Math.hypot(vx, vz).toFixed(1)}°` : '—');
      setText(deg2, ok ? `Lados ${Math.abs(vx).toFixed(1)}° · Frente/atrás ${Math.abs(vz).toFixed(1)}°` : '');
      level = ok && Math.abs(vx) < LEVEL && Math.abs(vz) < LEVEL;
      if (!ok) setText(msg, 'Recarga la espalda del cel contra la pared');
      else if (level) setText(msg, '¡Plomeado!');
      else {
        const p = [];
        if (Math.abs(vx) >= LEVEL) p.push(vx > 0 ? 'a la izquierda' : 'a la derecha');
        if (Math.abs(vz) >= LEVEL) p.push(vz > 0 ? 'hacia atrás' : 'hacia adelante');
        setText(msg, 'Se inclina ' + p.join(' y '));
      }
    }
    inst.classList.toggle('is-level', level);
    if (level && !wasLevel && navigator.vibrate) navigator.vibrate(20);
    wasLevel = level;
  }

  function setMode(m) {
    mode = m; wasLevel = false;
    modeBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.modeBtn === m)));
    gH.hidden = m !== 'h'; gV.hidden = m !== 'v';
    setText(modeLbl, m === 'h' ? 'Horizontal' : 'Vertical');
    setText(tip, TIPS[m]);
    if (up) render();
  }
  modeBtns.forEach((b) => b.addEventListener('click', () => setMode(b.dataset.modeBtn)));

  const save = () => { try { localStorage.setItem('nivel-offs', JSON.stringify(offs)); } catch (e) {} };
  cal.addEventListener('click', () => {
    if (!got) return;
    if (mode === 'h') offs.h = cur.h; else { offs.x = cur.x; offs.z = cur.z; }
    save(); render();
  });
  reset.addEventListener('click', () => { offs = { h: 0, x: 0, z: 0 }; save(); if (up) render(); });

  async function begin() {
    setText(msg, 'Buscando el sensor…');
    try {
      const D = window.DeviceOrientationEvent;
      if (D && typeof D.requestPermission === 'function') { // iPhone: pide permiso al tocar el botón
        const r = await D.requestPermission();
        if (r !== 'granted') { setText(msg, 'Sin permiso de movimiento. Cierra la pestaña, ábrela otra vez y toca «Permitir».'); return; }
      }
      window.addEventListener('deviceorientation', onOrient, true);
      setTimeout(() => {
        if (!got) setText(msg, 'Este dispositivo no manda datos del sensor. Ábrela en Safari o Chrome desde tu celular.');
      }, 2000);
    } catch (err) {
      setText(msg, 'No se pudo activar el sensor. Ábrela en Safari o Chrome desde tu celular.');
    }
  }
  start.addEventListener('click', begin);
  addEventListener('resize', () => { if (up) render(); });
  setMode('h');
})();
