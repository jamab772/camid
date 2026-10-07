import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Banknote, CheckCircle2, Loader2, Lock } from 'lucide-react';
import { PACKS, PAYPAL_CLIENT_ID, SHOE_SIZES } from './content';

// Nombre del formulario en Netlify. Debe coincidir con el formulario oculto de index.html.
const FORM_NAME = 'pedido';

type Fields = {
  nombre: string;
  telefono: string;
  email: string;
  direccion: string;
  ciudad: string;
  codigo_postal: string;
  provincia: string;
  talla: string;
  notas: string;
};

const EMPTY: Fields = {
  nombre: '',
  telefono: '',
  email: '',
  direccion: '',
  ciudad: '',
  codigo_postal: '',
  provincia: '',
  talla: '',
  notas: '',
};

const euro = (n: number) => n.toFixed(2).replace('.', ',') + ' €';

async function sendToNetlify(data: Record<string, string>) {
  const res = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ 'form-name': FORM_NAME, ...data }).toString(),
  });
  if (!res.ok) throw new Error(`Netlify respondió ${res.status}`);
}

declare global {
  interface Window {
    paypal?: any;
  }
}

let paypalSdk: Promise<void> | null = null;
function loadPaypal() {
  if (!paypalSdk) {
    paypalSdk = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=EUR&intent=capture&components=buttons`;
      s.onload = () => resolve();
      s.onerror = () => {
        paypalSdk = null;
        reject(new Error('No se pudo cargar PayPal'));
      };
      document.head.appendChild(s);
    });
  }
  return paypalSdk;
}

export default function OrderForm({ pack, setPack }: { pack: string; setPack: (id: string) => void }) {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [method, setMethod] = useState<'cod' | 'paypal'>('cod');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const paypalRef = useRef<HTMLDivElement>(null);

  const selected = PACKS.find((p) => p.id === pack) ?? PACKS[0];

  // Los botones de PayPal leen siempre los valores actuales a través de esta ref.
  const latest = useRef({ fields, selected });
  latest.current = { fields, selected };

  const orderData = (extra: Record<string, string>) => ({
    ...latest.current.fields,
    pack: latest.current.selected.title,
    total: euro(latest.current.selected.price),
    ...extra,
  });

  const set = (k: keyof Fields) => (e: { target: { value: string } }) =>
    setFields((f) => ({ ...f, [k]: e.target.value }));

  async function submitCod(e: FormEvent) {
    e.preventDefault();
    setStatus('sending');
    setError('');
    try {
      await sendToNetlify(orderData({ metodo_pago: 'Contra reembolso', estado_pago: 'PENDIENTE (pago al recibir)' }));
      setStatus('done');
    } catch (err) {
      setStatus('error');
      setError('No se pudo enviar el pedido. Inténtalo de nuevo o contáctanos.');
    }
  }

  useEffect(() => {
    if (method !== 'paypal' || !PAYPAL_CLIENT_ID || !paypalRef.current) return;
    let cancelled = false;
    const container = paypalRef.current;
    loadPaypal()
      .then(() => {
        if (cancelled || !window.paypal) return;
        container.innerHTML = '';
        window.paypal
          .Buttons({
            style: { layout: 'vertical', shape: 'pill', label: 'pay' },
            onClick: (_: unknown, actions: any) => {
              if (!formRef.current?.reportValidity()) return actions.reject();
              return actions.resolve();
            },
            createOrder: (_: unknown, actions: any) =>
              actions.order.create({
                purchase_units: [
                  {
                    description: `Nubepaso - ${latest.current.selected.title}`,
                    amount: { currency_code: 'EUR', value: latest.current.selected.price.toFixed(2) },
                  },
                ],
              }),
            onApprove: async (_: unknown, actions: any) => {
              setStatus('sending');
              try {
                const order = await actions.order.capture();
                await sendToNetlify(
                  orderData({
                    metodo_pago: 'PayPal',
                    estado_pago: `PAGADO (${order.status})`,
                    paypal_id: order.id,
                  }),
                );
                setStatus('done');
              } catch {
                setStatus('error');
                setError('El pago se procesó pero no pudimos registrar el pedido. Contáctanos con tu recibo de PayPal.');
              }
            },
            onError: () => {
              setStatus('error');
              setError('Hubo un problema con PayPal. Inténtalo de nuevo o elige pago contra reembolso.');
            },
          })
          .render(container);
      })
      .catch(() => {
        setStatus('error');
        setError('No se pudo cargar PayPal. Elige pago contra reembolso.');
      });
    return () => {
      cancelled = true;
      container.innerHTML = '';
    };
  }, [method]);

  if (status === 'done') {
    return (
      <div className="mt-6 rounded-2xl bg-white p-8 text-center shadow-sm">
        <CheckCircle2 className="mx-auto h-14 w-14 fill-ok text-white" />
        <h3 className="mt-3 font-display text-xl font-extrabold text-navy">¡Pedido recibido!</h3>
        <p className="mt-2 text-sm text-slate-600">
          Gracias, {fields.nombre.split(' ')[0]}. Te llamaremos al <strong>{fields.telefono}</strong> para confirmar tu
          pedido de <strong>{selected.title}</strong> ({euro(selected.price)}).
        </p>
      </div>
    );
  }

  const input =
    'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-navy outline-none transition placeholder:text-slate-400 focus:border-brand focus:ring-2 focus:ring-brand/20';

  return (
    <form ref={formRef} onSubmit={submitCod} className="mt-6 space-y-4 rounded-2xl bg-white p-5 text-left shadow-sm">
      <div>
        <label className="mb-1 block text-xs font-bold text-navy">Pack</label>
        <select value={pack} onChange={(e) => setPack(e.target.value)} className={input}>
          {PACKS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title} — {euro(p.price)}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-1 block text-xs font-bold text-navy">Talla de calzado</label>
        <select required value={fields.talla} onChange={set('talla')} className={input}>
          <option value="">Elige tu talla</option>
          {SHOE_SIZES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      <input required placeholder="Nombre y apellidos" autoComplete="name" value={fields.nombre} onChange={set('nombre')} className={input} />
      <input required type="tel" placeholder="Teléfono" autoComplete="tel" pattern="[0-9 +]{9,15}" value={fields.telefono} onChange={set('telefono')} className={input} />
      <input type="email" placeholder="Email (opcional)" autoComplete="email" value={fields.email} onChange={set('email')} className={input} />
      <input required placeholder="Dirección (calle, número, piso)" autoComplete="street-address" value={fields.direccion} onChange={set('direccion')} className={input} />
      <div className="grid grid-cols-2 gap-3">
        <input required placeholder="Ciudad" autoComplete="address-level2" value={fields.ciudad} onChange={set('ciudad')} className={input} />
        <input required placeholder="Código postal" autoComplete="postal-code" pattern="[0-9]{5}" value={fields.codigo_postal} onChange={set('codigo_postal')} className={input} />
      </div>
      <input required placeholder="Provincia" autoComplete="address-level1" value={fields.provincia} onChange={set('provincia')} className={input} />
      <textarea placeholder="Notas para el repartidor (opcional)" rows={2} value={fields.notas} onChange={set('notas')} className={input} />

      <div>
        <p className="mb-2 text-xs font-bold text-navy">Método de pago</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { id: 'cod' as const, label: 'Pago al recibir', icon: <Banknote className="h-5 w-5" /> },
            { id: 'paypal' as const, label: 'PayPal', icon: <span className="font-display text-sm font-extrabold italic">Pay<span className="text-sky">Pal</span></span> },
          ].map((m) => (
            <button
              type="button"
              key={m.id}
              onClick={() => {
                setMethod(m.id);
                setStatus('idle');
              }}
              className={`flex flex-col items-center gap-1 rounded-xl border-2 p-3 text-xs font-bold transition ${
                method === m.id ? 'border-brand bg-brand/5 text-brand' : 'border-slate-200 text-slate-500'
              }`}
            >
              {m.icon}
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between rounded-xl bg-cloud px-4 py-3 text-sm">
        <span className="text-slate-600">Total ({selected.title}) · envío gratis</span>
        <span className="font-display text-lg font-extrabold text-navy">{euro(selected.price)}</span>
      </div>

      {status === 'error' && <p className="rounded-xl bg-bad-soft p-3 text-xs font-semibold text-bad">{error}</p>}

      {method === 'cod' ? (
        <button
          type="submit"
          disabled={status === 'sending'}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-ok px-6 py-4 text-sm font-extrabold uppercase tracking-wide text-white shadow-lg shadow-ok/30 transition hover:brightness-110 disabled:opacity-60"
        >
          {status === 'sending' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
          Confirmar pedido · pago al recibir
        </button>
      ) : PAYPAL_CLIENT_ID ? (
        <div>
          {status === 'sending' && (
            <p className="mb-2 flex items-center justify-center gap-2 text-xs text-slate-500">
              <Loader2 className="h-4 w-4 animate-spin" /> Registrando tu pedido…
            </p>
          )}
          <div ref={paypalRef} />
        </div>
      ) : (
        <p className="rounded-xl bg-amber-50 p-3 text-xs text-amber-700">
          El pago con PayPal aún no está activado. Elige pago al recibir.
        </p>
      )}
    </form>
  );
}
