import { useState } from 'react'
import { products } from './HomePage'
import type { ConfirmedOrder } from './ProductPage'
import BrandLogo from './BrandLogo'

type SellerDashboardProps = {
  orders: ConfirmedOrder[]
  onBack: () => void
  onLogout: () => void
}

type SellerOrder = {
  code: string
  customer: string
  product: string
  image: string
  quantity: string
  total: number
  placedAt: string
  status: 'Awaiting payment' | 'Preparing' | 'Ready for pickup' | 'Completed'
}

const sampleOrders: SellerOrder[] = [
  {
    code: 'SJF-482910',
    customer: 'Amara Okafor',
    product: 'Tomatoes (Roma)',
    image: products[0].image,
    quantity: '6 units',
    total: 5100,
    placedAt: 'Today, 10:42 AM',
    status: 'Preparing',
  },
  {
    code: 'SJF-482864',
    customer: 'Tunde Bello',
    product: 'Long Grain Rice',
    image: products[1].image,
    quantity: '2 bulk packs',
    total: 39000,
    placedAt: 'Today, 9:18 AM',
    status: 'Ready for pickup',
  },
  {
    code: 'SJF-481705',
    customer: 'Nana Mensah',
    product: 'Sweet Oranges',
    image: products[2].image,
    quantity: '4 units',
    total: 4800,
    placedAt: 'Yesterday, 4:26 PM',
    status: 'Completed',
  },
]

const inventory = [
  { ...products[0], stock: 86, sold: 148, availability: 'In stock' },
  { ...products[1], stock: 34, sold: 92, availability: 'In stock' },
  { ...products[2], stock: 12, sold: 76, availability: 'Low stock' },
  { ...products[5], stock: 48, sold: 61, availability: 'In stock' },
]

function DashboardIcon({ type }: { type: 'revenue' | 'orders' | 'sold' | 'stock' }) {
  const paths = {
    revenue: <><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3 9h18M7 15h4"/></>,
    orders: <><path d="M6 3h12v18H6z"/><path d="M9 8h6M9 12h6M9 16h4"/></>,
    sold: <><path d="M4 12l5 5L20 6"/><path d="M20 12a8 8 0 11-5-7.4"/></>,
    stock: <><path d="M4 7l8-4 8 4-8 4z"/><path d="M4 7v10l8 4 8-4V7M12 11v10"/></>,
  }

  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {paths[type]}
    </svg>
  )
}

function statusStyle(status: SellerOrder['status']) {
  if (status === 'Completed') return 'bg-green-50 text-brand-green'
  if (status === 'Ready for pickup') return 'bg-blue-50 text-blue-700'
  if (status === 'Preparing') return 'bg-orange-50 text-brand-orange'
  return 'bg-gray-100 text-gray-600'
}

