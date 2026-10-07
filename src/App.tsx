import { useState, type ReactNode } from 'react';
import {
  ArrowRight,
  Banknote,
  Check,
  CheckCircle2,
  Headphones,
  Lock,
  MapPin,
  Minus,
  Plus,
  Scissors,
  ShieldCheck,
  Star,
  Stethoscope,
  Truck,
  X,
} from 'lucide-react';
import { COMPARISON, FAQ, FEATURES, IMAGES, PACKS, PAINS, RATING, REVIEWS } from './content';

const euro = (n: number) => n.toFixed(2).replace('.', ',') + ' €';

function Img({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        className={`flex aspect-square items-center justify-center bg-gradient-to-br from-sky/30 to-brand/20 p-4 text-center text-xs font-semibold text-navy ${className}`}
      >
        Imagen pendiente
        <br />
        {src.split('/').pop()}
      </div>
    );
  }
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={className} />;
}

function CtaButton({ children }: { children: ReactNode }) {
  return (
    <a
      href="#pedido"
      className="mx-auto flex w-full max-w-sm items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-sm font-extrabold uppercase tracking-wide text-white shadow-lg shadow-brand/30 transition hover:bg-navy"
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </a>
  );
}

function Title({ children }: { children: ReactNode }) {
  return <h2 className="text-center font-display text-2xl font-extrabold text-navy">{children}</h2>;
}

function Stars() {
  return (
    <div className="flex gap-0.5 text-amber-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-current" />
      ))}
    </div>
  );
}

