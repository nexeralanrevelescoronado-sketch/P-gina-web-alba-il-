// Generador del sitio: node build.mjs  ->  carpeta public/
import { mkdirSync, writeFileSync, cpSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { site, phoneDisplay, telHref, waHref } from './site.config.mjs';
import { posts } from './content/posts.mjs';

const OUT = 'public';
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
cpSync('assets', OUT, { recursive: true });
if (site.phone === '3300000000') console.warn('\n⚠️  Teléfono de ejemplo: cámbialo en site.config.mjs antes de publicar.\n');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/* ---------- Iconos ---------- */
const ICON_WA = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M9 10c.5 2.2 2.8 4.5 5 5l1.4-1.4-2-1-.9.8c-.7-.3-1.5-1.1-1.8-1.8l.8-.9-1-2Z"/></svg>';
const ICON_TEL = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';

const wa = (msg, label = 'WhatsApp') => `<a class="btn btn--wa" href="${waHref(msg)}" target="_blank" rel="noopener">${ICON_WA}${label}</a>`;
const tel = (label = 'Llamar') => `<a class="btn btn--tel" href="${telHref()}">${ICON_TEL}${label}</a>`;
const MSG = 'Hola Eduardo, vi tu página y quiero pedir una cotización.';

/* ---------- Servicios ---------- */
const services = [
  {
    slug: 'albanileria', nombre: 'Albañilería', num: '01',
    h1: 'Albañil en Guadalajara',
    title: 'Albañil en Guadalajara y Zapopan | Eduardo Sandoval',
    desc: 'Albañilería en Guadalajara y zona metropolitana: muros, firmes, losas, aplanados, pisos y reparaciones. Escríbele a Eduardo Sandoval por WhatsApp.',
    corto: 'Muros, firmes, losas, aplanados, pisos y reparaciones con trabajo derecho y limpio.',
    intro: 'Trabajos de albañilería para casas, locales y negocios: desde un resane hasta levantar un muro o colar un firme. Trabajo a plomo y a nivel, con materiales bien dosificados y la obra limpia al terminar.',
    trabajos: [
      ['Muros y bardas', 'Levantado de muros, bardas y divisiones con block o tabique, a plomo y con castillos.'],
      ['Firmes y pisos', 'Firmes de concreto, nivelación y preparación de base para loseta, azulejo o piso.'],
      ['Losas y castillos', 'Colado de losas, trabes y castillos con cimbra y armado bien hechos.'],
      ['Aplanados y yeso', 'Repellados, aplanados finos y yeso para dejar muros listos para pintar.'],
      ['Azulejo y loseta', 'Colocación de pisos y recubrimientos en baños, cocinas, patios y terrazas.'],
      ['Reparaciones y resanes', 'Grietas, humedad, filtraciones, huecos y detalles después de instalaciones.'],
    ],
    faq: [
      ['¿Hacen trabajos pequeños o solo obras grandes?', 'También trabajos pequeños: un muro, un resane, un piso o una reparación. Mándame fotos y medidas por WhatsApp y te digo cómo se puede hacer.'],
      ['¿Cómo se cotiza un trabajo de albañilería?', 'Depende de las medidas, los materiales y el estado de la obra. Con fotos y medidas puedo darte una idea inicial; si hace falta, hacemos una visita para confirmar y darte el presupuesto.'],
      ['¿Quién compra los materiales?', 'Se acuerda antes de empezar: puedo cotizar con materiales incluidos o solo mano de obra, según prefieras.'],
      ['¿Atienden Zapopan, Tlaquepaque y Tonalá?', 'Sí, atiendo Guadalajara y su zona metropolitana. Escríbeme tu colonia para confirmar.'],
    ],
    msg: 'Hola Eduardo, necesito una cotización de albañilería.',
    otro: ['construccion', 'plomeria'],
  },
  {
    slug: 'construccion', nombre: 'Construcción', num: '02',
    h1: 'Constructor y remodelaciones',
    title: 'Constructor en Guadalajara: ampliaciones y remodelación | Eduardo Sandoval',
    desc: 'Construcción, ampliaciones y remodelaciones en Guadalajara y Zapopan: cuartos, losas, bardas, baños y cocinas. Presupuesto claro por WhatsApp.',
    corto: 'Ampliaciones, cuartos, losas, remodelaciones de baños y cocinas, de obra negra a acabados.',
    intro: 'Desde una ampliación o un cuarto nuevo hasta remodelar un baño o una cocina completos. Platicamos el alcance, definimos etapas y fechas, y te mantengo al tanto del avance durante la obra.',
    trabajos: [
      ['Ampliaciones y cuartos', 'Recámaras, cuartos de servicio, segundos niveles y áreas nuevas sobre lo ya construido.'],
      ['Remodelación de baños', 'Cambio de piso, azulejo, muebles e instalaciones hidráulicas y sanitarias.'],
      ['Remodelación de cocinas', 'Reacomodo de instalaciones, recubrimientos, pisos y detalles de obra.'],
      ['Obra negra y gris', 'Cimentación, muros, losas, aplanados y firmes para dejar la obra lista para acabados.'],
      ['Bardas y fachadas', 'Bardas perimetrales, fachadas, entradas y detalles exteriores.'],
      ['Locales y negocios', 'Adecuaciones de espacios comerciales: divisiones, pisos, instalaciones y acabados.'],
    ],
    faq: [
      ['¿Cómo empiezo una ampliación o remodelación?', 'Mándame fotos, medidas aproximadas y qué quieres lograr. Platicamos el alcance y coordinamos una visita para revisar el lugar.'],
      ['¿El presupuesto incluye materiales?', 'Se define desde el inicio: puede incluir materiales y mano de obra, o solo mano de obra. Queda claro por escrito (o por mensaje) antes de empezar.'],
      ['¿Trabajan por etapas?', 'Sí. Normalmente se divide en obra negra, obra gris y acabados, con avances y pagos acordados por etapa.'],
      ['¿Puedo ver avances durante la obra?', 'Sí, te comparto fotos del avance por WhatsApp y platicamos cualquier cambio antes de hacerlo.'],
    ],
    msg: 'Hola Eduardo, quiero cotizar una construcción o remodelación.',
    otro: ['albanileria', 'plomeria'],
  },
  {
    slug: 'plomeria', nombre: 'Plomería', num: '03',
    h1: 'Plomero fontanero',
    title: 'Plomero en Guadalajara: fugas, drenaje y boiler | Eduardo Sandoval',
    desc: 'Plomero fontanero en Guadalajara y zona metropolitana: reparación de fugas, destape de drenajes, WC, regaderas, boiler y tinacos. Escríbele por WhatsApp.',
    corto: 'Fugas, drenajes tapados, WC, regaderas, boiler, tinacos e instalaciones nuevas.',
    intro: 'Plomería para casas y negocios: encontrar y reparar fugas, destapar drenajes e instalar o cambiar muebles de baño, boiler y tinacos. Se busca la causa del problema para que no regrese.',
    trabajos: [
      ['Fugas de agua', 'Localización y reparación de fugas en tuberías, llaves, mangueras y conexiones.'],
      ['Drenajes tapados', 'Destape de WC, coladeras, fregaderos y líneas de drenaje.'],
      ['WC, lavabos y regaderas', 'Instalación, cambio y reparación de muebles de baño y grifería.'],
      ['Boiler y calentadores', 'Instalación y cambio de boiler o calentador, conexiones y llaves de paso.'],
      ['Tinacos y cisternas', 'Instalación, conexión, flotadores y mantenimiento de tinacos y cisternas.'],
      ['Instalaciones nuevas', 'Tubería nueva en baños, cocinas, patios y ampliaciones (PVC, CPVC y cobre).'],
    ],
    faq: [
      ['Tengo una fuga, ¿qué hago mientras llegas?', 'Cierra la llave de paso general, seca la zona y mándame fotos o video por WhatsApp. No rompas muros ni pisos por tu cuenta.'],
      ['¿Destapan drenajes?', 'Sí, drenajes de WC, coladeras, fregaderos y líneas generales. Si es recurrente, reviso la causa para evitar que se vuelva a tapar.'],
      ['¿Instalan boiler o calentador?', 'Sí. Cuéntame qué equipo tienes o quieres instalar y te digo cómo se haría la conexión.'],
      ['¿Atienden urgencias?', 'Escríbeme por WhatsApp con tu colonia y qué pasó; te respondo para ver la disponibilidad.'],
    ],
    msg: 'Hola Eduardo, necesito un plomero.',
    otro: ['albanileria', 'construccion'],
  },
];
const svc = Object.fromEntries(services.map((s) => [s.slug, s]));

/* ---------- Layout ---------- */
const NAV = [
  ['/', 'Inicio'], ['/albanileria/', 'Albañilería'], ['/construccion/', 'Construcción'],
  ['/plomeria/', 'Plomería'], ['/nivel/', 'Nivel'], ['/blog/', 'Blog'], ['#contacto', 'Contacto'],
];

const logoMark = `<svg class="logo__mark" viewBox="0 0 48 48" aria-hidden="true"><rect width="48" height="48" rx="10" fill="#1c1d1f"/><text x="24" y="25" text-anchor="middle" font-family="Anton,Impact,sans-serif" font-size="21" fill="#f3f3f1">ES</text><rect x="6" y="30" width="16" height="5" fill="#a8442a"/><rect x="24" y="30" width="18" height="5" fill="#a8442a"/><rect x="6" y="37" width="7" height="5" fill="#a8442a"/><rect x="15" y="37" width="16" height="5" fill="#a8442a"/><rect x="33" y="37" width="9" height="5" fill="#a8442a"/></svg>`;
const logo = (href = '/') => `<a class="logo" href="${href}" aria-label="Eduardo Sandoval, inicio">${logoMark}<span class="logo__txt"><b>Eduardo Sandoval</b><small>Albañilería · Construcción · Plomería</small></span></a>`;

const businessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': ['GeneralContractor', 'Plumber'],
  '@id': `${site.url}/#negocio`,
  name: 'Eduardo Sandoval — Albañilería, Construcción y Plomería',
  url: site.url,
  telephone: `+52${site.phone}`,
  areaServed: site.areas.map((a) => ({ '@type': 'City', name: a })),
  address: { '@type': 'PostalAddress', addressLocality: site.city, addressRegion: site.region, addressCountry: 'MX' },
  knowsAbout: ['Albañilería', 'Construcción', 'Remodelación', 'Plomería', 'Reparación de fugas', 'Destape de drenajes'],
});
const faqSchema = (faq) => ({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
const crumbSchema = (items) => ({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: site.url + path })) });

