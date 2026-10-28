import { useState } from 'react'
import BrandLogo from './BrandLogo'

// ── Data ──────────────────────────────────────────────────────────────────────

const categories = [
  { id: 'all',        label: 'All',          emoji: '🛒' },
  { id: 'vegetables', label: 'Vegetables',   emoji: '🥦' },
  { id: 'fruits',     label: 'Fruits',       emoji: '🍊' },
  { id: 'grains',     label: 'Grains & Bulk',emoji: '🌾' },
  { id: 'dairy',      label: 'Dairy',        emoji: '🥛' },
  { id: 'beverages',  label: 'Beverages',    emoji: '🧃' },
  { id: 'snacks',     label: 'Snacks',       emoji: '🍪' },
  { id: 'frozen',     label: 'Frozen',       emoji: '❄️' },
  { id: 'spices',     label: 'Spices',       emoji: '🌶️' },
  { id: 'bakery',     label: 'Bakery',       emoji: '🍞' },
]

const shopCategories = [
  { label: 'Fresh Vegetables', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=85', color: '#E8F5E9', count: '240+ items' },
  { label: 'Fruits & Berries', image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=800&q=85', color: '#FFF3E0', count: '180+ items' },
  { label: 'Grains & Bulk', image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=800&q=85', color: '#F3E5F5', count: '95+ items' },
  { label: 'Dairy & Eggs', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=85', color: '#E3F2FD', count: '120+ items' },
  { label: 'Beverages', image: 'https://images.unsplash.com/photo-1506617420156-8e4536971650?auto=format&fit=crop&w=800&q=85', color: '#E0F7FA', count: '210+ items' },
  { label: 'Bakery & Bread', image: 'https://images.unsplash.com/photo-1598373182308-3270495d2f58?auto=format&fit=crop&w=800&q=85', color: '#FFF8E1', count: '80+ items' },
]

const vendors = [
  { name: 'FarmFresh Lagos', tag: 'Organic · Vegetables', rating: 4.9, reviews: 1240, time: '20–35 min', image: 'https://images.unsplash.com/photo-1691039030112-3294ecb3181e?auto=format&fit=crop&w=900&q=85', location: 'Lagos, NG', badge: 'Top Rated' },
  { name: 'GrainHub Nigeria', tag: 'Bulk · Grains · Rice', rating: 4.7, reviews: 880, time: '1–2 hrs', image: 'https://images.unsplash.com/photo-1615884764168-3b5d41db1f9f?auto=format&fit=crop&w=900&q=85', location: 'Abuja, NG', badge: 'Bulk Pro' },
  { name: 'OrganicBox Kenya', tag: 'Organic · Multi-category', rating: 4.8, reviews: 620, time: '2–4 hrs', image: 'https://images.unsplash.com/photo-1715443973196-be53e622f90b?auto=format&fit=crop&w=900&q=85', location: 'Nairobi, KE', badge: 'Global' },
  { name: 'BulkMart Ghana', tag: 'Wholesale · Dry goods', rating: 4.6, reviews: 390, time: '3–5 hrs', image: 'https://images.unsplash.com/photo-1585540083814-ea6ee8af9e4f?auto=format&fit=crop&w=900&q=85', location: 'Accra, GH', badge: null },
  { name: 'SpiceTrail India', tag: 'Spices · Condiments', rating: 4.9, reviews: 2100, time: '5–7 days', image: 'https://images.unsplash.com/photo-1565958923272-e96dbb1e8414?auto=format&fit=crop&w=900&q=85', location: 'Mumbai, IN', badge: 'Global' },
]

export type Product = {
  id: number
  name: string
  vendor: string
  unit: string
  bulk: string
  image: string
  category: string
  badge: string | null
  bulkSave: number
  description: string
}

export const products: Product[] = [
  { id: 1, name: 'Tomatoes (Roma)', vendor: 'FarmFresh Lagos', unit: '₦850 / kg', bulk: '₦7,200 / 10kg', image: 'https://images.unsplash.com/photo-1734255026082-82fdc81991f0?auto=format&fit=crop&w=1200&q=85', category: 'vegetables', badge: 'Fresh Today', bulkSave: 10, description: 'Firm, juicy Roma tomatoes harvested today and carefully sorted for stews, sauces, and salads.' },
  { id: 2, name: 'Long Grain Rice', vendor: 'GrainHub Nigeria', unit: '₦2,100 / 2kg', bulk: '₦19,500 / 25kg', image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=1200&q=85', category: 'grains', badge: 'Bulk Deal', bulkSave: 10, description: 'Clean, premium long grain rice with fluffy grains and dependable quality for homes and restaurants.' },
  { id: 3, name: 'Sweet Oranges', vendor: 'FarmFresh Lagos', unit: '₦1,200 / dozen', bulk: '₦9,800 / 10 doz', image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&w=1200&q=85', category: 'fruits', badge: 'Fresh Today', bulkSave: 10, description: 'Naturally sweet, vitamin-rich oranges selected for juiciness and delivered fresh from the farm.' },
  { id: 4, name: 'Palm Oil (Pure)', vendor: 'GrainHub Nigeria', unit: '₦3,500 / 5L', bulk: '₦28,000 / 50L', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1200&q=85', category: 'spices', badge: null, bulkSave: 10, description: 'Rich, pure cooking oil with a deep natural colour, sourced from trusted local producers.' },
  { id: 5, name: 'Full Cream Milk', vendor: 'OrganicBox Kenya', unit: '₦1,650 / 1L', bulk: '₦14,000 / 10L', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=1200&q=85', category: 'dairy', badge: null, bulkSave: 10, description: 'Smooth full cream milk for drinking, baking, cereals, and everyday family nutrition.' },
  { id: 6, name: 'Scotch Bonnet Pepper', vendor: 'FarmFresh Lagos', unit: '₦600 / 250g', bulk: '₦4,200 / 2kg', image: 'https://images.unsplash.com/photo-1565958923272-e96dbb1e8414?auto=format&fit=crop&w=1200&q=85', category: 'spices', badge: 'Hot Pick', bulkSave: 10, description: 'Aromatic, fiery peppers for authentic soups, stews, marinades, and pepper sauces.' },
  { id: 7, name: 'Plantain (Ripe)', vendor: 'FarmFresh Lagos', unit: '₦950 / bunch', bulk: '₦7,800 / 10 bunches', image: 'https://images.unsplash.com/photo-1765584830103-7cfc6d132a20?auto=format&fit=crop&w=1200&q=85', category: 'fruits', badge: 'Fresh Today', bulkSave: 10, description: 'Ripe, naturally sweet plantains selected at the ideal stage for frying, roasting, or boiling.' },
  { id: 8, name: 'Agege Bread Loaf', vendor: 'BulkMart Ghana', unit: '₦800 / loaf', bulk: '₦6,500 / 10 loaves', image: 'https://images.unsplash.com/photo-1598373182308-3270495d2f58?auto=format&fit=crop&w=1200&q=85', category: 'bakery', badge: 'Best Seller', bulkSave: 10, description: 'Soft, satisfying bakery-fresh bread with the familiar texture and flavour customers love.' },
]

const testimonials = [
  { name: 'Ada Okafor',   location: 'Lagos, NG',   rating: 5, text: 'Best bulk rice prices anywhere online. Order arrived next morning, absolutely fresh. Will never shop elsewhere.', avatar: 'A' },
  { name: 'Kofi Mensah',  location: 'Accra, GH',   rating: 5, text: 'The vendor variety is incredible. Got premium spices from India in under a week. Total game changer for my restaurant.', avatar: 'K' },
  { name: 'Zainab Musa',  location: 'Abuja, NG',   rating: 5, text: 'My refund was processed in less than 24 hours with zero back-and-forth. That kind of service keeps me coming back every week.', avatar: 'Z' },
  { name: 'James Otieno', location: 'Nairobi, KE', rating: 5, text: 'Ordered 50kg of maize flour for my catering business. Saved 22% vs local wholesale market. The bulk pricing is genuinely unbeatable.', avatar: 'J' },
]

const recentReviews = [
  { product: 'Long Grain Rice', buyer: 'Emeka T.', rating: 5, date: 'Aug 8, 2025', text: 'Excellent quality grain, cooked perfectly. Bulk pack is great value for my family.' },
  { product: 'Sweet Oranges',   buyer: 'Amira S.', rating: 4, date: 'Aug 7, 2025', text: 'Very fresh on arrival. A couple were slightly small but overall fantastic for the price.' },
  { product: 'Palm Oil (Pure)', buyer: 'Chidi N.', rating: 5, date: 'Aug 6, 2025', text: 'Deep red, pure quality. No additives, exactly as described. Ordering a 50L next time.' },
]

const steps = [
  {
    n: '01', title: 'Browse & choose',
    body: 'Shop thousands of products from verified local and global vendors — in small packs or bulk orders.',
    icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M4 4h4l3 12h10l2-8H9" stroke="#1C4A2E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="22" r="1.5" fill="#1C4A2E"/><circle cx="19" cy="22" r="1.5" fill="#1C4A2E"/></svg>,
  },
  {
    n: '02', title: 'We pick & pack',
    body: 'Your order is prepared by the vendor and collected by a Solid Foundation rider or our in-house fleet.',
    icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="4" y="8" width="20" height="14" rx="2" stroke="#E8650A" strokeWidth="1.8"/><path d="M10 8V6a4 4 0 018 0v2" stroke="#E8650A" strokeWidth="1.8" strokeLinecap="round"/><path d="M10 14h8" stroke="#E8650A" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  },
  {
    n: '03', title: 'Fast delivery',
    body: 'Track your order live. Our riders deliver to your door — within the hour for local, or scheduled for bulk.',
    icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M3 14h14v6H3z" stroke="#1C4A2E" strokeWidth="1.8" strokeLinejoin="round"/><path d="M17 10l4 4v6h-4V10z" stroke="#1C4A2E" strokeWidth="1.8" strokeLinejoin="round"/><circle cx="7" cy="22" r="2" stroke="#1C4A2E" strokeWidth="1.8"/><circle cx="21" cy="22" r="2" stroke="#1C4A2E" strokeWidth="1.8"/></svg>,
  },
]

// ── Sub-components ─────────────────────────────────────────────────────────────

function StarRating({ rating, size = 10 }: { rating: number; size?: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <svg key={s} width={size} height={size} viewBox="0 0 10 10" fill={s <= rating ? '#E8650A' : '#D5D3CA'}>
          <path d="M5 1l1.12 2.27L9 3.64l-2 1.95.47 2.75L5 7l-2.47 1.34L3 5.59 1 3.64l2.88-.37z"/>
        </svg>
      ))}
    </span>
  )
}

function CartIcon({ count }: { count: number }) {
  return (
    <div className="relative">
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-label="Cart">
        <path d="M3 3h2l3 9h8l2-6H7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="17" r="1.2" fill="currentColor"/>
        <circle cx="15" cy="17" r="1.2" fill="currentColor"/>
      </svg>
      {count > 0 && (
        <span
          className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-white flex items-center justify-center"
          style={{ backgroundColor: '#E8650A', fontSize: '9px', fontWeight: 700 }}
        >
          {count}
        </span>
      )}
    </div>
  )
}

// Animated delivery cart strip
function AnimatedCartStrip() {
  const foodItems = ['🥦', '🍊', '🌾', '🥛', '🍞', '🥚', '🫐', '🥕']
  return (
    <div
      className="relative overflow-hidden rounded-2xl mt-4"
      style={{ height: '70px', backgroundColor: '#1C4A2E' }}
      aria-hidden="true"
    >
      {/* Scrolling road dashes */}
      <div className="absolute bottom-0 left-0 right-0 flex" style={{ height: '28px', alignItems: 'center' }}>
        <div
          style={{
            display: 'flex',
            gap: 0,
            animation: 'dashScroll 1.5s linear infinite',
            width: 'max-content',
          }}
        >
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              style={{ width: '40px', height: '2px', backgroundColor: i % 2 === 0 ? 'rgba(255,255,255,0.18)' : 'transparent', marginRight: '20px', flexShrink: 0 }}
            />
          ))}
        </div>
      </div>

      {/* Rolling cart */}
      <div
        style={{
          position: 'absolute',
          bottom: '18px',
          left: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          animation: 'cartSlide 9s linear infinite',
        }}
      >
        {/* Floating food items above cart */}
        <div style={{ display: 'flex', gap: '3px', marginBottom: '4px' }}>
          {foodItems.map((emoji, i) => (
            <span
              key={i}
              style={{
                fontSize: '13px',
                display: 'inline-block',
                animation: `itemFloat ${1.2 + (i % 4) * 0.25}s ease-in-out infinite`,
                animationDelay: `${i * 0.15}s`,
              }}
            >
              {emoji}
            </span>
          ))}
        </div>

        {/* Cart SVG with spinning wheels */}
        <svg viewBox="0 0 90 36" width="90" height="36">
          {/* Cart body */}
          <rect x="8" y="2" width="62" height="20" rx="4" fill="#E8650A"/>
          {/* Handle */}
          <path d="M8 10 L2 4" stroke="#F49349" strokeWidth="2.5" strokeLinecap="round"/>
          {/* Body highlight */}
          <rect x="12" y="5" width="52" height="4" rx="2" fill="rgba(255,255,255,0.15)"/>
          {/* Left wheel */}
          <g style={{ animation: 'wheelSpin 0.6s linear infinite', transformOrigin: '22px 30px' }}>
            <circle cx="22" cy="30" r="6" fill="#2D6A4F"/>
            <circle cx="22" cy="30" r="2.5" fill="#F4F3EE"/>
            <line x1="22" y1="24" x2="22" y2="36" stroke="#F4F3EE" strokeWidth="1"/>
            <line x1="16" y1="30" x2="28" y2="30" stroke="#F4F3EE" strokeWidth="1"/>
          </g>
          {/* Right wheel */}
          <g style={{ animation: 'wheelSpin 0.6s linear infinite', transformOrigin: '66px 30px' }}>
            <circle cx="66" cy="30" r="6" fill="#2D6A4F"/>
            <circle cx="66" cy="30" r="2.5" fill="#F4F3EE"/>
            <line x1="66" y1="24" x2="66" y2="36" stroke="#F4F3EE" strokeWidth="1"/>
            <line x1="60" y1="30" x2="72" y2="30" stroke="#F4F3EE" strokeWidth="1"/>
          </g>
          {/* Axle */}
          <line x1="22" y1="22" x2="66" y2="22" stroke="#1C4A2E" strokeWidth="2"/>
        </svg>
      </div>

      {/* Right text */}
      <div className="absolute right-5 top-1/2 -translate-y-1/2 text-right pointer-events-none">
        <div className="font-bold text-xs text-white" style={{ fontFamily: 'var(--font-display)' }}>Your order is on its way</div>
        <div className="text-xs" style={{ color: '#F49349' }}>Track live in the app →</div>
      </div>
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────────────────────────

type HomePageProps = {
  onLogout: () => void
  onSelectProduct: (product: Product) => void
  cartItems: Product[]
  onAddToCart: (product: Product) => void
  onOpenOrders: () => void
  onOpenSeller: () => void
}

export default function HomePage({ onLogout, onSelectProduct, cartItems, onAddToCart, onOpenOrders, onOpenSeller }: HomePageProps) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [added, setAdded] = useState<Set<number>>(new Set())
  const [searchFocused, setSearchFocused] = useState(false)
  const [bulkMode, setBulkMode] = useState(false)

  const addToCart = (product: Product) => {
    onAddToCart(product)
    setAdded((prev) => new Set(prev).add(product.id))
    setTimeout(() => setAdded((prev) => { const s = new Set(prev); s.delete(product.id); return s }), 1200)
  }

  const filtered = activeCategory === 'all' ? products : products.filter((p) => p.category === activeCategory)

  return (
    <div className="marketplace-page min-h-screen" style={{ backgroundColor: '#F4F3EE', fontFamily: 'var(--font-sans)' }}>

      {/* ── NAVBAR ──────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50 w-full border-b"
        style={{ backgroundColor: '#fff', borderColor: '#E8E6DE' }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center gap-4">
          <BrandLogo size="sm" className="flex-shrink-0" nameClassName="hidden sm:inline" />

          <button
            className="hidden md:flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border flex-shrink-0 hover:border-gray-400 transition-colors"
            style={{ borderColor: '#E8E6DE', color: '#555' }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1a3.5 3.5 0 013.5 3.5C9.5 7.5 6 11 6 11S2.5 7.5 2.5 4.5A3.5 3.5 0 016 1z" stroke="#E8650A" strokeWidth="1.2"/><circle cx="6" cy="4.5" r="1" fill="#E8650A"/></svg>
            Lagos, Nigeria
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M3 4l2 2 2-2" stroke="#999" strokeWidth="1.1" strokeLinecap="round"/></svg>
          </button>

          <div
            className="flex-1 flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all duration-200"
            style={{
              backgroundColor: searchFocused ? '#fff' : '#F4F3EE',
              borderColor: searchFocused ? '#1C4A2E' : '#E8E6DE',
              boxShadow: searchFocused ? '0 0 0 3px rgba(28,74,46,0.08)' : 'none',
            }}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0 }}>
              <circle cx="6.5" cy="6.5" r="4.5" stroke="#999" strokeWidth="1.3"/>
              <path d="M10 10l3 3" stroke="#999" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            <input
              type="search"
              placeholder="Search tomatoes, rice, bulk orders…"
              className="flex-1 text-sm bg-transparent outline-none"
              style={{ color: '#333', minWidth: 0 }}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={onOpenSeller}
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg transition-all active:scale-95"
              style={{ backgroundColor: '#1C4A2E', color: '#fff' }}
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 6h10v6H2zM1 6l1.5-4h9L13 6M5 12V8h4v4" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round"/></svg>
              Your Shop
            </button>
            <button onClick={onOpenOrders} className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-brand-ash hover:text-gray-900" aria-label="View basket and orders" title="View your orders">
              <CartIcon count={cartItems.length} />
            </button>
            <button
              onClick={onLogout}
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 hover:opacity-80 transition-opacity"
              style={{ backgroundColor: '#1C4A2E', fontFamily: 'var(--font-display)' }}
              title="Sign out"
            >
              U
            </button>
          </div>
        </div>

        {/* Category bar */}
        <div className="border-t overflow-x-auto" style={{ borderColor: '#F0EEE8' }}>
          <div className="flex gap-1 px-4 md:px-6 py-2.5" style={{ width: 'max-content' }}>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all duration-150"
                style={{
                  backgroundColor: activeCategory === c.id ? '#1C4A2E' : 'transparent',
                  color: activeCategory === c.id ? '#fff' : '#555',
                  border: activeCategory === c.id ? '1.5px solid #1C4A2E' : '1.5px solid #E8E6DE',
                }}
              >
                <span>{c.emoji}</span> {c.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 pb-20">

        {/* ── HERO ─────────────────────────────────────────────── */}
        <section
          className="mt-6 rounded-2xl overflow-hidden relative"
          style={{ background: 'linear-gradient(135deg, #1C4A2E 0%, #2D6A4F 60%, #1B5E20 100%)', minHeight: '340px' }}
        >
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

          <div className="relative z-10 flex flex-col lg:flex-row items-center h-full min-h-[340px]">
            <div className="flex-1 px-8 md:px-12 py-10">
              <div
                className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-5"
                style={{ backgroundColor: 'rgba(232,101,10,0.2)', color: '#F49349', border: '1px solid rgba(232,101,10,0.3)' }}
              >
                🚀 Free delivery on orders above ₦100,000
              </div>

              <h1
                className="text-white font-extrabold leading-[1.1] mb-4"
                style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}
              >
                Fresh food &<br />
                <span style={{ color: '#F49349' }}>groceries</span> delivered<br />
                to your door.
              </h1>

              <p className="mb-7 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', maxWidth: '380px' }}>
                Shop in small packs or massive bulk orders — from vendors across Nigeria, Kenya, Ghana, and beyond.
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  className="flex items-center gap-2 text-sm font-bold px-5 py-3 rounded-xl transition-all active:scale-95"
                  style={{ backgroundColor: '#E8650A', color: '#fff' }}
                >
                  Shop Now
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button
                  className="flex items-center gap-2 text-sm font-semibold px-5 py-3 rounded-xl transition-all active:scale-95"
                  style={{ backgroundColor: 'rgba(255,255,255,0.12)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.2)' }}
                >
                  🌍 View Global Vendors
                </button>
              </div>

              <div className="flex gap-6 mt-8">
                {[['12k+','Products'],['800+','Vendors'],['50+','Cities']].map(([val, lbl]) => (
                  <div key={lbl}>
                    <div className="text-white font-bold text-lg" style={{ fontFamily: 'var(--font-display)' }}>{val}</div>
                    <div className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{lbl}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:flex gap-3 pr-10 py-8 flex-shrink-0">
              <div className="flex flex-col gap-3">
                <div className="w-36 h-44 rounded-2xl overflow-hidden" style={{ backgroundColor: '#2D6A4F' }}>
                  <img src="https://images.unsplash.com/photo-1540420616600-8f777f4c7d1a?w=300&h=360&fit=crop&auto=format" alt="Fresh vegetables" className="w-full h-full object-cover opacity-90"/>
                </div>
                <div className="w-36 h-28 rounded-2xl overflow-hidden" style={{ backgroundColor: '#2D6A4F' }}>
                  <img src="https://images.unsplash.com/photo-1571748832978-a8dd66b4d59e?w=300&h=220&fit=crop&auto=format" alt="Plantains" className="w-full h-full object-cover opacity-90"/>
                </div>
              </div>
              <div className="flex flex-col gap-3 mt-8">
                <div className="w-36 h-28 rounded-2xl overflow-hidden" style={{ backgroundColor: '#2D6A4F' }}>
                  <img src="https://images.unsplash.com/photo-1582979512340-980b9e0f86d3?w=300&h=220&fit=crop&auto=format" alt="Oranges" className="w-full h-full object-cover opacity-90"/>
                </div>
                <div className="w-36 h-44 rounded-2xl overflow-hidden" style={{ backgroundColor: '#2D6A4F' }}>
                  <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=360&fit=crop&auto=format" alt="Bread" className="w-full h-full object-cover opacity-90"/>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── ANIMATED CART STRIP ─────────────────────────────── */}
        <AnimatedCartStrip />

        {/* ── PROMO STRIP ─────────────────────────────────────── */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { icon: '🚚', text: 'Free delivery',     sub: 'On orders above ₦100,000',   bg: '#E8F5E9', border: '#C8E6C9', color: '#2E7D32' },
            { icon: '📦', text: '10% bulk savings',  sub: 'On every bulk order placed',  bg: '#FFF3E0', border: '#FFE0B2', color: '#E65100' },
            { icon: '↩️', text: 'Easy refunds',       sub: 'Processed within 24 hours',  bg: '#EDE7F6', border: '#D1C4E9', color: '#4527A0' },
          ].map(({ icon, text, sub, bg, border, color }) => (
            <div key={text} className="flex items-center gap-3 px-4 py-3 rounded-xl border" style={{ backgroundColor: bg, borderColor: border }}>
              <span className="text-xl">{icon}</span>
              <div>
                <div className="text-sm font-bold" style={{ color }}>{text}</div>
                <div className="text-xs" style={{ color: '#777' }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── SHOP BY CATEGORY ────────────────────────────────── */}
        <section className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-extrabold text-xl" style={{ fontFamily: 'var(--font-display)', color: '#111', letterSpacing: '-0.02em' }}>Shop by Category</h2>
            <button className="text-sm font-semibold hover:underline" style={{ color: '#1C4A2E' }}>View all →</button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {shopCategories.map(({ label, image, color, count }) => (
              <button
                key={label}
                className="group relative rounded-2xl overflow-hidden text-left transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
                style={{ backgroundColor: color, height: '140px' }}
              >
                <img
                  src={image}
                  alt={label}
                  className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-60 transition-opacity"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)' }} />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="text-white font-bold text-xs leading-tight">{label}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.65)' }}>{count}</div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* ── FEATURED VENDORS ────────────────────────────────── */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-extrabold text-xl" style={{ fontFamily: 'var(--font-display)', color: '#111', letterSpacing: '-0.02em' }}>Top Vendors</h2>
            <button className="text-sm font-semibold hover:underline" style={{ color: '#1C4A2E' }}>See all vendors →</button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
            {vendors.map((v) => (
              <div
                key={v.name}
                className="flex-shrink-0 w-64 rounded-2xl overflow-hidden border hover:shadow-md transition-shadow cursor-pointer"
                style={{ backgroundColor: '#fff', borderColor: '#E8E6DE' }}
              >
                <div className="relative h-32" style={{ backgroundColor: '#2D6A4F' }}>
                  <img
                    src={v.image}
                    alt={v.name}
                    className="w-full h-full object-cover opacity-75"
                  />
                  {v.badge && (
                    <span
                      className="absolute top-2.5 left-2.5 text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: v.badge === 'Top Rated' ? '#E8650A' : v.badge === 'Global' ? '#1C4A2E' : '#7B1FA2', color: '#fff' }}
                    >
                      {v.badge}
                    </span>
                  )}
                  <div className="absolute bottom-2.5 left-2.5 w-10 h-10 rounded-xl border-2 border-white flex items-center justify-center text-white text-sm font-black" style={{ backgroundColor: '#1C4A2E', fontFamily: 'var(--font-display)' }}>
                    {v.name[0]}
                  </div>
                </div>
                <div className="p-3.5">
                  <div className="font-bold text-sm mb-0.5" style={{ color: '#111' }}>{v.name}</div>
                  <div className="text-xs mb-2" style={{ color: '#888' }}>{v.tag}</div>
                  <div className="flex items-center gap-1.5 text-xs">
                    <StarRating rating={v.rating} />
                    <span className="font-semibold" style={{ color: '#444' }}>{v.rating}</span>
                    <span style={{ color: '#bbb' }}>({v.reviews.toLocaleString()})</span>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-xs" style={{ color: '#666' }}>
                    <span>📍 {v.location}</span>
                    <span>⏱ {v.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PRODUCTS GRID ───────────────────────────────────── */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <h2 className="font-extrabold text-xl" style={{ fontFamily: 'var(--font-display)', color: '#111', letterSpacing: '-0.02em' }}>
              {activeCategory === 'all' ? "Today's Picks" : categories.find(c => c.id === activeCategory)?.label}
            </h2>
            <div className="flex items-center gap-1 p-1 rounded-xl" style={{ backgroundColor: '#E8E6DE' }}>
              {[false, true].map((bulk) => (
                <button
                  key={String(bulk)}
                  onClick={() => setBulkMode(bulk)}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
                  style={{ backgroundColor: bulkMode === bulk ? '#1C4A2E' : 'transparent', color: bulkMode === bulk ? '#fff' : '#666' }}
                >
                  {bulk ? '📦 Bulk pricing' : '🛒 Unit pricing'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((p) => (
              <div
                key={p.id}
                role="button"
                tabIndex={0}
                onClick={() => onSelectProduct(p)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') onSelectProduct(p)
                }}
                className="rounded-2xl overflow-hidden border transition-all hover:shadow-lg hover:-translate-y-0.5 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-green"
                style={{ backgroundColor: '#fff', borderColor: '#E8E6DE' }}
              >
                <div className="relative h-44 sm:h-48" style={{ backgroundColor: '#F4F3EE' }}>
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {p.badge && (
                    <span
                      className="absolute top-2.5 left-2.5 text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: p.badge === 'Fresh Today' ? '#1C4A2E' : p.badge === 'Best Seller' ? '#E8650A' : '#7B1FA2', color: '#fff' }}
                    >
                      {p.badge}
                    </span>
                  )}
                  {bulkMode && (
                    <span className="absolute top-2.5 right-2.5 text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: '#FFF3E0', color: '#E65100', border: '1px solid #FFE0B2' }}>
                      Save {p.bulkSave}%
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <div className="text-xs mb-0.5" style={{ color: '#999' }}>{p.vendor}</div>
                  <div className="font-bold text-sm mb-2 leading-snug" style={{ color: '#111' }}>{p.name}</div>
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="font-bold text-sm" style={{ color: '#1C4A2E' }}>{bulkMode ? p.bulk : p.unit}</div>
                      <div className="text-xs" style={{ color: '#AAA' }}>{bulkMode ? `unit: ${p.unit}` : `bulk: ${p.bulk}`}</div>
                    </div>
                    <button
                      onClick={(event) => {
                        event.stopPropagation()
                        addToCart(p)
                      }}
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-all active:scale-90 flex-shrink-0"
                      style={{ backgroundColor: added.has(p.id) ? '#E8F5E9' : '#1C4A2E', color: added.has(p.id) ? '#2E7D32' : '#fff' }}
                      aria-label={`Add ${p.name} to cart`}
                    >
                      {added.has(p.id)
                        ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3 3 7-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        : <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
                      }
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── BULK ORDER BANNER ───────────────────────────────── */}
        <section
          className="mt-12 rounded-2xl px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden"
          style={{ background: 'linear-gradient(120deg, #E8650A 0%, #F49349 100%)' }}
        >
          <div className="absolute right-0 top-0 bottom-0 w-64 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0px, #fff 2px, transparent 2px, transparent 16px)' }} />
          <div className="relative z-10">
            <div className="text-white font-extrabold text-xl mb-1" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>📦 Ordering for your business?</div>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>Dedicated bulk pricing, account managers, and scheduled deliveries.</p>
          </div>
          <button className="relative z-10 flex-shrink-0 text-sm font-bold px-6 py-3 rounded-xl transition-all active:scale-95 whitespace-nowrap" style={{ backgroundColor: '#fff', color: '#E8650A' }}>
            Enquire about bulk orders →
          </button>
        </section>

        {/* ── HOW IT WORKS ────────────────────────────────────── */}
        <section className="mt-14">
          <div className="text-center mb-8">
            <h2 className="font-extrabold text-xl mb-2" style={{ fontFamily: 'var(--font-display)', color: '#111', letterSpacing: '-0.02em' }}>How it works</h2>
            <p className="text-sm" style={{ color: '#888' }}>From browsing to doorstep in three steps.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {steps.map((s) => (
              <div key={s.n} className="rounded-2xl p-6 border" style={{ backgroundColor: '#fff', borderColor: '#E8E6DE' }}>
                <div className="font-black mb-4" style={{ color: '#E8E6DE', fontFamily: 'var(--font-display)', fontSize: '2.5rem', lineHeight: 1 }}>{s.n}</div>
                <div className="mb-3">{s.icon}</div>
                <div className="font-bold text-sm mb-1.5" style={{ color: '#111' }}>{s.title}</div>
                <p className="text-xs leading-relaxed" style={{ color: '#888' }}>{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── TESTIMONIALS ────────────────────────────────────── */}
        <section className="mt-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-extrabold text-xl" style={{ fontFamily: 'var(--font-display)', color: '#111', letterSpacing: '-0.02em' }}>What customers say</h2>
              <p className="text-sm mt-0.5" style={{ color: '#888' }}>Real reviews from verified buyers across Africa.</p>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <div className="flex">
                {['A','K','Z','J'].map((l, i) => (
                  <div key={l} className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: ['#1C4A2E','#E8650A','#7B1FA2','#0288D1'][i], marginLeft: i > 0 ? '-8px' : 0 }}>{l}</div>
                ))}
              </div>
              <span className="text-xs font-semibold" style={{ color: '#1C4A2E' }}>4,800+ reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-2xl p-5 border flex flex-col" style={{ backgroundColor: '#fff', borderColor: '#E8E6DE' }}>
                <StarRating rating={t.rating} size={12} />
                <p className="text-sm leading-relaxed mt-3 flex-1" style={{ color: '#333' }}>"{t.text}"</p>
                <div className="flex items-center gap-2.5 mt-4 pt-4 border-t" style={{ borderColor: '#F0EEE8' }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ backgroundColor: '#1C4A2E', fontFamily: 'var(--font-display)' }}>{t.avatar}</div>
                  <div>
                    <div className="text-xs font-bold" style={{ color: '#111' }}>{t.name}</div>
                    <div className="text-xs" style={{ color: '#AAA' }}>{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── RECENT PRODUCT REVIEWS ──────────────────────────── */}
        <section className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-extrabold text-lg" style={{ fontFamily: 'var(--font-display)', color: '#111', letterSpacing: '-0.02em' }}>Recent Item Reviews</h2>
            <button className="text-sm font-semibold hover:underline" style={{ color: '#1C4A2E' }}>View all reviews →</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {recentReviews.map((r) => (
              <div key={r.product} className="rounded-2xl p-5 border" style={{ backgroundColor: '#fff', borderColor: '#E8E6DE' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: '#E8F5E9', color: '#1C4A2E' }}>{r.product}</span>
                  <StarRating rating={r.rating} />
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#444' }}>"{r.text}"</p>
                <div className="flex items-center justify-between mt-3 text-xs" style={{ color: '#AAA' }}>
                  <span className="font-medium" style={{ color: '#666' }}>{r.buyer}</span>
                  <span>{r.date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── REFUND POLICY STRIP ─────────────────────────────── */}
        <div
          className="mt-8 rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-center gap-4"
          style={{ backgroundColor: '#EDE7F6', border: '1px solid #D1C4E9' }}
        >
          <div className="text-3xl flex-shrink-0">↩️</div>
          <div className="flex-1 text-center sm:text-left">
            <div className="font-bold text-sm mb-0.5" style={{ color: '#4527A0' }}>Our Refund & Return Guarantee</div>
            <div className="text-xs" style={{ color: '#7E57C2' }}>
              Not happy with your order? We process full refunds within 24 hours — no questions asked. Returns accepted within 48 hours of delivery.
            </div>
          </div>
          <button className="text-xs font-bold px-4 py-2 rounded-xl flex-shrink-0 transition-all active:scale-95" style={{ backgroundColor: '#7B1FA2', color: '#fff' }}>
            Refund Policy →
          </button>
        </div>

        {/* ── RIDER / VENDOR CTA STRIP ────────────────────────── */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-2xl p-6 border flex items-center gap-4" style={{ backgroundColor: '#fff', borderColor: '#E8E6DE' }}>
            <div className="text-3xl flex-shrink-0">🛵</div>
            <div className="flex-1">
              <div className="font-bold text-sm mb-0.5" style={{ color: '#111' }}>Deliver with us</div>
              <div className="text-xs" style={{ color: '#888' }}>Register as a rider and earn on your schedule.</div>
            </div>
            <button className="text-xs font-bold px-4 py-2 rounded-xl flex-shrink-0 transition-all active:scale-95" style={{ backgroundColor: '#1C4A2E', color: '#fff' }}>
              Join →
            </button>
          </div>
          <div className="rounded-2xl p-6 border flex items-center gap-4" style={{ backgroundColor: '#fff', borderColor: '#E8E6DE' }}>
            <div className="text-3xl flex-shrink-0">🏪</div>
            <div className="flex-1">
              <div className="font-bold text-sm mb-0.5" style={{ color: '#111' }}>Open your store</div>
              <div className="text-xs" style={{ color: '#888' }}>Sell to customers across Africa and beyond.</div>
            </div>
            <button onClick={onOpenSeller} className="text-xs font-bold px-4 py-2 rounded-xl flex-shrink-0 transition-all active:scale-95" style={{ backgroundColor: '#E8650A', color: '#fff' }}>
              Your shop →
            </button>
          </div>
        </div>
      </main>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <footer className="mt-16 border-t" style={{ backgroundColor: '#1C4A2E', borderColor: '#2D6A4F' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 grid grid-cols-2 sm:grid-cols-4 gap-8">
          <div className="col-span-2 sm:col-span-1">
            <BrandLogo tone="light" size="sm" className="mb-3" />
            <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>Fresh food and groceries, delivered fast. Bulk or bite-sized.</p>
          </div>
          {[
            { title: 'Shop',    links: ['Vegetables','Fruits','Grains & Bulk','Dairy','Beverages','Bakery'] },
            { title: 'Company', links: ['About us','Careers','Press','Blog','Customer Service'] },
            { title: 'Partners',links: ['Become a Vendor','Rider Registration','Bulk Orders','Affiliate Program'] },
          ].map(({ title, links }) => (
            <div key={title}>
              <div className="text-xs font-bold mb-3 uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.4)' }}>{title}</div>
              <ul className="space-y-2">
                {links.map((l) => <li key={l}><a href="#" className="text-xs hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.6)' }}>{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t px-4 md:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2" style={{ borderColor: '#2D6A4F' }}>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>© 2025 The Solid Foundation. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
