// ÚNICO lugar para cambiar teléfono, dominio y zonas. Después corre: node build.mjs
export const site = {
  name: 'Eduardo Sandoval',
  // PENDIENTE: poner el teléfono real de 10 dígitos (sin +52, sin espacios). Sirve para llamada y WhatsApp.
  phone: '3300000000',
  // PENDIENTE: cambiar por el dominio real cuando lo tengan (o la URL de Render).
  url: 'https://eduardo-sandoval.onrender.com',
  city: 'Guadalajara',
  region: 'Jalisco',
  areas: ['Guadalajara', 'Zapopan', 'Tlaquepaque', 'Tonalá', 'Tlajomulco', 'El Salto'],
  today: '2026-11-20',
};

export const phoneDisplay = (p = site.phone) => `${p.slice(0, 2)} ${p.slice(2, 6)} ${p.slice(6)}`;
export const telHref = () => `tel:+52${site.phone}`;
export const waHref = (msg) =>
  `https://wa.me/52${site.phone}?text=${encodeURIComponent(msg)}`;