function layout({ path, title, desc, body, schema = [], current = '', type = 'website', noindex = false, scripts = [] }) {
  const nav = NAV.map(([href, label]) => `<a href="${href}"${href === '/' ? ' class="nav__home"' : ''}${href === current ? ' aria-current="page"' : ''}>${label}</a>`).join('');
  return `<!doctype html>
<html lang="es-MX">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
${noindex ? '<meta name="robots" content="noindex">' : '<meta name="robots" content="index,follow,max-image-preview:large">'}
<link rel="canonical" href="${site.url}${path}">
<meta name="theme-color" content="#1c1d1f">
<meta property="og:locale" content="es_MX">
<meta property="og:type" content="${type}">
<meta property="og:site_name" content="Eduardo Sandoval">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${site.url}${path}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Anton&family=Barlow:wght@400;500;600&family=Barlow+Condensed:wght@600;700&display=swap">
<link rel="stylesheet" href="/css/styles.css">
<script>document.documentElement.classList.add('js')</script>
${schema.map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n')}
</head>
<body>
<a class="skip" href="#main">Saltar al contenido</a>
<header class="header"><div class="header__in">
  ${logo()}
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="nav" aria-label="Abrir menú"><i></i><i></i></button>
  <nav class="nav cemento-oscuro" id="nav" aria-label="Principal">${nav}</nav>
  <div class="header__cta btn-row">${wa(MSG, phoneDisplay())}</div>
</div></header>
<main id="main">
${body}
</main>
<footer class="footer"><div class="wrap">
  <div>${logo()}<p style="margin-top:1rem;max-width:28rem">Albañilería, construcción y plomería en ${site.city} y zona metropolitana.</p></div>
  <div><h4>Servicios</h4><ul>${services.map((s) => `<li><a href="/${s.slug}/">${s.nombre}</a></li>`).join('')}<li><a href="/nivel/">Nivel de burbuja</a></li><li><a href="/blog/">Blog</a></li></ul></div>
  <div><h4>Contacto</h4><ul><li><a href="${telHref()}">${phoneDisplay()}</a></li><li><a href="${waHref(MSG)}" target="_blank" rel="noopener">WhatsApp</a></li><li>${site.areas.join(' · ')}</li></ul></div>
  <p class="copy">© <span id="year">2026</span> Eduardo Sandoval. Todos los derechos reservados.</p>
</div></footer>
<div class="dock" role="group" aria-label="Contacto rápido">${wa(MSG)}${tel()}</div>
<script src="/js/main.js" defer></script>
${scripts.map((s) => `<script src="${s}" defer></script>`).join('')}
</body>
</html>`;
}

