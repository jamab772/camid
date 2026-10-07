// Todos los textos, precios e imágenes de la landing están aquí.
// Para cambiar algo de la página, edita este archivo.

export const IMAGES = {
  logo: '/images/logo.webp',
  hero: '/images/producto-1.webp',
  problem: '/images/producto-2.webp',
  tech1: '/images/producto-3.webp',
  tech2: '/images/producto-4.webp',
  sizes: '/images/producto-5.webp',
  lifestyle: '/images/producto-6.webp',
};

export const PACKS = [
  { id: '1', title: '1 Par', subtitle: 'La opción básica', price: 24.95 },
  { id: '2', title: '2 Pares', subtitle: 'Uno para cada zapato', price: 35.95, save: 13.95, popular: true },
  { id: '3', title: '3 Pares', subtitle: 'Pack familiar · cada par adicional, solo 10 €', price: 45.95, save: 28.9 },
];

export const PAINS = ['Fascitis plantar', 'Espolones', 'Piernas cansadas'];

export const FEATURES = [
  { title: 'Como caminar sobre nubes', desc: 'Su material viscoelástico amortigua los impactos de cada paso.' },
  { title: 'Frescas y transpirables', desc: 'Tejido microperforado que mantiene tus pies secos incluso en los días más calurosos.' },
  { title: 'Protección total', desc: 'Alivio para la fascitis plantar y los dolores de talón.' },
  { title: 'Alineación perfecta', desc: 'Ayuda a corregir tu postura para evitar dolores en la espalda baja.' },
];

export const COMPARISON = [
  'Tecnología de masaje 4D',
  'Absorción de impactos',
  'Puntos de masaje integrados',
  'Material transpirable',
  'Recortable a tu talla',
  'Alivio inmediato del dolor',
  'Protección total del pie',
  'Garantía de satisfacción 15 días',
];

// TODO: sustituir por reseñas REALES de tus clientes antes de lanzar anuncios.
// Publicar reseñas o cifras inventadas está prohibido en la UE.
export const RATING = { score: '4,8', count: '2.347' };
export const REVIEWS = [
  {
    name: 'Carmen M.',
    city: 'Sevilla',
    text: 'Soy camarera y me pasaba los veranos con dolor de pies. Llevo 2 semanas usando estas plantillas y el cambio es brutal. El envío fue rápido.',
  },
  {
    name: 'Antonio R.',
    city: 'Málaga',
    text: 'Tenía miedo de pedirlas por internet, pero como se paga al recibirlo, me animé. Se recortan facilísimo y mis rodillas lo agradecen un montón.',
  },
  {
    name: 'Jorge L.',
    city: 'Madrid',
    text: 'Trabajo 10 horas de pie en un almacén. Con estas plantillas llego a casa sin ese dolor agudo del talón. Las he recomendado a todos mis compañeros.',
  },
];

export const FAQ = [
  {
    q: '¿Cómo pago mi pedido?',
    a: 'Pagas en efectivo al repartidor cuando recibes el paquete en casa. No necesitas tarjeta.',
  },
  {
    q: '¿Cuánto tarda el envío?',
    a: 'Entre 24 y 48 horas laborables en la península. El envío es gratuito.',
  },
  {
    q: '¿Sirven para cualquier zapato?',
    a: 'Sí. Son de talla universal y se recortan siguiendo las líneas guía traseras para adaptarlas a deportivas, calzado de trabajo o zapatos de vestir.',
  },
  {
    q: '¿Puedo devolverlas si no me convencen?',
    a: 'Claro. Tienes 15 días de garantía de satisfacción: si no notas el alivio, te devolvemos el dinero.',
  },
  {
    q: '¿Son lavables?',
    a: 'Sí, puedes lavarlas a mano con agua y jabón neutro. Se secan rápidamente gracias a su tejido microperforado.',
  },
];
