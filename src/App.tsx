import { useState, type ReactNode } from 'react';
import {
  Banknote,
  Check,
  CheckCircle2,
  Headphones,
  MapPin,
  Scissors,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  Tag,
  Truck,
  X,
} from 'lucide-react';
import ReviewForm from './ReviewForm';
import {
  ARCH_POINTS,
  COMPARISON,
  CUT_STEPS,
  SIZE_MODELS,
  FEATURES,
  IMAGES,
  MASSAGE_POINTS,
  PACKS,
  PAINS,
  REVIEWS,
  SPECS,
} from './content';

const euro = (n: number) => n.toFixed(2).replace('.', ',') + ' €';

function Img({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        className={`flex aspect-square items-center justify-center bg-gradient-to-br from-sky/30 to-brand/20 p-4 text-center text-sm font-semibold text-navy ${className}`}
      >
        Imagen pendiente
        <br />
        {src.split('/').pop()}
      </div>
    );
  }
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={className} />;
}

function Title({ children }: { children: ReactNode }) {
  return <h2 className="text-center font-display text-[1.75rem] font-extrabold leading-tight text-navy">{children}</h2>;
}

function Lead({ children }: { children: ReactNode }) {
  return <p className="mx-auto mt-3 max-w-md text-center text-lg leading-relaxed text-slate-600">{children}</p>;
}