function write(path, html) {
  const file = path.endsWith('.html') ? join(OUT, path) : join(OUT, path, 'index.html');
  mkdirSync(join(file, '..'), { recursive: true });
  writeFileSync(file, html);
}

const cta = (msg = MSG, h = 'Pide tu cotización') => `
<section class="cta ladrillo" id="contacto"><div class="wrap">
  <p class="label reveal">Escríbeme o llámame</p>
  <h2 class="display reveal">${h}</h2>
  <p class="lede reveal">Mándame fotos y medidas por WhatsApp, cuéntame qué necesitas y te respondo con los siguientes pasos.</p>
  <a class="tel-big reveal" href="${telHref()}">${phoneDisplay()}</a>
  <div class="btn-row reveal">${wa(msg, 'Escribir por WhatsApp')}${tel('Llamar ahora')}</div>
</div></section>`;

const faqHtml = (faq) => `<div class="faq stagger">${faq.map(([q, a]) => `<details class="reveal"><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div>`;
const postCard = (p) => `<a class="card post-card reveal" href="/blog/${p.slug}/"><span class="meta">${p.category} · ${p.minutes} min</span><h3>${p.title}</h3><p>${p.desc}</p><span class="link-arrow">Leer artículo <span aria-hidden="true">→</span></span></a>`;

/* ---------- Inicio ---------- */
const homeFaq = [
  ['¿En qué zonas trabajas?', `Atiendo ${site.areas.join(', ')} y alrededores. Escríbeme tu colonia para confirmar.`],
  ['¿Cómo pido un presupuesto?', 'Por WhatsApp: mándame fotos, medidas aproximadas y qué necesitas. Con eso te doy una idea inicial y, si hace falta, coordinamos una visita.'],
  ['¿Hacen trabajos pequeños?', 'Sí. Desde reparar una fuga o hacer un resane hasta ampliaciones y remodelaciones completas.'],
  ['¿Puedo contratar albañilería y plomería juntas?', 'Sí. En remodelaciones de baños y cocinas se coordina todo en una sola obra para evitar rehacer trabajos.'],
];

const chapters = [
  { cls: 'ladrillo', s: svc.albanileria },
  { cls: 'cemento-oscuro', s: svc.construccion },
  { cls: 'cemento-claro', s: svc.plomeria },
];

write('/', layout({
  path: '/', current: '/',
  title: 'Albañil, constructor y plomero en Guadalajara | Eduardo Sandoval',
  desc: 'Eduardo Sandoval: albañilería, construcción, remodelaciones y plomería en Guadalajara, Zapopan, Tlaquepaque y Tonalá. Pide tu cotización por WhatsApp.',
  schema: [businessSchema(), faqSchema(homeFaq)],
  body: `