export default function App() {
  const [pack, setPack] = useState('2');
  const [openFaq, setOpenFaq] = useState<number | null>(FAQ.length - 1);

  return (
    <div className="mx-auto min-h-screen max-w-xl bg-white shadow-xl shadow-navy/5">
      {/* Barra superior */}
      <div className="flex items-center justify-center gap-3 bg-navy px-4 py-2 text-[11px] font-semibold text-white">
        <span className="flex items-center gap-1">
          <Truck className="h-3.5 w-3.5" /> Envío GRATIS 24/48h
        </span>
        <span className="opacity-40">|</span>
        <span className="flex items-center gap-1 text-sky">
          <Banknote className="h-3.5 w-3.5" /> Paga al recibir en casa
        </span>
      </div>

      {/* Logo */}
      <header className="flex justify-center bg-white py-3">
        <img src={IMAGES.logo} alt="Nubepaso" className="h-20 w-auto" />
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-cloud to-white px-4 pb-10 pt-6 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-sky/40 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-brand">
          <Stethoscope className="h-3.5 w-3.5" /> Recomendado por podólogos
        </span>
        <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight text-navy">
          ¿Tus pies no aguantan más <span className="text-brand">al final del día</span>?
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-slate-600">
          Descubre las <strong className="text-navy">Plantillas Ortopédicas 4D™</strong>: alivio instantáneo para
          talones, rodillas y lumbares.
        </p>
        <Img src={IMAGES.hero} alt="Plantillas Nubepaso" className="mx-auto mt-6 w-full max-w-md rounded-2xl shadow-md" />
        <div className="mt-6">
          <CtaButton>Quiero mis plantillas ahora</CtaButton>
        </div>
        <div className="mt-3 flex justify-center gap-4 text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <Banknote className="h-3.5 w-3.5 text-ok" /> Pago contra reembolso
          </span>
          <span className="flex items-center gap-1">
            <Truck className="h-3.5 w-3.5 text-ok" /> Envío gratis 24/48h
          </span>
        </div>
      </section>

      {/* Packs */}
      <section className="px-4 pb-8">
        <Title>Elige tu pack</Title>
        <p className="mt-1 text-center text-xs text-slate-500">Ahorra más eligiendo un pack mayor.</p>
        <div className="mt-6 space-y-4">
          {PACKS.map((p) => {
            const active = pack === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setPack(p.id)}
                className={`relative flex w-full items-center gap-3 rounded-2xl border-2 p-4 text-left transition ${
                  active ? 'border-ok bg-ok-soft' : 'border-slate-200 bg-white hover:border-sky'
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-ok px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    ★ Más popular
                  </span>
                )}
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                    active ? 'border-ok bg-ok' : 'border-slate-300'
                  }`}
                >
                  {active && <Check className="h-3 w-3 text-white" />}
                </span>
                <span className="flex-1">
                  <span className="block font-bold text-navy">{p.title}</span>
                  <span className="block text-xs text-slate-500">{p.subtitle}</span>
                </span>
                <span className="text-right">
                  <span className="block font-display text-xl font-extrabold text-brand">{euro(p.price)}</span>
                  {p.save && (
                    <span className="mt-1 inline-block rounded-md bg-ok-soft px-2 py-0.5 text-[10px] font-bold text-ok">
                      Ahorra {euro(p.save)}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
        <div className="mt-6">
          <CtaButton>Quiero aprovechar la oferta</CtaButton>
        </div>
        <p className="mt-3 flex items-center justify-center gap-1 text-center text-[11px] text-slate-500">
          <Lock className="h-3 w-3 text-ok" /> La selección de pack, talla y pago se realiza de forma segura en el
          formulario de pedido.
        </p>
      </section>

      {/* Garantías */}
      <section className="grid grid-cols-4 gap-2 bg-cloud px-3 py-6 text-center">
        {[
          { icon: ShieldCheck, label: 'Garantía satisfacción' },
          { icon: Truck, label: 'Envío rápido 24/48h' },
          { icon: Banknote, label: 'Pago seguro' },
          { icon: Headphones, label: 'Atención al cliente' },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-sky to-brand text-white shadow-md">
              <Icon className="h-5 w-5" />
            </span>
            <span className="text-[11px] font-semibold leading-tight text-navy">{label}</span>
          </div>
        ))}
      </section>

      {/* Problema */}
      <section className="px-4 py-10">
        <Title>
          Pasar horas de pie tiene un <span className="text-brand">precio muy caro</span>
        </Title>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {PAINS.map((p) => (
            <span key={p} className="rounded-full bg-bad-soft px-3 py-1 text-xs font-semibold text-bad">
              ✕ {p}
            </span>
          ))}
        </div>
        <p className="mx-auto mt-4 max-w-md text-center text-sm text-slate-600">
          Sabemos lo duro que es terminar tu jornada y no tener ganas de nada.{' '}
          <strong className="text-navy">El problema no eres tú, es el calzado duro que usas a diario.</strong> Dale a
          tus pies el descanso que suplican.
        </p>
        <Img src={IMAGES.problem} alt="Nubepaso en el día a día" className="mt-6 w-full rounded-2xl" />
      </section>

      {/* Tecnología */}
      <section className="bg-cloud px-4 py-10">
        <Title>
          Tecnología de Masaje <span className="text-brand">4D</span> a cada paso
        </Title>
        <div className="mt-6 space-y-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex gap-3 rounded-2xl bg-white p-4 shadow-sm">
              <CheckCircle2 className="h-6 w-6 shrink-0 fill-ok text-white" />
              <div>
                <h3 className="font-bold text-navy">{f.title}</h3>
                <p className="text-xs text-slate-500">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <Img src={IMAGES.tech1} alt="Detalle de la plantilla" className="w-full rounded-2xl" />
          <Img src={IMAGES.tech2} alt="Amortiguación de la plantilla" className="w-full rounded-2xl" />
        </div>

        <div className="mt-6 rounded-2xl bg-white p-5 text-center shadow-sm">
          <h3 className="flex items-center justify-center gap-2 font-display text-lg font-extrabold text-navy">
            <Scissors className="h-5 w-5 text-sky" /> ¿Miedo a equivocarte de talla? ¡Imposible!
          </h3>
          <p className="mt-2 text-xs text-slate-500">
            Talla universal y totalmente ajustable: recórtalas siguiendo las líneas guía traseras en segundos.{' '}
            <strong className="text-navy">¡Sirven para cualquier zapato!</strong>
          </p>
          <Img src={IMAGES.sizes} alt="Plantillas recortables" className="mx-auto mt-4 w-full max-w-xs rounded-xl" />
        </div>
      </section>

      {/* Comparativa */}
      <section className="px-4 py-10">
        <Title>
          Nubepaso <span className="text-brand">vs</span> Otras plantillas
        </Title>
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 text-xs">
          <div className="grid grid-cols-[1fr_80px_80px] bg-cloud font-semibold">
            <div className="p-3 text-slate-500">Criterio</div>
            <div className="flex flex-col items-center justify-center bg-brand p-2 text-white">
              <Check className="h-4 w-4" /> Nubepaso
            </div>
            <div className="flex flex-col items-center justify-center p-2 text-center text-slate-500">
              <X className="h-4 w-4" /> Otras
            </div>
          </div>
          {COMPARISON.map((row) => (
            <div key={row} className="grid grid-cols-[1fr_80px_80px] border-t border-slate-100">
              <div className="p-3 font-medium text-navy">{row}</div>
              <div className="flex items-center justify-center bg-brand/5">
                <CheckCircle2 className="h-5 w-5 fill-ok text-white" />
              </div>
              <div className="flex items-center justify-center">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-bad-soft">
                  <X className="h-3 w-3 text-bad" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Img src={IMAGES.lifestyle} alt="Nubepaso" className="w-full" />

      {/* Opiniones */}
      <section className="bg-cloud px-4 py-10">
        <Title>
          Lo que dicen <span className="text-brand">nuestros clientes</span>
        </Title>
        <div className="mx-auto mt-4 flex w-fit items-center gap-3 rounded-2xl bg-white px-5 py-3 shadow-sm">
          <span className="font-display text-3xl font-extrabold text-navy">{RATING.score}</span>
          <div>
            <Stars />
            <p className="text-[11px] text-slate-500">
              basado en <strong>{RATING.count}</strong> valoraciones
            </p>
          </div>
        </div>
        <div className="mt-6 space-y-4">
          {REVIEWS.map((r) => (
            <div key={r.name} className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky to-brand font-bold text-white">
                  {r.name[0]}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-bold text-navy">{r.name}</p>
                  <p className="flex items-center gap-1 text-[11px] text-slate-400">
                    <MapPin className="h-3 w-3" /> {r.city}
                  </p>
                </div>
                <Stars />
              </div>
              <p className="mt-3 text-sm text-slate-600">"{r.text}"</p>
              <span className="mt-3 inline-flex items-center gap-1 rounded-md bg-ok-soft px-2 py-0.5 text-[11px] font-semibold text-ok">
                <Check className="h-3 w-3" /> Compra verificada
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Garantía */}
      <section className="bg-ok-soft px-4 py-10 text-center">
        <div className="mx-auto flex h-24 w-24 flex-col items-center justify-center rounded-full border-4 border-ok bg-white">
          <span className="font-display text-3xl font-extrabold leading-none text-navy">15</span>
          <span className="text-[10px] font-bold uppercase text-ok">días</span>
        </div>
        <h2 className="mt-4 font-display text-xl font-extrabold text-navy">Garantía de satisfacción 15 días</h2>
        <p className="mx-auto mt-2 max-w-sm text-sm text-slate-600">
          Si no notas el alivio, te devolvemos el dinero. Sin preguntas, sin complicaciones.
        </p>
      </section>

      {/* FAQ */}
      <section className="px-4 py-10">
        <Title>
          Preguntas <span className="text-brand">frecuentes</span>
        </Title>
        <div className="mt-6 space-y-3">
          {FAQ.map((f, i) => {
            const open = openFaq === i;
            return (
              <div key={f.q} className={`rounded-2xl border bg-white ${open ? 'border-brand/40' : 'border-slate-200'}`}>
                <button
                  onClick={() => setOpenFaq(open ? null : i)}
                  className="flex w-full items-center justify-between gap-3 p-4 text-left text-sm font-bold text-navy"
                >
                  {f.q}
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                      open ? 'bg-brand text-white' : 'bg-cloud text-brand'
                    }`}
                  >
                    {open ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                  </span>
                </button>
                {open && <p className="px-4 pb-4 text-sm text-slate-500">{f.a}</p>}
              </div>
            );
          })}
        </div>
      </section>

      {/* Pedido */}
      <section id="pedido" className="scroll-mt-4 border-t-4 border-sky bg-cloud px-4 py-10 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-ok/40 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ok">
          <ShieldCheck className="h-3.5 w-3.5" /> Pago 100% seguro contra reembolso
        </span>
        <h2 className="mt-3 font-display text-2xl font-extrabold text-navy">Completa tu pedido</h2>
        <p className="mt-1 text-sm text-slate-500">Elige tu pack, tu modelo y paga al recibir en casa.</p>
        {/* Pega aquí el código del formulario de pedido de YouCan */}
        <div className="mt-6 rounded-2xl border-2 border-dashed border-brand/40 bg-white p-6 text-sm">
          <p className="font-bold text-navy">Formulario de pedido YouCan</p>
          <p className="mt-1 text-xs text-slate-500">
            Pack seleccionado: <strong>{PACKS.find((p) => p.id === pack)?.title}</strong> — pack, talla, nombre,
            teléfono, dirección y botón de confirmación.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy px-4 py-10 text-center text-xs text-white/70">
        <div className="mx-auto w-fit rounded-2xl bg-white px-4 py-2">
          <img src={IMAGES.logo} alt="Nubepaso" className="h-20 w-auto" />
        </div>
        <p className="mt-5">Envíos operados por Correos Express / GLS.</p>
        <p className="mt-2 space-x-2">
          <a href="#" className="hover:text-white">Política de privacidad</a>·
          <a href="#" className="hover:text-white">Términos y condiciones</a>·
          <a href="#" className="hover:text-white">Contacto</a>
        </p>
        <p className="mt-2 text-white/50">© {new Date().getFullYear()} Nubepaso. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
