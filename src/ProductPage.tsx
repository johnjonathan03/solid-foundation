import { useMemo, useState } from 'react'
import { products } from './HomePage'
import type { Product } from './HomePage'
import BrandLogo from './BrandLogo'

type ProductPageProps = {
  product: Product
  onBack: () => void
  onSelectProduct: (product: Product) => void
  onPlaceOrder: (order: ConfirmedOrder) => void
  onConfirmPayment: (code: string) => void
  onOpenOrders: () => void
}

export type PaymentMethod = 'card' | 'bank_transfer' | 'ussd'

export type ConfirmedOrder = {
  code: string
  product: Product
  quantity: number
  bulk: boolean
  total: number
  address: string
  placedAt: string
  paymentMethod: PaymentMethod
  paymentStatus: 'awaiting-payment' | 'client-confirmed'
}

export function parsePrice(price: string) {
  return Number(price.match(/₦([\d,]+)/)?.[1].replace(',', '') ?? 0)
}

function TrackingCode({ code }: { code: string }) {
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(`https://solidfoundation.ng/track/${code}`)}`

  return (
    <div className="rounded-3xl border border-brand-ash-dark bg-white p-6 text-center shadow-sm">
      <div className="mx-auto mb-4 w-fit rounded-2xl border border-brand-ash-dark bg-white p-3">
        <img src={qrUrl} alt={`QR tracking code for order ${code}`} className="h-40 w-40" />
      </div>
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-orange">Order tracking code</p>
      <p className="mt-1 font-display text-2xl font-black text-brand-green">{code}</p>
      <p className="mt-2 text-sm leading-relaxed text-gray-500">Scan the QR code or save this code to follow your order from packing to delivery.</p>
    </div>
  )
}

type PaystackHandler = {
  openIframe: () => void
}

type PaystackResponse = {
  reference: string
}

declare global {
  interface Window {
    PaystackPop?: {
      setup: (options: {
        key: string
        email: string
        amount: number
        currency: string
        ref: string
        channels: string[]
        callback: (response: PaystackResponse) => void
        onClose: () => void
      }) => PaystackHandler
    }
  }
}

const paymentOptions: { id: PaymentMethod; title: string; detail: string }[] = [
  { id: 'card', title: 'Card', detail: 'Visa, Mastercard or Verve' },
  { id: 'bank_transfer', title: 'Bank transfer', detail: 'Receive a Paystack transfer account' },
  { id: 'ussd', title: 'USSD', detail: 'Pay directly from your mobile bank' },
]

export default function ProductPage({ product, onBack, onSelectProduct, onPlaceOrder, onConfirmPayment, onOpenOrders }: ProductPageProps) {
  const [quantity, setQuantity] = useState(1)
  const [bulk, setBulk] = useState(false)
  const [address, setAddress] = useState('')
  const [trackingCode, setTrackingCode] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card')
  const [paymentLaunched, setPaymentLaunched] = useState(false)
  const [paymentConfirmed, setPaymentConfirmed] = useState(false)
  const [paymentNotice, setPaymentNotice] = useState('')

  const suggestions = useMemo(
    () => products.filter((item) => item.id !== product.id).sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category)).slice(0, 4),
    [product],
  )
  const selectedPrice = bulk ? product.bulk : product.unit
  const total = parsePrice(selectedPrice) * quantity

  const placeOrder = () => {
    const code = `SJF-${Date.now().toString().slice(-6)}`
    setTrackingCode(code)
    onPlaceOrder({
      code,
      product,
      quantity,
      bulk,
      total,
      address,
      placedAt: new Date().toLocaleString('en-NG', { dateStyle: 'medium', timeStyle: 'short' }),
      paymentMethod,
      paymentStatus: 'awaiting-payment',
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openPaystack = () => {
    if (!trackingCode) return
    setPaymentNotice('')
    const paystackKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY

    const launchCheckout = () => {
      if (!paystackKey || !window.PaystackPop) {
        setPaymentLaunched(true)
        setPaymentNotice('Paystack demo mode is active. Add VITE_PAYSTACK_PUBLIC_KEY to connect the live secure checkout.')
        return
      }

      const handler = window.PaystackPop.setup({
        key: paystackKey,
        email,
        amount: total * 100,
        currency: 'NGN',
        ref: trackingCode,
        channels: [paymentMethod],
        callback: (response) => {
          setPaymentLaunched(true)
          setPaymentNotice(`Paystack returned payment reference ${response.reference}. Please confirm below.`)
        },
        onClose: () => setPaymentNotice('Paystack checkout was closed. You can reopen it whenever you are ready.'),
      })
      handler.openIframe()
    }

    if (window.PaystackPop) {
      launchCheckout()
      return
    }

    const script = document.createElement('script')
    script.src = 'https://js.paystack.co/v1/inline.js'
    script.async = true
    script.onload = launchCheckout
    script.onerror = () => setPaymentNotice('Paystack could not load. Check your connection and try again.')
    document.body.appendChild(script)
  }

  const confirmPayment = () => {
    if (!trackingCode) return
    onConfirmPayment(trackingCode)
    setPaymentConfirmed(true)
    setPaymentNotice('Payment confirmation received. The seller can now verify and prepare your delivery.')
  }

  return (
    <div className="marketplace-page min-h-screen bg-brand-ash font-sans text-gray-900">
      <header className="sticky top-0 z-40 border-b border-brand-ash-dark bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
          <button onClick={onBack} className="flex items-center gap-2 rounded-xl px-3 py-2 text-base font-bold text-brand-green transition hover:bg-brand-ash">
            <span aria-hidden="true">←</span> Back to shop
          </button>
          <BrandLogo size="sm" className="hidden sm:flex" />
          <button onClick={onOpenOrders} className="rounded-full bg-green-50 px-3 py-1.5 text-sm font-bold text-brand-green transition hover:bg-green-100">My orders</button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
        {trackingCode && (
          <section className="mb-8 grid items-center gap-6 rounded-3xl bg-brand-green p-6 text-white shadow-xl md:grid-cols-[1fr_auto] md:p-8">
            <div>
              <div className="mb-3 inline-flex rounded-full bg-white/10 px-3 py-1.5 text-sm font-bold text-orange-200">{paymentConfirmed ? 'Payment confirmed' : 'Payment required'}</div>
              <h1 className="font-display text-3xl font-black md:text-4xl">{paymentConfirmed ? 'Your order is being prepared.' : 'Complete your payment to continue.'}</h1>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-white/75">{paymentConfirmed ? `We notified ${product.vendor} and your order is moving forward.` : `Your order is reserved with ${product.vendor}. Pay securely through Paystack, then confirm your payment below.`}</p>
            </div>
            <div className="w-full md:w-72">
              <TrackingCode code={trackingCode} />
            </div>
          </section>
        )}

        <div className="mb-6 flex items-center gap-2 text-sm font-semibold text-gray-500">
          <button onClick={onBack} className="hover:text-brand-green">Marketplace</button>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        <section className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
              {product.badge && <span className="absolute left-5 top-5 rounded-full bg-brand-green px-4 py-2 text-sm font-bold text-white">{product.badge}</span>}
            </div>
            <div className="p-6 md:p-8">
              <h2 className="font-display text-2xl font-black">Freshness you can trust</h2>
              <p className="mt-3 text-base leading-7 text-gray-600">{product.description}</p>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  ['Quality checked', 'Every batch'],
                  ['Delivery', 'Fast & tracked'],
                  ['Bulk savings', `${product.bulkSave}% off`],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl bg-brand-ash p-4">
                    <p className="text-sm text-gray-500">{label}</p>
                    <p className="mt-1 text-sm font-extrabold text-brand-green">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="h-fit rounded-3xl border border-brand-ash-dark bg-white p-6 shadow-sm md:p-8 lg:sticky lg:top-28">
            <p className="text-base font-bold text-brand-orange">{product.vendor}</p>
            <h1 className="mt-2 font-display text-3xl font-black tracking-tight md:text-4xl">{product.name}</h1>
            <div className="mt-4 flex items-center gap-2 text-base">
              <span className="text-brand-orange">★★★★★</span>
              <span className="font-bold">4.8</span>
              <span className="text-gray-400">(186 verified reviews)</span>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3 rounded-2xl bg-brand-ash p-1.5">
              <button onClick={() => setBulk(false)} className={`rounded-xl px-4 py-3 text-base font-bold transition ${!bulk ? 'bg-white text-brand-green shadow-sm' : 'text-gray-500'}`}>Single order</button>
              <button onClick={() => setBulk(true)} className={`rounded-xl px-4 py-3 text-base font-bold transition ${bulk ? 'bg-brand-green text-white shadow-sm' : 'text-gray-500'}`}>Bulk order</button>
            </div>

            <div className="mt-7 flex items-end justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-400">Price</p>
                <p className="font-display text-3xl font-black text-brand-green">{selectedPrice}</p>
              </div>
              {bulk && <span className="rounded-full bg-orange-50 px-3 py-1.5 text-sm font-bold text-brand-orange">Save {product.bulkSave}%</span>}
            </div>

            <div className="mt-7">
              <label className="mb-2 block text-base font-bold">How many do you want?</label>
              <div className="flex items-center justify-between rounded-2xl border border-brand-ash-dark p-2">
                <button onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="h-12 w-12 rounded-xl bg-brand-ash text-2xl font-bold text-brand-green transition active:scale-95">−</button>
                <div className="text-center">
                  <p className="font-display text-2xl font-black">{quantity}</p>
                  <p className="text-xs text-gray-400">{bulk ? 'bulk packs' : 'units'}</p>
                </div>
                <button onClick={() => setQuantity((value) => value + 1)} className="h-12 w-12 rounded-xl bg-brand-green text-2xl font-bold text-white transition active:scale-95">+</button>
              </div>
            </div>

            <label className="mt-6 block text-base font-bold" htmlFor="delivery-address">Delivery address</label>
            <textarea
              id="delivery-address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="Enter the full address for delivery"
              className="mt-2 min-h-24 w-full resize-none rounded-2xl border border-brand-ash-dark bg-brand-ash p-4 text-base outline-none transition focus:border-brand-green focus:bg-white"
            />

            <label className="mt-6 block text-base font-bold" htmlFor="payment-email">Email for payment receipt</label>
            <input
              id="payment-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="mt-2 w-full rounded-2xl border border-brand-ash-dark bg-brand-ash p-4 text-base outline-none transition focus:border-brand-green focus:bg-white"
            />

            <div className="mt-6">
              <p className="mb-3 text-base font-bold">Choose how to pay</p>
              <div className="grid gap-2">
                {paymentOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setPaymentMethod(option.id)}
                    className={`flex items-center justify-between rounded-2xl border p-4 text-left transition ${paymentMethod === option.id ? 'border-brand-green bg-green-50' : 'border-brand-ash-dark bg-white'}`}
                  >
                    <span>
                      <span className="block text-base font-extrabold">{option.title}</span>
                      <span className="block text-sm text-gray-500">{option.detail}</span>
                    </span>
                    <span className={`h-5 w-5 rounded-full border-4 ${paymentMethod === option.id ? 'border-brand-green bg-white' : 'border-gray-200'}`} />
                  </button>
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-gray-400">Payment is processed securely by Paystack. Card and bank credentials are never stored by The Solid Foundation.</p>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-brand-ash-dark pt-6">
              <span className="text-base font-semibold text-gray-500">Estimated total</span>
              <span className="font-display text-2xl font-black">₦{total.toLocaleString()}</span>
            </div>
            <button onClick={trackingCode ? onOpenOrders : placeOrder} disabled={!address.trim() || !email.trim()} className="mt-5 w-full rounded-2xl bg-brand-orange px-5 py-4 text-lg font-extrabold text-white shadow-lg shadow-orange-100 transition hover:bg-orange-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40">
              {trackingCode ? 'View this order' : 'Continue to payment'}
            </button>
            <p className="mt-3 text-center text-sm text-gray-400">Free delivery when your order total is above ₦100,000.</p>
          </aside>
        </section>

        {trackingCode && (
          <section className="mt-8 rounded-3xl border border-brand-ash-dark bg-white p-6 shadow-sm md:p-8">
            <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-brand-orange">Secure payment</p>
                <h2 className="mt-2 font-display text-3xl font-black">Pay ₦{total.toLocaleString()} through Paystack</h2>
                <p className="mt-2 max-w-2xl text-base leading-relaxed text-gray-500">You selected {paymentOptions.find((option) => option.id === paymentMethod)?.title}. Paystack sends the payment to the marketplace seller account and returns a transaction reference.</p>
                {paymentNotice && <p className={`mt-4 rounded-xl p-3 text-sm font-semibold ${paymentConfirmed ? 'bg-green-50 text-brand-green' : 'bg-orange-50 text-brand-orange'}`}>{paymentNotice}</p>}
              </div>
              <div className="flex min-w-64 flex-col gap-3">
                {!paymentConfirmed && (
                  <button onClick={openPaystack} className="rounded-2xl bg-brand-green px-6 py-4 text-base font-extrabold text-white transition hover:bg-green-900">
                    Pay securely with Paystack
                  </button>
                )}
                {paymentLaunched && !paymentConfirmed && (
                  <button onClick={confirmPayment} className="rounded-2xl bg-brand-orange px-6 py-4 text-base font-extrabold text-white transition hover:bg-orange-700">
                    I have completed payment
                  </button>
                )}
                {paymentConfirmed && (
                  <button onClick={onOpenOrders} className="rounded-2xl bg-brand-green px-6 py-4 text-base font-extrabold text-white">
                    View paid order
                  </button>
                )}
              </div>
            </div>
          </section>
        )}

        <section className="mt-14">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-brand-orange">Complete your basket</p>
            <h2 className="mt-2 font-display text-3xl font-black">Similar items you may need</h2>
            <p className="mt-2 text-base text-gray-500">Useful products from trusted sellers, selected to go well with your order.</p>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {suggestions.map((item) => (
              <button key={item.id} onClick={() => { onSelectProduct(item); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="overflow-hidden rounded-2xl border border-brand-ash-dark bg-white text-left transition hover:-translate-y-1 hover:shadow-lg">
                <img src={item.image} alt={item.name} className="h-40 w-full object-cover" />
                <div className="p-4">
                  <p className="text-sm font-semibold text-gray-400">{item.vendor}</p>
                  <p className="mt-1 text-base font-extrabold">{item.name}</p>
                  <p className="mt-2 text-base font-black text-brand-green">{item.unit}</p>
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