<section class="hero cemento"><div class="wrap">
  <p class="label">Eduardo Sandoval · ${site.city} y zona metropolitana</p>
  <h1 class="display" aria-label="Albañil, constructor y plomero">
    <span class="h-line" style="--i:0"><span>Albañil.</span></span>
    <span class="h-line" style="--i:1"><span>Constructor.</span></span>
    <span class="h-line" style="--i:2"><span>Plomero.</span></span>
  </h1>
  <p class="lede">Muros, losas, remodelaciones y reparaciones de plomería con trabajo limpio y presupuesto claro. Cuéntame qué necesitas y te respondo.</p>
  <div class="btn-row">${wa(MSG, 'Cotizar por WhatsApp')}${tel('Llamar')}</div>
  <ul class="chips"><li>Trabajo limpio</li><li>Presupuesto claro</li><li>Respuesta por WhatsApp</li></ul>
  <div class="nivel"><span class="nivel__tubo" aria-hidden="true"><i class="nivel__burbuja"></i></span><a class="link-arrow nivel__link" href="/nivel/">Prueba el nivel en tu celular <span aria-hidden="true">→</span></a></div>
</div></section>

<div class="stack">
${chapters.map(({ cls, s }) => `
<section class="cap ${cls}"><div class="wrap">
  <p class="cap__n">${s.num} / 03</p>
  <h2 class="display cap__w reveal">${s.nombre}</h2>
  <p class="lede reveal">${s.corto}</p>
  <ul class="chips reveal">${s.trabajos.slice(0, 4).map(([t]) => `<li>${t}</li>`).join('')}</ul>
  <a class="link-arrow reveal" href="/${s.slug}/">Ver trabajos de ${s.nombre.toLowerCase()} <span aria-hidden="true">→</span></a>
</div></section>`).join('')}
</div>

