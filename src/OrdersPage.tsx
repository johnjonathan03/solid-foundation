import type { Product } from './HomePage'
import type { ConfirmedOrder } from './ProductPage'
import { parsePrice } from './ProductPage'
import BrandLogo from './BrandLogo'

type OrdersPageProps = {
  orders: ConfirmedOrder[]
  cartItems: Product[]
  onBack: () => void
  onSelectProduct: (product: Product) => void
  onRemoveCartItem: (index: number) => void
  onConfirmPayment: (code: string) => void
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-brand-ash-dark bg-white p-10 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-ash text-2xl text-brand-green">□</div>
      <h3 className="mt-4 font-display text-xl font-black">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-base leading-relaxed text-gray-500">{body}</p>
    </div>
  )
}

export default function OrdersPage({ orders, cartItems, onBack, onSelectProduct, onRemoveCartItem, onConfirmPayment }: OrdersPageProps) {
  const basketTotal = cartItems.reduce((sum, product) => sum + parsePrice(product.unit), 0)

  return (
    <div className="marketplace-page min-h-screen bg-brand-ash font-sans text-gray-900">
      <header className="sticky top-0 z-40 border-b border-brand-ash-dark bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-6">
          <button onClick={onBack} className="flex items-center gap-2 rounded-xl px-3 py-2 text-base font-bold text-brand-green transition hover:bg-brand-ash">
            <span aria-hidden="true">←</span> Continue shopping
          </button>
          <BrandLogo size="sm" className="hidden sm:flex" />
          <div className="rounded-full bg-brand-green px-3 py-1.5 text-sm font-bold text-white">{orders.length} active</div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <section className="rounded-3xl bg-brand-green p-7 text-white md:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-200">Order centre</p>
          <h1 className="mt-3 font-display text-4xl font-black md:text-5xl">Your basket and orders</h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/70">Review products you saved, see every confirmed order, and keep your delivery tracking codes close by.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <div className="rounded-2xl bg-white/10 px-5 py-3"><span className="text-2xl font-black">{cartItems.length}</span><span className="ml-2 text-sm text-white/70">basket items</span></div>
            <div className="rounded-2xl bg-white/10 px-5 py-3"><span className="text-2xl font-black">{orders.length}</span><span className="ml-2 text-sm text-white/70">confirmed orders</span></div>
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-5">
            <p className="text-sm font-bold uppercase tracking-widest text-brand-orange">In progress</p>
            <h2 className="mt-1 font-display text-3xl font-black">Confirmed orders</h2>
          </div>
          {orders.length === 0 ? (
            <EmptyState title="No confirmed orders yet" body="Choose a product, enter your delivery address, and place an order to see live tracking details here." />
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <article key={order.code} className="grid gap-5 rounded-3xl border border-brand-ash-dark bg-white p-5 shadow-sm md:grid-cols-[120px_1fr_auto] md:items-center">
                  <img src={order.product.image} alt={order.product.name} className="h-28 w-full rounded-2xl object-cover md:w-28" />
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`rounded-full px-3 py-1 text-sm font-bold ${order.paymentStatus === 'client-confirmed' ? 'bg-green-50 text-brand-green' : 'bg-orange-50 text-brand-orange'}`}>
                        {order.paymentStatus === 'client-confirmed' ? 'Payment confirmed · Preparing order' : 'Awaiting payment confirmation'}
                      </span>
                      <span className="text-sm text-gray-400">{order.placedAt}</span>
                    </div>
                    <h3 className="mt-3 font-display text-xl font-black">{order.product.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">{order.product.vendor} · {order.quantity} {order.bulk ? 'bulk packs' : 'units'} · {order.paymentMethod === 'card' ? 'Card' : order.paymentMethod === 'bank_transfer' ? 'Bank transfer' : 'USSD'} via Paystack</p>
                    <p className="mt-1 text-sm text-gray-400">Delivered to {order.address}</p>
                    {order.paymentStatus === 'awaiting-payment' && (
                      <button onClick={() => onConfirmPayment(order.code)} className="mt-4 rounded-xl bg-brand-orange px-4 py-2.5 text-sm font-bold text-white">
                        I have completed payment
                      </button>
                    )}
                  </div>
                  <div className="rounded-2xl bg-brand-ash p-4 md:min-w-52">
                    <p className="text-sm font-semibold text-gray-400">Tracking code</p>
                    <p className="mt-1 font-display text-xl font-black text-brand-green">{order.code}</p>
                    <p className="mt-2 text-lg font-black">₦{order.total.toLocaleString()}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="mt-12">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-brand-orange">Saved for checkout</p>
              <h2 className="mt-1 font-display text-3xl font-black">Your basket</h2>
            </div>
            {cartItems.length > 0 && <p className="text-lg font-black text-brand-green">Subtotal ₦{basketTotal.toLocaleString()}</p>}
          </div>
          {cartItems.length === 0 ? (
            <EmptyState title="Your basket is empty" body="Use the plus button on any marketplace item to save it here for later." />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cartItems.map((product, index) => (
                <article key={`${product.id}-${index}`} className="overflow-hidden rounded-3xl border border-brand-ash-dark bg-white">
                  <button onClick={() => onSelectProduct(product)} className="block w-full text-left">
                    <img src={product.image} alt={product.name} className="h-44 w-full object-cover" />
                    <div className="p-5">
                      <p className="text-sm font-semibold text-gray-400">{product.vendor}</p>
                      <h3 className="mt-1 font-display text-xl font-black">{product.name}</h3>
                      <p className="mt-2 text-lg font-black text-brand-green">{product.unit}</p>
                    </div>
                  </button>
                  <div className="flex gap-2 border-t border-brand-ash-dark p-4">
                    <button onClick={() => onSelectProduct(product)} className="flex-1 rounded-xl bg-brand-green px-4 py-3 text-sm font-bold text-white">Order now</button>
                    <button onClick={() => onRemoveCartItem(index)} className="rounded-xl bg-brand-ash px-4 py-3 text-sm font-bold text-gray-500 transition hover:text-brand-orange">Remove</button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
