/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, 
  Truck, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronDown, 
  Package, 
  ShieldQuestion,
  Wrench,
  Paintbrush
} from 'lucide-react';

const LOGO_URL = "https://i.postimg.cc/FsCzMRd5/logo-nbv.png";
const HERO_IMAGE = "https://i.postimg.cc/90RyyRcn/product-file.jpg";

const BENEFITS = [
  {
    title: "Versatilidad Total",
    desc: "Pinta paredes, techos, muebles y vallas con una facilidad asombrosa. Se adapta a cualquier superficie, incluso las más rugosas.",
    img: "https://i.postimg.cc/mkz77zTm/PT-4.jpg"
  },
  {
    title: "MÁXIMA PRECISIÓN",
    desc: "Su cabezal ajustable permite 3 modos de pulverización: horizontal, vertical y circular. Dile adiós a las gotas y los rodillazos.",
    img: "https://i.postimg.cc/6q2CC2BS/t-p-2.jpg"
  },
  {
    title: "PUERZA BRUTA 900W",
    desc: "Motor de alta resistencia para un flujo constante. No se detiene ante nada, garantizando un acabado profesional en tiempo récord.",
    img: "https://i.postimg.cc/nrjqqjnd/TP-5.jpg"
  },
  {
    title: "ACABADO PERFECTO",
    desc: "Cero marcas de brocha. Una sola pasada es suficiente para cubrir superficies difficiles con una capa uniforme de pintura.",
    img: "https://i.postimg.cc/5yY88Yf7/TP-7.jpg"
  },
  {
    title: "CALIDAD INDUSTRIAL",
    desc: "Construido para durar. Materiales robustos que soportan las jornadas más exigentes de bricolaje en casa.",
    img: "https://i.postimg.cc/wMyDDy94/TP5.jpg"
  }
];

const TESTIMONIALS = [
  {
    name: "Carlos M.",
    stars: 5,
    text: "Tenía miedo de que se taponara el conducto, pero es increíblemente fácil de lavar. Desmontas las piezas y listo. He pintado mi salón de 30m2 en media hora real. ¡Sin una gota en el suelo!"
  },
  {
    name: "Elena R.",
    stars: 5,
    text: "He pintado toda la fachada de mi casa de campo y el motor de 900W ni se ha inmutado. La potencia es constante y el resultado parece de profesional. El cable largo me dió mucha libertad."
  },
  {
    name: "Javier L.",
    stars: 5,
    text: "El pago a la entrega me dio mucha tranquilidad para pedirlo. Llegó en 48h y ya lo he usado para renovar unas sillas viejas. El acabado es infinitamente mejor que con spray de bote."
  },
  {
    name: "Marta G.",
    stars: 5,
    text: "Dudaba si serviría para pintura plástica al agua, pero funciona de maravilla si la diluyes un poco. Es muy intuitivo de usar, hasta para alguien que nunca ha cogido una pistola."
  },
  {
    name: "Roberto S.",
    stars: 5,
    text: "Relación calidad-precio inmejorable. He ahorrado litros de pintura comparado con el rodillo porque aprovecha cada gramo. Por 59€ es una inversión que se paga sola en el primer día."
  }
];

const FAQS = [
  {
    q: "¿Sirve para pintura plástica, al agua o al aceite?",
    a: "Sí, el Total Painter es compatible con pinturas plásticas, esmaltes al agua, barnices y lacas al aceite. Solo recomendamos diluir ligeramente la pintura según las instrucciones para un flujo óptimo."
  },
  {
    q: "¿Es difícil de limpiar después de usarlo?",
    a: "No, es totalmente desmontable en segundos. Todas las piezas que entran en contacto con la pintura se lavan bajo el grifo. Es mucho más rápido que limpiar brochas y rodillos."
  },
  {
    q: "¿Tiene cable o batería?",
    a: "Funciona con cable de alta resistencia. Hemos diseñado este modelo así para no perder potencia (900W reales) a mitad del trabajo, algo que suele pasar con los modelos de batería baratos."
  },
  {
    q: "¿Qué incluye el pack de 59€?",
    a: "Recibirás la pistola Total Painter Pro de 900W, el depósito de gran capacidad, viscosímetro para medir la densité y el manual completo en español. ¡Y el envío es GRATIS!"
  },
  {
    q: "¿Tiene garantía?",
    a: "Sí, todos nuestros equipos tienen 2 años de garantía oficial contra cualquier defecto de fabricación. Tu satisfacción es nuestra prioridad absoluta."
  }
];