<section class="sec cemento"><div class="wrap">
  <div class="sec-head"><p class="label">Cómo trabajo</p><h2 class="display">Claro desde el primer mensaje</h2></div>
  <ol class="steps stagger">
    <li class="reveal"><h3>Me cuentas</h3><p>Fotos, medidas y qué quieres lograr, por WhatsApp.</p></li>
    <li class="reveal"><h3>Se revisa y se cotiza</h3><p>Idea inicial y, si hace falta, visita para confirmar el alcance.</p></li>
    <li class="reveal"><h3>Se acuerda y se trabaja</h3><p>Fechas, materiales y pagos claros. Obra limpia y con avances.</p></li>
    <li class="reveal"><h3>Entrega</h3><p>Revisamos juntos el resultado y te dejo recomendaciones de cuidado.</p></li>
  </ol>
</div></section>

<section class="sec cemento-claro"><div class="wrap">
  <div class="sec-head"><p class="label">Zonas</p><h2 class="display">Trabajo en tu zona</h2></div>
  <ul class="zonas stagger">${site.areas.map((a) => `<li class="reveal">${a}</li>`).join('')}</ul>
</div></section>

<section class="sec cemento"><div class="wrap">
  <div class="sec-head"><p class="label">Blog</p><h2 class="display">Consejos de obra y plomería</h2></div>
  <div class="grid grid--3 stagger">${posts.slice(0, 3).map(postCard).join('')}</div>
</div></section>

<section class="sec cemento-claro"><div class="wrap">
  <div class="sec-head"><p class="label">Preguntas frecuentes</p><h2 class="display">Lo que más preguntan</h2></div>
  ${faqHtml(homeFaq)}
</div></section>

