// Todos los textos, precios e imágenes de la landing están aquí.
// Para cambiar algo de la página, edita este archivo.

export const IMAGES = {
  logo: '/images/logo.webp',
  hero: '/images/producto-2.webp', // problemas que soluciona
  cushion: '/images/producto-7.webp', // amortiguación (2ª imagen, se ve mientras carga el vídeo)
  cushionVideo: '/images/semelles.mp4', // animación de amortiguación (convertida del GIF, mucho más ligera)
  cushionWebm: '/images/semelles.webm', // misma animación en WebM (Chrome, Android)
  cushionGif: '/images/semelles.gif', // GIF original, por si el navegador no reproduce vídeo
  clouds: '/images/producto-1.webp', // camina sobre las nubes
  arch: '/images/producto-3.webp', // tecnología de arco
  massage: '/images/producto-4.webp', // puntos de masaje
  cut: '/images/producto-5.webp', // recortable
  box: '/images/producto-6.webp', // caja y plantillas
};

export const PACKS = [
  { title: '1 Par', subtitle: 'La opción básica', price: 24.95 },
  { title: '2 Pares', subtitle: 'Uno para cada zapato', price: 35.95, save: 13.95, popular: true },
  { title: '3 Pares', subtitle: 'Pack familiar', price: 45.95, save: 28.9 },
];

export const PAINS = ['Fascitis plantar', 'Espolones', 'Metatarsalgia', 'Dolor de talón', 'Piernas cansadas'];

export const FEATURES = [
  { title: 'Como caminar sobre nubes', desc: 'Su espuma viscoelástica amortigua los impactos de cada paso y recupera su forma al instante.' },
  { title: 'Frescas y transpirables', desc: 'Tejido de bambú microperforado que mantiene tus pies secos incluso en los días más calurosos.' },
  { title: 'Protección total', desc: 'Alivio para la fascitis plantar, los espolones y los dolores de talón.' },
  { title: 'Alineación perfecta', desc: 'Ayuda a corregir tu postura para evitar dolores en rodillas y espalda baja.' },
];

export const ARCH_POINTS = [
  { title: 'Soporte del arco', desc: 'Sujeta el arco plantar y reparte el peso del cuerpo en toda la planta.' },
  { title: 'Talón amortiguado', desc: 'La zona del talón absorbe el golpe de cada pisada.' },
  { title: 'Antepié flexible', desc: 'Acompaña el movimiento natural del pie al caminar.' },
];

export const MASSAGE_POINTS = [
  'Puntos de masaje integrados en las zonas de mayor presión',
  'Estimulan la planta del pie con cada paso, como un masaje continuo',
  'Ayudan a reducir la sensación de cansancio al final del día',
];

export const CUT_STEPS = [
  { n: '1', title: 'Coloca tu plantilla vieja', desc: 'O el pie, encima de la plantilla Nubepaso.' },
  { n: '2', title: 'Sigue las líneas guía', desc: 'Marcadas con tu talla en la parte trasera.' },
  { n: '3', title: 'Recorta y listo', desc: 'Con unas tijeras normales, en segundos.' },
];

export const SPECS = [
  ['Material', 'Espuma viscoelástica + tejido de bambú'],
  ['Talla', 'Universal y recortable (35 a 46)'],
  ['Transpirable', 'Sí, superficie microperforada'],
  ['Lavable', 'A mano, con agua y jabón neutro'],
  ['Uso', 'Deportivas, calzado de trabajo y de vestir'],
  ['Contenido', 'Un par de plantillas por pack'],
];

export const COMPARISON = [
  'Tecnología de masaje 4D',
  'Absorción de impactos',
  'Puntos de masaje integrados',
  'Tejido de bambú transpirable',
  'Recortable a tu talla',
  'Soporte del arco plantar',
  'Garantía de satisfacción 15 días',
];

// TODO: sustituir por reseñas REALES de tus clientes antes de lanzar anuncios.
// Publicar reseñas o cifras inventadas está prohibido en la UE.
export const REVIEWS = [
  {
    name: 'Carmen M.',
    city: 'Sevilla',
    stars: 5,
    text: 'Soy camarera y me pasaba los veranos con dolor de pies. Llevo 2 semanas usando estas plantillas y el cambio es brutal. El envío fue rápido.',
  },
  {
    name: 'Antonio R.',
    city: 'Málaga',
    stars: 5,
    text: 'Tenía miedo de pedirlas por internet, pero como se paga al recibirlo, me animé. Se recortan facilísimo y mis rodillas lo agradecen un montón.',
  },
  {
    name: 'Jorge L.',
    city: 'Madrid',
    stars: 5,
    text: 'Trabajo 10 horas de pie en un almacén. Con estas plantillas llego a casa sin ese dolor agudo del talón. Las he recomendado a todos mis compañeros.',
  },
];