export default function SellerDashboard({ orders, onBack, onLogout }: SellerDashboardProps) {
  const [orderFilter, setOrderFilter] = useState<'all' | 'active' | 'completed'>('all')

  const liveOrders: SellerOrder[] = orders.map((order) => ({
    code: order.code,
    customer: 'Online customer',
    product: order.product.name,
    image: order.product.image,
    quantity: `${order.quantity} ${order.bulk ? 'bulk packs' : 'units'}`,
    total: order.total,
    placedAt: order.placedAt,
    status: order.paymentStatus === 'client-confirmed' ? 'Preparing' : 'Awaiting payment',
  }))
  const allOrders = [...liveOrders, ...sampleOrders]
  const visibleOrders = allOrders.filter((order) => {
    if (orderFilter === 'active') return order.status !== 'Completed'
    if (orderFilter === 'completed') return order.status === 'Completed'
    return true
  })
  const liveRevenue = liveOrders.filter((order) => order.status !== 'Awaiting payment').reduce((sum, order) => sum + order.total, 0)
  const grossRevenue = 428750 + liveRevenue
  const vendorPayout = Math.round(grossRevenue * 0.85)
  const unitsSold = inventory.reduce((sum, item) => sum + item.sold, 0) + liveOrders.reduce((sum, order) => sum + Number.parseInt(order.quantity), 0)
  const lowStock = inventory.filter((item) => item.stock < 20).length

  const metrics = [
    { label: 'Gross sales', value: `₦${grossRevenue.toLocaleString()}`, note: `₦${vendorPayout.toLocaleString()} estimated payout`, type: 'revenue' as const, color: '#1C4A2E' },
    { label: 'Total orders', value: String(156 + liveOrders.length), note: `${allOrders.filter((order) => order.status !== 'Completed').length} need attention`, type: 'orders' as const, color: '#E8650A' },
    { label: 'Items sold', value: unitsSold.toLocaleString(), note: 'Across all products', type: 'sold' as const, color: '#2D6A4F' },
    { label: 'Low stock', value: String(lowStock), note: 'Product to restock', type: 'stock' as const, color: '#B45309' },
  ]

  return (
    <div className="marketplace-page min-h-screen bg-brand-ash font-sans font-medium text-gray-900">
      <header className="sticky top-0 z-40 border-b border-brand-ash-dark bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
          <button onClick={onBack} className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-brand-green transition hover:bg-brand-ash">
            <span aria-hidden="true">←</span> Marketplace
          </button>
          <div className="flex items-center gap-2.5">
            <BrandLogo size="sm" showName={false} />
            <div className="hidden sm:block">
              <p className="font-display text-base font-semibold uppercase leading-none tracking-[0.06em] text-brand-orange">Seller Centre</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-gray-400">The Solid Foundation</p>
            </div>
          </div>
          <button onClick={onLogout} className="rounded-xl border border-brand-ash-dark px-3 py-2 text-sm font-bold text-gray-600 transition hover:border-brand-orange hover:text-brand-orange">
            Sign out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <section className="relative overflow-hidden rounded-3xl bg-brand-green px-6 py-8 text-white md:px-10 md:py-10">
          <div className="absolute -right-20 -top-28 h-72 w-72 rounded-full border-[45px] border-white/5" />
          <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-orange-200 md:text-base">Store overview</p>
              <h1 className="mt-3 font-display text-4xl font-bold uppercase tracking-[-0.025em] md:text-6xl">Welcome back, seller</h1>
              <p className="mt-4 max-w-2xl text-base font-semibold leading-relaxed text-white/75 md:text-lg">
                Track every order, monitor your products, and see how your shop is performing in one place.
              </p>
            </div>
            <div className="w-fit rounded-2xl border border-white/15 bg-white/10 px-5 py-3 backdrop-blur">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-white/60">Your store</p>
              <p className="mt-1 font-display text-xl font-semibold uppercase tracking-wide">Solid Harvest Market</p>
              <p className="mt-1 text-sm font-extrabold text-green-200">Open and accepting orders</p>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <article key={metric.label} className="rounded-2xl border border-brand-ash-dark bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-extrabold uppercase tracking-[0.1em] text-gray-400">{metric.label}</p>
                  <p className="mt-2 font-display text-3xl font-bold tracking-tight text-gray-900">{metric.value}</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-ash" style={{ color: metric.color }}>
                  <DashboardIcon type={metric.type} />
                </div>
              </div>
              <p className="mt-3 text-sm font-bold" style={{ color: metric.color }}>{metric.note}</p>
            </article>
          ))}
        </section>

        <div className="mt-8 grid gap-8 xl:grid-cols-[1.45fr_0.8fr]">
          <section className="min-w-0">
            <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-brand-orange md:text-base">Customer activity</p>
                <h2 className="mt-1 font-display text-3xl font-bold uppercase tracking-[-0.02em] md:text-4xl">Recent orders</h2>
              </div>
              <div className="flex rounded-xl bg-white p-1 shadow-sm">
                {(['all', 'active', 'completed'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setOrderFilter(filter)}
                    className={`rounded-lg px-3 py-2 text-xs font-extrabold uppercase tracking-[0.08em] transition ${orderFilter === filter ? 'bg-brand-green text-white' : 'text-gray-400 hover:text-gray-700'}`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {visibleOrders.map((order) => (
                <article key={order.code} className="grid gap-4 rounded-2xl border border-brand-ash-dark bg-white p-4 shadow-sm sm:grid-cols-[64px_1fr_auto] sm:items-center">
                  <img src={order.image} alt={order.product} className="h-16 w-full rounded-xl object-cover sm:w-16" />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="truncate font-sans text-lg font-black tracking-tight">{order.product}</h3>
                      <span className={`rounded-full px-2.5 py-1 text-xs font-extrabold uppercase tracking-wide ${statusStyle(order.status)}`}>{order.status}</span>
                    </div>
                    <p className="mt-1 text-sm font-bold text-gray-500">{order.customer} · {order.quantity}</p>
                    <p className="mt-1 text-sm font-semibold text-gray-400">{order.code} · {order.placedAt}</p>
                  </div>
                  <p className="font-sans text-xl font-black tracking-tight text-brand-green">₦{order.total.toLocaleString()}</p>
                </article>
              ))}
            </div>
          </section>

          <aside>
            <div className="mb-5">
              <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-brand-orange md:text-base">Performance</p>
              <h2 className="mt-1 font-display text-3xl font-bold uppercase tracking-[-0.02em] md:text-4xl">Sales summary</h2>
            </div>
            <div className="rounded-3xl border border-brand-ash-dark bg-white p-6 shadow-sm">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm font-extrabold uppercase tracking-[0.1em] text-gray-400">Last 7 days</p>
                  <p className="mt-1 font-display text-4xl font-bold tracking-tight text-brand-green">₦184,200</p>
                </div>
                <p className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-brand-green">+18.4%</p>
              </div>
              <div className="mt-7 flex h-32 items-end gap-2" aria-label="Seven day sales chart">
                {[42, 67, 50, 83, 62, 95, 78].map((height, index) => (
                  <div key={index} className="flex flex-1 flex-col items-center gap-2">
                    <div className="w-full rounded-t-md bg-brand-green/20" style={{ height: `${height}%`, backgroundColor: index === 5 ? '#E8650A' : undefined }} />
                    <span className="text-[10px] font-semibold text-gray-400">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 border-t border-brand-ash-dark pt-5">
                <div className="flex justify-between text-sm"><span className="text-gray-500">Your earnings</span><span className="font-black text-brand-green">85%</span></div>
                <div className="mt-3 flex justify-between text-sm"><span className="text-gray-500">Platform fee</span><span className="font-black text-brand-orange">15%</span></div>
              </div>
            </div>
          </aside>
        </div>

        <section className="mt-10">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-brand-orange md:text-base">Your catalogue</p>
              <h2 className="mt-1 font-display text-3xl font-bold uppercase tracking-[-0.02em] md:text-4xl">Products in your shop</h2>
            </div>
            <p className="hidden text-sm font-bold text-brand-green sm:block">{inventory.length} active products</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {inventory.map((item) => (
              <article key={item.id} className="overflow-hidden rounded-2xl border border-brand-ash-dark bg-white shadow-sm">
                <div className="relative">
                  <img src={item.image} alt={item.name} className="h-40 w-full object-cover" />
                  <span className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-extrabold uppercase tracking-wide shadow-sm ${item.availability === 'Low stock' ? 'bg-orange-50 text-brand-orange' : 'bg-white text-brand-green'}`}>
                    {item.availability}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-sans text-xl font-black tracking-tight">{item.name}</h3>
                  <p className="mt-1 text-base font-extrabold text-brand-green">{item.unit}</p>
                  <div className="mt-4 grid grid-cols-2 gap-2 border-t border-brand-ash-dark pt-4">
                    <div><p className="text-xs font-extrabold uppercase tracking-wide text-gray-400">In stock</p><p className="mt-0.5 text-lg font-black">{item.stock}</p></div>
                    <div><p className="text-xs font-extrabold uppercase tracking-wide text-gray-400">Sold</p><p className="mt-0.5 text-lg font-black">{item.sold}</p></div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