${cta()}`,
}));

/* ---------- Subpáginas ---------- */
for (const s of services) {
  const crumbs = [['Inicio', '/'], [s.nombre, `/${s.slug}/`]];
  write(`/${s.slug}/`, layout({
    path: `/${s.slug}/`, current: `/${s.slug}/`, title: s.title, desc: s.desc,
    schema: [
      businessSchema(),
      { '@context': 'https://schema.org', '@type': 'Service', name: s.nombre, serviceType: s.nombre, provider: { '@id': `${site.url}/#negocio` }, areaServed: site.areas.map((a) => ({ '@type': 'City', name: a })), description: s.desc, url: `${site.url}/${s.slug}/` },
      faqSchema(s.faq), crumbSchema(crumbs),
    ],
    body: `
<section class="sub-hero ladrillo"><div class="wrap">
  <nav class="crumbs" aria-label="Migas de pan"><a href="/">Inicio</a><span>/</span><span>${s.nombre}</span></nav>
  <h1 class="display"><span class="h-line" style="--i:0"><span>${s.h1}</span></span></h1>
  <div class="panel"><p class="lede">${s.intro}</p></div>
  <div class="btn-row">${wa(s.msg, 'Cotizar por WhatsApp')}${tel('Llamar')}</div>
</div></section>

<section class="sec cemento"><div class="wrap">
  <div class="sec-head"><p class="label">Qué hago</p><h2 class="display">Trabajos de ${s.nombre.toLowerCase()}</h2></div>
  <div class="grid grid--3 stagger">${s.trabajos.map(([t, d], i) => `<div class="card reveal"><span class="num">${String(i + 1).padStart(2, '0')}</span><h3>${t}</h3><p>${d}</p></div>`).join('')}</div>
</div></section>

<section class="sec cemento-claro"><div class="wrap">
  <div class="sec-head"><p class="label">Cómo trabajo</p><h2 class="display">Del mensaje a la entrega</h2></div>
  <ol class="steps stagger">
    <li class="reveal"><h3>Me escribes</h3><p>Fotos, medidas y una descripción breve por WhatsApp.</p></li>
    <li class="reveal"><h3>Cotización</h3><p>Idea inicial y visita si hace falta confirmar.</p></li>
    <li class="reveal"><h3>Trabajo</h3><p>Fechas y alcance claros, obra limpia y con avances.</p></li>
    <li class="reveal"><h3>Entrega</h3><p>Revisamos el resultado juntos.</p></li>
  </ol>
</div></section>

<section class="sec cemento"><div class="wrap">
  <div class="sec-head"><p class="label">Preguntas frecuentes</p><h2 class="display">Dudas de ${s.nombre.toLowerCase()}</h2></div>
  ${faqHtml(s.faq)}
  <div style="margin-top:2.2rem" class="sec-head"><p class="label">También te puede interesar</p>
    <div class="btn-row">${s.otro.map((o) => `<a class="btn btn--tel" href="/${o}/">${svc[o].nombre}</a>`).join('')}<a class="btn btn--tel" href="/blog/">Blog</a></div></div>
</div></section>

${cta(s.msg)}`,
  }));
}

/* ---------- Blog ---------- */
write('/blog/', layout({
  path: '/blog/', current: '/blog/',
  title: 'Blog de albañilería, construcción y plomería | Eduardo Sandoval',
  desc: 'Consejos prácticos para tu casa en Guadalajara: fugas de agua, humedad en muros, etapas de obra y más.',
  schema: [crumbSchema([['Inicio', '/'], ['Blog', '/blog/']])],
  body: `
<section class="sub-hero ladrillo"><div class="wrap">
  <nav class="crumbs" aria-label="Migas de pan"><a href="/">Inicio</a><span>/</span><span>Blog</span></nav>
  <h1 class="display"><span class="h-line" style="--i:0"><span>Blog de obra</span></span></h1>
  <div class="panel"><p class="lede">Consejos claros sobre construcción, albañilería y plomería para cuidar tu casa o tu negocio.</p></div>
</div></section>
<section class="sec cemento"><div class="wrap"><div class="grid grid--3 stagger">${posts.map(postCard).join('')}</div></div></section>
${cta()}`,
}));