function Stars({ n = 5, size = 'h-5 w-5' }: { n?: number; size?: string }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`${size} ${i < n ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
      ))}
    </div>
  );
}

export default function App() {
  const avg = REVIEWS.reduce((s, r) => s + r.stars, 0) / REVIEWS.length;

  return (
    <div className="mx-auto min-h-screen max-w-xl bg-white shadow-xl shadow-navy/5">
      {/* Barra superior */}
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 bg-navy px-4 py-2.5 text-sm font-semibold text-white">
        <span className="flex items-center gap-1.5">
          <Truck className="h-4 w-4" /> Envío GRATIS 24/48h
        </span>
        <span className="flex items-center gap-1.5 text-sky">
          <Banknote className="h-4 w-4" /> Paga al recibir en casa
        </span>
      </div>

      {/* Logo */}
      <header className="flex justify-center bg-white py-3">
        <img src={IMAGES.logo} alt="Nubepaso" className="h-24 w-auto" />
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-cloud to-white px-4 pb-10 pt-6 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-sky/40 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-brand">
          <Stethoscope className="h-4 w-4" /> Recomendado por podólogos
        </span>
        <h1 className="mt-4 font-display text-[2.1rem] font-extrabold leading-tight text-navy">
          ¿Tus pies no aguantan más <span className="text-brand">al final del día</span>?
        </h1>
        <Lead>
          Descubre las <strong className="text-navy">Plantillas Ortopédicas 4D™ de bambú</strong>: alivio para
          talones, rodillas y lumbares desde el primer paso.
        </Lead>
        <Img src={IMAGES.hero} alt="Plantillas Nubepaso para fascitis, metatarsalgia y espolones" className="mx-auto mt-6 w-full rounded-2xl shadow-md" />
        <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-base text-slate-600">
          <span className="flex items-center gap-1.5">
            <Banknote className="h-5 w-5 text-ok" /> Pago contra reembolso
          </span>
          <span className="flex items-center gap-1.5">
            <Truck className="h-5 w-5 text-ok" /> Envío gratis 24/48h
          </span>
        </div>
      </section>

      {/* Promoción por cantidad (solo informativa) */}
      <section className="px-4 pb-10">
        <div className="rounded-3xl bg-gradient-to-br from-navy to-brand p-5 text-white shadow-lg">
          <p className="flex items-center justify-center gap-2 text-center text-sm font-bold uppercase tracking-widest text-sky">
            <Tag className="h-4 w-4" /> Promoción por tiempo limitado
          </p>
          <h2 className="mt-2 text-center font-display text-[1.6rem] font-extrabold leading-tight">
            Cuantos más pares, más ahorras
          </h2>
          <div className="mt-5 space-y-3">
            {PACKS.map((p) => (
              <div
                key={p.title}
                className={`relative flex items-center justify-between rounded-2xl px-4 py-3 ${
                  p.popular ? 'bg-white text-navy ring-4 ring-sky/60' : 'bg-white/10'
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-3 left-4 rounded-full bg-ok px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-white">
                    ★ Más popular
                  </span>
                )}
                <div>
                  <p className="text-lg font-bold">{p.title}</p>
                  <p className={`text-sm ${p.popular ? 'text-slate-500' : 'text-white/70'}`}>{p.subtitle}</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-2xl font-extrabold">{euro(p.price)}</p>
                  {p.save && (
                    <p className={`text-sm font-bold ${p.popular ? 'text-ok' : 'text-sky'}`}>Ahorras {euro(p.save)}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-base text-white/80">
            Llévate 2 o 3 pares y paga mucho menos por cada uno. Envío gratis en todos los pedidos.
          </p>
        </div>
        {/* Aquí puedes colocar tu botón de pedido */}
      </section>

      {/* Garantías */}
      <section className="grid grid-cols-2 gap-4 bg-cloud px-4 py-8 text-center sm:grid-cols-4">
        {[
          { icon: ShieldCheck, label: 'Garantía de satisfacción 15 días' },
          { icon: Truck, label: 'Envío rápido 24/48h' },
          { icon: Banknote, label: 'Pago al recibir' },
          { icon: Headphones, label: 'Atención al cliente' },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-sky to-brand text-white shadow-md">
              <Icon className="h-6 w-6" />
            </span>
            <span className="text-sm font-semibold leading-tight text-navy">{label}</span>
          </div>
        ))}
      </section>

      {/* Problema */}
      <section className="px-4 py-12">
        <Title>
          Pasar horas de pie tiene un <span className="text-brand">precio muy caro</span>
        </Title>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {PAINS.map((p) => (
            <span key={p} className="rounded-full bg-bad-soft px-3 py-1.5 text-sm font-semibold text-bad">
              ✕ {p}
            </span>
          ))}
        </div>
        <Lead>
          Sabemos lo duro que es terminar tu jornada y no tener ganas de nada.{' '}
          <strong className="text-navy">El problema no eres tú, es el calzado duro que usas a diario.</strong> Dale a
          tus pies el descanso que suplican.
        </Lead>
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={IMAGES.cushion}
          aria-label="Amortiguación de la plantilla Nubepaso"
          className="mt-6 w-full rounded-2xl shadow-sm"
        >
          <source src={IMAGES.cushionWebm} type="video/webm" />
          <source src={IMAGES.cushionVideo} type="video/mp4" />
          <img src={IMAGES.cushionGif} alt="Amortiguación de la plantilla Nubepaso" />
        </video>
        <p className="mt-3 text-center text-base text-slate-500">
          Presiona y suelta: la espuma recupera su forma al instante y absorbe el impacto de cada paso.
        </p>
      </section>

      {/* Camina sobre nubes */}
      <section className="bg-cloud px-4 py-12">
        <Title>
          Tecnología de Masaje <span className="text-brand">4D</span> a cada paso
        </Title>
        <Img src={IMAGES.clouds} alt="Camina sobre las nubes" className="mt-6 w-full rounded-2xl shadow-sm" />
        <div className="mt-6 space-y-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex gap-3 rounded-2xl bg-white p-4 shadow-sm">
              <CheckCircle2 className="h-7 w-7 shrink-0 fill-ok text-white" />
              <div>
                <h3 className="text-lg font-bold text-navy">{f.title}</h3>
                <p className="text-base text-slate-600">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tecnología de arco */}
      <section className="px-4 py-12">
        <Title>
          Tecnología de <span className="text-brand">arco única</span>
        </Title>
        <Lead>Un diseño que respeta la forma natural de tu pie y reparte la presión en toda la planta.</Lead>
        <Img src={IMAGES.arch} alt="Soporte del arco plantar" className="mt-6 w-full rounded-2xl shadow-sm" />
        <div className="mt-6 grid gap-3">
          {ARCH_POINTS.map((p, i) => (
            <div key={p.title} className="flex items-start gap-3 rounded-2xl border border-slate-200 p-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand font-bold text-white">
                {String.fromCharCode(65 + i)}
              </span>
              <div>
                <h3 className="text-lg font-bold text-navy">{p.title}</h3>
                <p className="text-base text-slate-600">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Puntos de masaje */}
      <section className="bg-cloud px-4 py-12">
        <Title>
          Un masaje en <span className="text-brand">cada paso</span>
        </Title>
        <Img src={IMAGES.massage} alt="Puntos de masaje de la plantilla" className="mt-6 w-full rounded-2xl shadow-sm" />
        <ul className="mt-6 space-y-3">
          {MASSAGE_POINTS.map((t) => (
            <li key={t} className="flex gap-3 text-base text-slate-700">
              <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
              {t}
            </li>
          ))}
        </ul>
      </section>

      {/* Recortable */}
      <section className="px-4 py-12">
        <h2 className="flex items-center justify-center gap-2 text-center font-display text-[1.75rem] font-extrabold leading-tight text-navy">
          <Scissors className="h-7 w-7 shrink-0 text-sky" /> ¿Miedo a equivocarte de talla?
        </h2>
        <Lead>
          <strong className="text-navy">¡Imposible!</strong> Hay dos modelos y cada uno se recorta a tu talla exacta.
          Sirven para cualquier zapato.
        </Lead>
        <div className="mt-6 grid grid-cols-2 gap-3">
          {SIZE_MODELS.map((m) => (
            <div key={m.who} className="rounded-2xl border-2 border-brand/20 bg-cloud p-4 text-center">
              <p className="text-sm font-bold uppercase tracking-widest text-brand">{m.who}</p>
              <p className="mt-1 font-display text-2xl font-extrabold text-navy">{m.range}</p>
              <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                {m.sizes.map((t) => (
                  <span key={t} className="rounded-md bg-white px-2 py-0.5 text-sm font-semibold text-navy shadow-sm">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Img src={IMAGES.cut} alt="Plantilla recortable" className="mt-6 w-full rounded-2xl shadow-sm" />
        <h3 className="mt-8 text-center font-display text-xl font-extrabold text-navy">Cómo recortarlas en 4 pasos</h3>
        <div className="mt-6 grid gap-3">
          {CUT_STEPS.map((s) => (
            <div key={s.n} className="flex items-center gap-4 rounded-2xl bg-cloud p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky to-brand font-display text-lg font-extrabold text-white">
                {s.n}
              </span>
              <div>
                <h3 className="text-lg font-bold text-navy">{s.title}</h3>
                <p className="text-base text-slate-600">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ficha técnica */}
      <section className="bg-cloud px-4 py-12">
        <Title>
          Ficha <span className="text-brand">técnica</span>
        </Title>
        <Img src={IMAGES.box} alt="Caja de las plantillas Nubepaso" className="mt-6 w-full rounded-2xl shadow-sm" />
        <dl className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm">
          {SPECS.map(([k, v]) => (
            <div key={k} className="grid grid-cols-[38%_1fr] border-b border-slate-100 last:border-0">
              <dt className="bg-brand/5 p-3 text-base font-bold text-navy">{k}</dt>
              <dd className="p-3 text-base text-slate-600">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Comparativa */}
      <section className="px-4 py-12">
        <Title>
          Nubepaso <span className="text-brand">vs</span> Otras plantillas
        </Title>
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 text-base">
          <div className="grid grid-cols-[1fr_84px_74px] bg-cloud font-semibold">
            <div className="p-3 text-slate-500">Criterio</div>
            <div className="flex flex-col items-center justify-center bg-brand p-2 text-sm text-white">
              <Check className="h-5 w-5" /> Nubepaso
            </div>
            <div className="flex flex-col items-center justify-center p-2 text-sm text-slate-500">
              <X className="h-5 w-5" /> Otras
            </div>
          </div>
          {COMPARISON.map((row) => (
            <div key={row} className="grid grid-cols-[1fr_84px_74px] border-t border-slate-100">
              <div className="p-3 font-medium text-navy">{row}</div>
              <div className="flex items-center justify-center bg-brand/5">
                <CheckCircle2 className="h-6 w-6 fill-ok text-white" />
              </div>
              <div className="flex items-center justify-center">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-bad-soft">
                  <X className="h-3.5 w-3.5 text-bad" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Opiniones */}
      <section className="bg-cloud px-4 py-12">
        <Title>
          Lo que dicen <span className="text-brand">nuestros clientes</span>
        </Title>
        <div className="mx-auto mt-5 flex w-fit items-center gap-3 rounded-2xl bg-white px-5 py-3 shadow-sm">
          <span className="font-display text-4xl font-extrabold text-navy">{avg.toFixed(1).replace('.', ',')}</span>
          <div>
            <Stars n={Math.round(avg)} />
            <p className="text-sm text-slate-500">{REVIEWS.length} opiniones</p>
          </div>
        </div>
        <div className="mt-6 space-y-4">
          {REVIEWS.map((r) => (
            <div key={r.name + r.text} className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-sky to-brand text-lg font-bold text-white">
                  {r.name[0]}
                </span>
                <div className="flex-1">
                  <p className="text-base font-bold text-navy">{r.name}</p>
                  {r.city && (
                    <p className="flex items-center gap-1 text-sm text-slate-400">
                      <MapPin className="h-3.5 w-3.5" /> {r.city}
                    </p>
                  )}
                </div>
                <Stars n={r.stars} size="h-4 w-4" />
              </div>
              <p className="mt-3 text-base leading-relaxed text-slate-700">"{r.text}"</p>
            </div>
          ))}
        </div>
        <ReviewForm />
      </section>

      {/* Garantía */}
      <section className="bg-ok-soft px-4 py-12 text-center">
        <div className="mx-auto flex h-28 w-28 flex-col items-center justify-center rounded-full border-4 border-ok bg-white">
          <span className="font-display text-4xl font-extrabold leading-none text-navy">15</span>
          <span className="text-xs font-bold uppercase text-ok">días</span>
        </div>
        <h2 className="mt-4 font-display text-2xl font-extrabold text-navy">Garantía de satisfacción 15 días</h2>
        <p className="mx-auto mt-2 max-w-sm text-lg text-slate-600">
          Si no notas el alivio, te devolvemos el dinero. Sin preguntas, sin complicaciones.
        </p>
      </section>
    </div>
  );
}
