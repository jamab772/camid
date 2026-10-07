import { useState, type FormEvent } from 'react';
import { CheckCircle2, Loader2, Star } from 'lucide-react';

// Nombre del formulario en Netlify. Debe coincidir con el formulario oculto de index.html.
const FORM_NAME = 'opinion';

export default function ReviewForm() {
  const [open, setOpen] = useState(false);
  const [stars, setStars] = useState(5);
  const [fields, setFields] = useState({ nombre: '', ciudad: '', opinion: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  const set = (k: keyof typeof fields) => (e: { target: { value: string } }) =>
    setFields((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e: FormEvent) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 'form-name': FORM_NAME, ...fields, estrellas: String(stars) }).toString(),
      });
      if (!res.ok) throw new Error();
      setStatus('done');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'done') {
    return (
      <div className="mt-6 rounded-2xl bg-white p-6 text-center shadow-sm">
        <CheckCircle2 className="mx-auto h-12 w-12 fill-ok text-white" />
        <p className="mt-3 text-lg font-bold text-navy">¡Gracias por tu opinión!</p>
        <p className="mt-1 text-base text-slate-600">La publicaremos en cuanto la revisemos.</p>
      </div>
    );
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="mt-6 w-full rounded-2xl border-2 border-dashed border-brand/40 bg-white p-4 text-base font-bold text-brand transition hover:border-brand"
      >
        ✍️ Escribe tu opinión
      </button>
    );
  }

  const input =
    'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-navy outline-none placeholder:text-slate-400 focus:border-brand focus:ring-2 focus:ring-brand/20';

  return (
    <form onSubmit={submit} className="mt-6 space-y-3 rounded-2xl bg-white p-5 shadow-sm">
      <p className="text-lg font-bold text-navy">Tu opinión sobre Nubepaso</p>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button type="button" key={n} onClick={() => setStars(n)} aria-label={`${n} estrellas`}>
            <Star className={`h-8 w-8 ${n <= stars ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
          </button>
        ))}
      </div>
      <input required placeholder="Tu nombre" value={fields.nombre} onChange={set('nombre')} className={input} />
      <input placeholder="Tu ciudad (opcional)" value={fields.ciudad} onChange={set('ciudad')} className={input} />
      <textarea
        required
        rows={4}
        placeholder="¿Qué te han parecido las plantillas?"
        value={fields.opinion}
        onChange={set('opinion')}
        className={input}
      />
      {status === 'error' && (
        <p className="rounded-xl bg-bad-soft p-3 text-sm font-semibold text-bad">
          No se pudo enviar tu opinión. Inténtalo de nuevo.
        </p>
      )}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-base font-bold text-white transition hover:bg-navy disabled:opacity-60"
      >
        {status === 'sending' && <Loader2 className="h-4 w-4 animate-spin" />}
        Enviar opinión
      </button>
    </form>
  );
}