for (const p of posts) {
  const s = svc[p.service];
  write(`/blog/${p.slug}/`, layout({
    path: `/blog/${p.slug}/`, current: '/blog/', type: 'article', title: `${p.title} | Eduardo Sandoval`, desc: p.desc,
    schema: [
      { '@context': 'https://schema.org', '@type': 'Article', headline: p.title, description: p.desc, datePublished: p.date, dateModified: p.date, inLanguage: 'es-MX', author: { '@type': 'Person', name: 'Eduardo Sandoval' }, publisher: { '@id': `${site.url}/#negocio` }, mainEntityOfPage: `${site.url}/blog/${p.slug}/` },
      crumbSchema([['Inicio', '/'], ['Blog', '/blog/'], [p.title, `/blog/${p.slug}/`]]),
    ],
    body: `
<article class="cemento">
  <div class="article">
    <nav class="crumbs" aria-label="Migas de pan"><a href="/">Inicio</a><span>/</span><a href="/blog/">Blog</a></nav>
    <p class="meta" style="margin-top:1rem">${p.category} · ${p.dateText} · ${p.minutes} min de lectura</p>
    <h1>${p.title}</h1>
    ${p.html}
    <p><a class="link-arrow" href="/${s.slug}/">Ver servicio de ${s.nombre.toLowerCase()} <span aria-hidden="true">→</span></a></p>
  </div>
</article>
${cta(`Hola Eduardo, leí tu artículo "${p.title}" y quiero una cotización.`)}`,
  }));
}

/* ---------- Nivel (sensor del celular) ---------- */
const nivelFaq = [
  ['¿Funciona en iPhone y en Android?', 'Sí. En iPhone, Safari te pide permiso para usar los sensores de movimiento: toca «Permitir». En Android funciona directo desde Chrome.'],
  ['¿Qué tan preciso es?', 'Sirve para el día a día: repisas, cuadros, muebles, pisos y marcos. Cada celular trae su propio sensor, por eso conviene calibrarlo sobre una superficie que ya sepas que está nivelada. Para trabajos de precisión en obra usa un nivel físico.'],
  ['¿Se puede usar con el cel acostado, de lado o parado?', 'Sí. El instrumento se gira solo para que lo leas derecho, aunque tengas activado el bloqueo de rotación de pantalla.'],
  ['¿Guarda o manda datos de mi celular?', 'No. Todo se calcula en tu teléfono; la página no guarda ni envía lo que mide el sensor.'],
  ['No me responde el sensor, ¿qué hago?', 'Abre la página directo en Safari o Chrome (no dentro de otra app) y permite el acceso a movimiento. Si lo negaste sin querer, cierra la pestaña, ábrela de nuevo y toca «Activar nivel».'],
];