const FAIcon = ({ isOpen }: { isOpen: boolean }) => (
  <motion.span 
    animate={{ rotate: isOpen ? 180 : 0 }}
    className="text-industrial-yellow"
  >
    <ChevronDown className="w-6 h-6" />
  </motion.span>
);

export default function App() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const scrollToCheckout = () => {
    document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen selection:bg-industrial-yellow selection:text-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-industrial-dark/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <img src={LOGO_URL} alt="Total Painter Logo" className="h-10 md:h-12 w-auto" referrerPolicy="no-referrer" />
          <button 
            onClick={scrollToCheckout}
            className="hidden md:flex items-center gap-2 bg-industrial-yellow text-black px-6 py-2.5 rounded-sm font-display font-black text-sm uppercase tracking-wider hover:bg-industrial-yellow/90 transition-all active:scale-95 shadow-[0_4px_0_0_#CCAA00]"
          >
            ¡COMPRAR AHORA!
          </button>
          <div className="md:hidden">
            <span className="text-industrial-yellow font-display font-black text-xl italic uppercase">59€</span>
          </div>
        </div>
      </header>

      {/* Ticker / Marquee Band */}
      <div className="bg-industrial-yellow text-black py-2 overflow-hidden border-b border-black/10 z-[60] relative mt-20">
        <div className="flex whitespace-nowrap animate-marquee font-display font-black text-xs uppercase tracking-widest">
          <span className="mx-4">ENVÍO 24-48 HORAS • PAGO AL RECIBIR • 15 DÍAS DE RETRACTACIÓN • ENVÍO GRATIS • </span>
          <span className="mx-4">ENVÍO 24-48 HORAS • PAGO AL RECIBIR • 15 DÍAS DE RETRACTACIÓN • ENVÍO GRATIS • </span>
          <span className="mx-4">ENVÍO 24-48 HORAS • PAGO AL RECIBIR • 15 DÍAS DE RETRACTACIÓN • ENVÍO GRATIS • </span>
          <span className="mx-4">ENVÍO 24-48 HORAS • PAGO AL RECIBIR • 15 DÍAS DE RETRACTACIÓN • ENVÍO GRATIS • </span>
        </div>
      </div>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-24 md:pt-24 md:pb-32 px-4">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="z-10"
            >
              <span className="bg-industrial-yellow text-black px-3 py-1 font-display font-black text-xs uppercase tracking-widest mb-6 inline-block">
                SOLUCIÓN PROFESIONAL
              </span>
              <h1 className="text-2xl md:text-7xl font-display font-black leading-[0.9] text-white uppercase mb-6 italic">
                ¿Harto de perder fines de semana enteros <span className="text-industrial-yellow">pintando a rodillo?</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-lg leading-relaxed">
                Termina un salón en solo 30 minutos. Sin marcas, sin gotas y con un acabado de revista. El pistoletazo de salida para tu nuevo hogar empieza aquí.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <button 
                  onClick={scrollToCheckout}
                  className="w-full sm:w-auto bg-industrial-yellow text-black px-10 py-5 rounded-sm font-display font-black text-xl uppercase tracking-wider hover:bg-industrial-yellow/90 transition-all shadow-[0_6px_0_0_#CCAA00] active:translate-y-1 active:shadow-none"
                >
                  ¡SÍ, LO QUIERO! (PAGA AL RECIBIR)
                </button>
                <div className="flex items-center gap-2 text-gray-400 font-display text-sm">
                  <Truck className="w-5 h-5 text-industrial-yellow" />
                  Envío Gratis 24/48h
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-industrial-yellow/20 blur-[120px] rounded-full" />
              <img 
                src={HERO_IMAGE} 
                alt="Total Painter Product" 
                className="relative z-10 w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform md:-rotate-3"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-10 -right-4 bg-industrial-dark p-6 border border-industrial-yellow/30 rounded-sm z-20 hidden md:block">
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-industrial-yellow text-industrial-yellow" />)}
                </div>
                <p className="font-display font-bold text-lg leading-tight uppercase italic">+12,000 Pintores<br/>Satisfechos</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-industrial-gray py-24 px-4 border-y border-white/5">
          <div className="max-w-7xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-6xl font-display font-black uppercase italic mb-4">
              ¿Por qué Total Painter es <span className="text-industrial-yellow">la única opción?</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              No es solo una herramienta, es el fin de los problemas de pintura. Tecnología de pulverización de aire constante para acabados impecables.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {BENEFITS.slice(0, 3).map((benefit, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group bg-industrial-dark border border-white/10 overflow-hidden hover:border-industrial-yellow/50 transition-colors"
                id={`benefit-${idx + 1}`}
              >
                <div className="aspect-square overflow-hidden bg-black/20">
                  <img 
                    src={benefit.img} 
                    alt={benefit.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    referrerPolicy="no-referrer" 
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-display font-black uppercase italic mb-3 text-industrial-yellow">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-8">
            {BENEFITS.slice(3).map((benefit, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: (idx + 3) * 0.1 }}
                viewport={{ once: true }}
                className="group bg-industrial-dark border border-white/10 overflow-hidden hover:border-industrial-yellow/50 transition-colors"
                id={`benefit-${idx + 4}`}
              >
                <div className="aspect-square overflow-hidden bg-black/20">
                  <img 
                    src={benefit.img} 
                    alt={benefit.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    referrerPolicy="no-referrer" 
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-display font-black uppercase italic mb-3 text-industrial-yellow">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-24 px-4 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
              <div>
                <h2 className="text-3xl md:text-5xl font-display font-black uppercase italic mb-2">
                  Lo que dicen nuestros <span className="text-industrial-yellow">expertos caseros</span>
                </h2>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-industrial-yellow text-industrial-yellow" />)}
                  </div>
                  <span className="font-bold">4.9/5 basado en +2,500 reseñas</span>
                </div>
              </div>
              <CheckCircle2 className="w-16 h-16 text-industrial-yellow opacity-20 hidden md:block" />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className={`p-8 bg-industrial-gray border border-white/10 shadow-xl ${idx >= 3 ? 'md:col-span-1.5' : ''}`}
                  id={`testimonial-${idx + 1}`}
                >
                  <div className="flex mb-4">
                    {[...Array(t.stars)].map((_, i) => <Star key={i} className="w-4 h-4 fill-industrial-yellow text-industrial-yellow" />)}
                  </div>
                  <p className="text-lg italic text-gray-300 mb-6 leading-relaxed">
                    "{t.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-industrial-yellow rounded-full flex items-center justify-center font-display font-black text-black">
                      {t.name[0]}
                    </div>
                    <div>
                      <h4 className="font-bold">{t.name}</h4>
                      <span className="text-xs text-industrial-yellow uppercase tracking-widest flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Cliente Verificado
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-industrial-gray/50 py-24 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <ShieldQuestion className="w-16 h-16 text-industrial-yellow mx-auto mb-6 opacity-80" />
              <h2 className="text-3xl md:text-5xl font-display font-black uppercase italic mb-4 text-center">
                Preguntas <span className="text-industrial-yellow">Frecuentes</span>
              </h2>
            </div>
            
            <div className="space-y-4">
              {FAQS.map((faq, idx) => (
                <div key={idx} className="border border-white/10 bg-industrial-dark rounded-sm overflow-hidden" id={`faq-item-${idx}`}>
                  <button 
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                  >
                    <span className="text-lg font-bold pr-8">{faq.q}</span>
                    <FAIcon isOpen={activeFaq === idx} />
                  </button>
                  <AnimatePresence>
                    {activeFaq === idx && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Checkout Section Form */}
        <section id="checkout" className="py-24 px-4 bg-industrial-dark relative">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16">
            
            {/* Promotion Info */}
            <div className="md:flex-1">
              <div className="bg-industrial-yellow text-black p-8 md:p-12 h-full flex flex-col justify-center">
                <h2 className="text-4xl md:text-6xl font-display font-black uppercase italic leading-[0.9] mb-8">
                  OFERTA EXCLUSIVA <br/> <span className="text-white opacity-80 line-through">100€</span>
                </h2>
                <div className="text-7xl md:text-9xl font-display font-black italic mb-8">
                  59€
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 font-bold text-lg">
                    <CheckCircle2 className="w-6 h-6" /> ENVÍO GRATIS A TODA ESPAÑA
                  </li>
                  <li className="flex items-center gap-3 font-bold text-lg">
                    <CheckCircle2 className="w-6 h-6" /> PAGO CONTRA REEMBOLSO (SEGURO)
                  </li>
                  <li className="flex items-center gap-3 font-bold text-lg">
                    <CheckCircle2 className="w-6 h-6" /> ENTREGA EN 24/48 HORAS
                  </li>
                  <li className="flex items-center gap-3 font-bold text-lg">
                    <CheckCircle2 className="w-6 h-6" /> GARANTÍA DE 2 AÑOS INCLUIDA
                  </li>
                </ul>
                <div className="flex items-center gap-4 pt-8 border-t border-black/10">
                  <Zap className="w-12 h-12 fill-black" />
                  <p className="font-display font-black text-xl uppercase italic">¡Solo quedan 14 unidades en stock!</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="md:flex-1">
              <div className="bg-industrial-gray p-8 md:p-12 border border-white/10 shadow-2xl">
                <h3 className="text-2xl md:text-3xl font-display font-black uppercase italic mb-8">
                  RELLENA TUS DATOS <br/><span className="text-industrial-yellow">PARA EL ENVÍO</span>
                </h3>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-xs uppercase tracking-widest font-black mb-2 text-gray-500">Nombre Completo</label>
                    <input 
                      type="text" 
                      placeholder="Ej: Juan Pérez"
                      className="w-full bg-industrial-dark border border-white/10 p-4 focus:border-industrial-yellow outline-none transition-colors text-white rounded-sm"
                      id="input-name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest font-black mb-2 text-gray-500">Teléfono Movil</label>
                    <input 
                      type="tel" 
                      placeholder="Ej: 600 000 000"
                      className="w-full bg-industrial-dark border border-white/10 p-4 focus:border-industrial-yellow outline-none transition-colors text-white rounded-sm"
                      id="input-tel"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest font-black mb-2 text-gray-500">Dirección de Entrega</label>
                    <input 
                      type="text" 
                      placeholder="Calle, número, piso..."
                      className="w-full bg-industrial-dark border border-white/10 p-4 focus:border-industrial-yellow outline-none transition-colors text-white rounded-sm"
                      id="input-address"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest font-black mb-2 text-gray-500">Ciudad / Provincia</label>
                    <input 
                      type="text" 
                      placeholder="Ej: Madrid"
                      className="w-full bg-industrial-dark border border-white/10 p-4 focus:border-industrial-yellow outline-none transition-colors text-white rounded-sm"
                      id="input-city"
                    />
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full bg-industrial-yellow text-black py-6 rounded-sm font-display font-black text-2xl uppercase tracking-wider hover:bg-industrial-yellow/90 transition-all shadow-[0_8px_0_0_#CCAA00] active:translate-y-1 active:shadow-none mt-4 flex items-center justify-center gap-3"
                    id="submit-cod"
                  >
                    ¡PÍDELO AHORA Y PAGA AL RECIBIR!
                  </button>

                  <div className="flex items-center gap-4 py-8">
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-gray-500 text-xs font-bold uppercase tracking-widest shrink-0">O paga de forma segura ahora</span>
                    <div className="flex-1 h-px bg-white/10" />
                  </div>

                  {/* PayPal Placeholder Section */}
                  {/* <PayPalIntegrationCode /> */}
                  <div className="space-y-4">
                    <button 
                      type="button"
                      className="w-full bg-[#ffc439] text-[#2c2e2f] font-bold py-4 rounded-sm flex items-center justify-center gap-3 hover:bg-[#f4bb33] transition-colors"
                      id="paypal-placeholder"
                    >
                      <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" alt="PayPal" className="h-6" referrerPolicy="no-referrer" />
                      Pagar con PayPal
                    </button>
                    <p className="text-center text-[10px] text-gray-500 uppercase tracking-widest">Pago 100% encriptado con seguridad SSL</p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-industrial-dark py-12 px-4 border-t border-white/5">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <img src={LOGO_URL} alt="Total Painter Logo" className="h-8 opacity-50 grayscale" referrerPolicy="no-referrer" />
            <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-gray-500">
              <a href="#" className="hover:text-industrial-yellow transition-colors">Privacidad</a>
              <a href="#" className="hover:text-industrial-yellow transition-colors">Términos</a>
              <a href="#" className="hover:text-industrial-yellow transition-colors">Soporte</a>
            </div>
            <p className="text-xs text-gray-600">© {new Date().getFullYear()} Total Painter SL. Todos los derechos reservados.</p>
          </div>
        </footer>
      </main>

      {/* Floating Sticky CTA for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 z-40 bg-gradient-to-t from-industrial-dark to-transparent">
        <button 
          onClick={scrollToCheckout}
          className="w-full bg-industrial-yellow text-black py-4 rounded-sm font-display font-black text-xl uppercase tracking-wider shadow-2xl"
          id="mobile-sticky-cta"
        >
          ¡COMPRAR POR 59€!
        </button>
      </div>

      <style>{`
        /* Minimalist scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #111111;
        }
        ::-webkit-scrollbar-thumb {
          background: #333333;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #FFCC00;
        }
      `}</style>
    </div>
  );
}