write('/nivel/', layout({
  path: '/nivel/', current: '/nivel/', scripts: ['/js/nivel.js'],
  title: 'Nivel de burbuja en tu celular (gratis) | Eduardo Sandoval',
  desc: 'Nivel de burbuja gratis que usa el sensor de tu celular: horizontal para repisas y pisos, vertical para paredes y postes. Funciona en iPhone y Android.',
  schema: [
    { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Nivel de burbuja en el celular', url: `${site.url}/nivel/`, applicationCategory: 'UtilitiesApplication', operatingSystem: 'Any', inLanguage: 'es-MX', offers: { '@type': 'Offer', price: '0', priceCurrency: 'MXN' }, publisher: { '@id': `${site.url}/#negocio` } },
    faqSchema(nivelFaq), crumbSchema([['Inicio', '/'], ['Nivel', '/nivel/']]),
  ],
  body: `
<section class="sub-hero ladrillo"><div class="wrap">
  <nav class="crumbs" aria-label="Migas de pan"><a href="/">Inicio</a><span>/</span><span>Nivel</span></nav>
  <h1 class="display"><span class="h-line" style="--i:0"><span>Nivel en tu celular</span></span></h1>
  <div class="panel"><p class="lede">Un nivel de burbuja de verdad: usa el sensor de tu teléfono para revisar repisas, pisos, muros y postes. Gratis y sin instalar nada.</p></div>
</div></section>

<section class="sec cemento nivel-app"><div class="wrap">
  <div class="inst" id="inst">
    <div class="inst__panel cemento-oscuro" id="panel">
      <p class="label" id="modeLbl">Horizontal</p>
      <div class="gauge" id="gH"><div class="vial" id="vial"><i class="vial__b" id="vialB"></i></div></div>
      <div class="gauge" id="gV" hidden><div class="disk" id="disk"><i class="disk__b" id="diskB"></i></div></div>
      <p class="inst__deg" id="deg">0.0°</p>
      <p class="inst__deg2" id="deg2"></p>
      <p class="inst__msg" id="msg" role="status">Toca «Activar nivel» para empezar</p>
    </div>
  </div>
  <div class="ctrl">
    <div class="seg" role="group" aria-label="Modo del nivel">
      <button type="button" data-mode-btn="h" aria-pressed="true">Horizontal</button>
      <button type="button" data-mode-btn="v" aria-pressed="false">Vertical</button>
    </div>
    <button class="btn btn--wa" id="start" type="button">Activar nivel</button>
  </div>
  <p class="tip" id="tip"></p>
  <div class="ctrl">
    <button class="btn btn--tel" id="cal" type="button">Calibrar</button>
    <button class="btn btn--tel" id="reset" type="button">Restablecer</button>
  </div>
</div></section>

<section class="sec cemento-claro"><div class="wrap">
  <div class="sec-head"><p class="label">Cómo se usa</p><h2 class="display">Horizontal y vertical</h2></div>
  <div class="grid grid--3 stagger">
    <div class="card reveal"><span class="num">01</span><h3>Horizontal</h3><p>Para repisas, mesas, vigas y pisos. Pon el cel de canto, parado sobre su orilla, con la pantalla hacia ti. La burbuja se va al lado más alto.</p></div>
    <div class="card reveal"><span class="num">02</span><h3>Vertical</h3><p>Para paredes, postes y marcos de puerta. Recarga la espalda del cel contra la superficie. Te dice cuánto se inclina a los lados y hacia adelante o atrás.</p></div>
    <div class="card reveal"><span class="num">03</span><h3>Calibrar</h3><p>Pon el cel sobre una superficie que ya sepas que está a nivel y toca «Calibrar». Para comprobar, voltéalo 180°: debe marcar casi cero también.</p></div>
  </div>
</div></section>

<section class="sec cemento"><div class="wrap">
  <div class="sec-head"><p class="label">Preguntas frecuentes</p><h2 class="display">Dudas del nivel</h2></div>
  ${faqHtml(nivelFaq)}
</div></section>

${cta('Hola Eduardo, usé el nivel de tu página y quiero una cotización.')}`,
}));

/* ---------- 404, robots, sitemap ---------- */
write('/404.html', layout({
  path: '/404.html', noindex: true, title: 'Página no encontrada | Eduardo Sandoval', desc: 'Esta página no existe.',
  body: `<section class="sub-hero ladrillo"><div class="wrap"><h1 class="display"><span class="h-line"><span>404</span></span></h1><div class="panel"><p class="lede">Esa página no existe, pero la obra sigue en pie. Vuelve al inicio o escríbeme.</p></div><div class="btn-row"><a class="btn btn--wa" href="/">Ir al inicio</a>${tel()}</div></div></section>`,
}));

const urls = ['/', ...services.map((s) => `/${s.slug}/`), '/nivel/', '/blog/', ...posts.map((p) => `/blog/${p.slug}/`)];
writeFileSync(join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${site.url}${u}</loc><lastmod>${site.today}</lastmod></url>`).join('\n')}\n</urlset>\n`);
writeFileSync(join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);
console.log(`✓ ${urls.length} páginas en ${OUT}/`);
