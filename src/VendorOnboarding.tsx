import { useState } from 'react'
import BrandLogo from './BrandLogo'

const PLATFORM_CUT = 15
const VENDOR_CUT = 100 - PLATFORM_CUT

const categoryOptions = [
  { id: 'vegetables', label: 'Vegetables', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=700&q=85' },
  { id: 'fruits', label: 'Fruits', image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=700&q=85' },
  { id: 'grains', label: 'Grains & Bulk', image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=700&q=85' },
  { id: 'dairy', label: 'Dairy & Eggs', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=700&q=85' },
  { id: 'beverages', label: 'Beverages', image: 'https://images.unsplash.com/photo-1506617420156-8e4536971650?auto=format&fit=crop&w=700&q=85' },
  { id: 'snacks', label: 'Snacks', image: 'https://images.unsplash.com/photo-1688217170693-e821c6e18d72?auto=format&fit=crop&w=700&q=85' },
  { id: 'frozen', label: 'Frozen Foods', image: 'https://images.unsplash.com/photo-1601599561213-832382fd07ba?auto=format&fit=crop&w=700&q=85' },
  { id: 'spices', label: 'Spices', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=700&q=85' },
  { id: 'bakery', label: 'Bakery', image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=700&q=85' },
  { id: 'other', label: 'Other Products', image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=700&q=85' },
]

const steps = ['What do you sell?', 'Commission breakdown', 'Launch your store']

export default function VendorOnboarding({ onFinish, onBack }: { onFinish: () => void; onBack: () => void }) {
  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [storeName, setStoreName] = useState('')
  const [location, setLocation] = useState('')
  const [revenue, setRevenue] = useState(50000)
  const [launched, setLaunched] = useState(false)

  const toggleCategory = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const earned = Math.round(revenue * (VENDOR_CUT / 100))
  const fee = revenue - earned

  const handleLaunch = () => {
    setLaunched(true)
    setTimeout(onFinish, 2200)
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F4F3EE', fontFamily: 'var(--font-sans)' }}>

      {/* Header */}
      <header className="sticky top-0 z-20 border-b bg-white" style={{ borderColor: '#E8E6DE' }}>
        <div className="max-w-3xl mx-auto px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="text-gray-400 hover:text-gray-700 transition-colors mr-1" aria-label="Back">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 4l-5 5 5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <BrandLogo size="sm" showName={false} />
            <span className="font-bold text-sm" style={{ fontFamily: 'var(--font-display)', color: '#1C4A2E' }}>Vendor Setup</span>
          </div>

          {/* Step progress */}
          <div className="hidden sm:flex items-center gap-2">
            {steps.map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                    style={{
                      backgroundColor: i < step ? '#1C4A2E' : i === step ? '#E8650A' : '#E8E6DE',
                      color: i <= step ? '#fff' : '#aaa',
                    }}
                  >
                    {i < step ? '✓' : i + 1}
                  </div>
                  <span className="text-xs" style={{ color: i === step ? '#111' : '#aaa' }}>{label}</span>
                </div>
                {i < steps.length - 1 && <div className="w-6 h-px" style={{ backgroundColor: '#E8E6DE' }} />}
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-5 py-10">

        {/* ── STEP 0: Category selection ─── */}
        {step === 0 && (
          <div style={{ animation: 'fadeSlideUp 0.35s ease both' }}>
            <div className="mb-8">
              <h1 className="font-extrabold text-2xl mb-2" style={{ fontFamily: 'var(--font-display)', color: '#111', letterSpacing: '-0.02em' }}>
                What will you sell? 🏪
              </h1>
              <p className="text-sm" style={{ color: '#777' }}>
                Choose the categories that best describe your products. You can always add more later.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              {categoryOptions.map((c) => {
                const active = selected.has(c.id)
                return (
                  <button
                    key={c.id}
                    onClick={() => toggleCategory(c.id)}
                    aria-pressed={active}
                    className="group relative min-h-44 overflow-hidden rounded-2xl border text-left transition-all hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98]"
                    style={{
                      borderColor: active ? '#1C4A2E' : '#E8E6DE',
                      boxShadow: active ? '0 0 0 2px #1C4A2E, 0 12px 28px rgba(28,74,46,0.18)' : '0 6px 18px rgba(31,42,35,0.08)',
                    }}
                  >
                    <img
                      src={c.image}
                      alt={`${c.label} products`}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/5" />
                    {active && (
                      <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm font-black shadow-md" style={{ color: '#1C4A2E' }}>
                        ✓
                      </span>
                    )}
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <div className="text-base font-extrabold leading-tight text-white sm:text-lg" style={{ fontFamily: 'var(--font-display)' }}>
                        {c.label}
                      </div>
                      <div className="mt-1 text-xs font-semibold text-white/75">
                        {active ? 'Selected' : 'Select category'}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm" style={{ color: '#999' }}>{selected.size} categor{selected.size === 1 ? 'y' : 'ies'} selected</span>
              <button
                onClick={() => setStep(1)}
                disabled={selected.size === 0}
                className="flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-xl transition-all active:scale-95 disabled:opacity-40"
                style={{ backgroundColor: '#1C4A2E', color: '#fff' }}
              >
                Continue
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 1: Commission breakdown ─── */}
        {step === 1 && (
          <div style={{ animation: 'fadeSlideUp 0.35s ease both' }}>
            <div className="mb-8">
              <h1 className="font-extrabold text-2xl mb-2" style={{ fontFamily: 'var(--font-display)', color: '#111', letterSpacing: '-0.02em' }}>
                How earnings work 💰
              </h1>
              <p className="text-sm" style={{ color: '#777' }}>
                We keep it transparent. For every sale you make, here's exactly how the split works.
              </p>
            </div>

            {/* Split visual */}
            <div className="rounded-2xl overflow-hidden border mb-6" style={{ borderColor: '#E8E6DE' }}>
              <div className="grid grid-cols-2">
                <div className="p-6" style={{ backgroundColor: '#1C4A2E' }}>
                  <div className="text-xs font-bold mb-1 uppercase tracking-wide" style={{ color: 'rgba(255,255,255,0.5)' }}>You keep</div>
                  <div className="font-extrabold" style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', color: '#fff', lineHeight: 1 }}>{VENDOR_CUT}%</div>
                  <div className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.65)' }}>of every sale, paid weekly</div>
                </div>
                <div className="p-6" style={{ backgroundColor: '#FFF3E0' }}>
                  <div className="text-xs font-bold mb-1 uppercase tracking-wide" style={{ color: '#E65100' }}>Platform fee</div>
                  <div className="font-extrabold" style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', color: '#E8650A', lineHeight: 1 }}>{PLATFORM_CUT}%</div>
                  <div className="text-sm mt-1" style={{ color: '#F49349' }}>covers delivery, platform & support</div>
                </div>
              </div>

              {/* Bar */}
              <div className="h-3 flex">
                <div style={{ width: `${VENDOR_CUT}%`, backgroundColor: '#1C4A2E' }} />
                <div style={{ width: `${PLATFORM_CUT}%`, backgroundColor: '#E8650A' }} />
              </div>
            </div>

            {/* Earnings calculator */}
            <div className="rounded-2xl p-6 border mb-6" style={{ backgroundColor: '#fff', borderColor: '#E8E6DE' }}>
              <div className="font-bold text-sm mb-4" style={{ color: '#111' }}>Earnings calculator</div>
              <div className="mb-2 flex items-center justify-between text-xs" style={{ color: '#666' }}>
                <span>Monthly sales estimate</span>
                <span className="font-bold" style={{ color: '#111' }}>₦{revenue.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={10000}
                max={2000000}
                step={10000}
                value={revenue}
                onChange={(e) => setRevenue(Number(e.target.value))}
                className="w-full mb-4"
                style={{ accentColor: '#1C4A2E' }}
              />
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl p-4" style={{ backgroundColor: '#E8F5E9' }}>
                  <div className="text-xs mb-1" style={{ color: '#2E7D32' }}>You receive</div>
                  <div className="font-extrabold text-lg" style={{ fontFamily: 'var(--font-display)', color: '#1C4A2E' }}>₦{earned.toLocaleString()}</div>
                </div>
                <div className="rounded-xl p-4" style={{ backgroundColor: '#FFF3E0' }}>
                  <div className="text-xs mb-1" style={{ color: '#E65100' }}>Platform fee</div>
                  <div className="font-extrabold text-lg" style={{ fontFamily: 'var(--font-display)', color: '#E8650A' }}>₦{fee.toLocaleString()}</div>
                </div>
              </div>
            </div>

            {/* What the fee covers */}
            <div className="rounded-2xl p-5 border mb-8" style={{ backgroundColor: '#F4F3EE', borderColor: '#E8E6DE' }}>
              <div className="text-xs font-bold mb-3 uppercase tracking-wide" style={{ color: '#888' }}>What the {PLATFORM_CUT}% covers</div>
              <div className="grid grid-cols-2 gap-2">
                {['🚚 Delivery logistics', '📞 Customer support', '🔒 Payment processing', '📣 Marketing & promotions', '⭐ Reviews & trust system', '📦 Packaging support'].map((item) => (
                  <div key={item} className="text-xs flex items-center gap-1.5" style={{ color: '#555' }}>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button onClick={() => setStep(0)} className="text-sm font-semibold hover:underline" style={{ color: '#888' }}>← Back</button>
              <button
                onClick={() => setStep(2)}
                className="flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-xl transition-all active:scale-95"
                style={{ backgroundColor: '#1C4A2E', color: '#fff' }}
              >
                Continue
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 2: Store setup ─── */}
        {step === 2 && !launched && (
          <div style={{ animation: 'fadeSlideUp 0.35s ease both' }}>
            <div className="mb-8">
              <h1 className="font-extrabold text-2xl mb-2" style={{ fontFamily: 'var(--font-display)', color: '#111', letterSpacing: '-0.02em' }}>
                Almost there! 🚀
              </h1>
              <p className="text-sm" style={{ color: '#777' }}>Give your store a name and tell us where you're based.</p>
            </div>

            {/* Selected categories recap */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[...selected].map((id) => {
                const cat = categoryOptions.find((c) => c.id === id)
                return cat ? (
                  <span key={id} className="text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: '#E8F5E9', color: '#1C4A2E', border: '1px solid #C8E6C9' }}>
                    {cat.label}
                  </span>
                ) : null
              })}
            </div>

            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: '#555' }}>Store name *</label>
                <input
                  type="text"
                  placeholder="e.g. Ada's FarmFresh"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
                  style={{
                    borderColor: storeName ? '#1C4A2E' : '#D5D3CA',
                    backgroundColor: '#fff',
                    color: '#111',
                    fontFamily: 'var(--font-sans)',
                    boxShadow: storeName ? '0 0 0 3px rgba(28,74,46,0.08)' : 'none',
                  }}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: '#555' }}>Your location / city *</label>
                <input
                  type="text"
                  placeholder="e.g. Lagos Island, Lagos"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
                  style={{
                    borderColor: location ? '#1C4A2E' : '#D5D3CA',
                    backgroundColor: '#fff',
                    color: '#111',
                    fontFamily: 'var(--font-sans)',
                    boxShadow: location ? '0 0 0 3px rgba(28,74,46,0.08)' : 'none',
                  }}
                />
              </div>
            </div>

            {/* Summary card */}
            <div className="rounded-2xl p-5 border mb-8" style={{ backgroundColor: '#fff', borderColor: '#E8E6DE' }}>
              <div className="text-xs font-bold mb-3 uppercase tracking-wide" style={{ color: '#aaa' }}>Your setup summary</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span style={{ color: '#888' }}>Store name</span><span className="font-semibold" style={{ color: '#111' }}>{storeName || '—'}</span></div>
                <div className="flex justify-between"><span style={{ color: '#888' }}>Location</span><span className="font-semibold" style={{ color: '#111' }}>{location || '—'}</span></div>
                <div className="flex justify-between"><span style={{ color: '#888' }}>Categories</span><span className="font-semibold" style={{ color: '#111' }}>{selected.size} selected</span></div>
                <div className="flex justify-between"><span style={{ color: '#888' }}>Your earnings</span><span className="font-bold" style={{ color: '#1C4A2E' }}>{VENDOR_CUT}% per sale</span></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button onClick={() => setStep(1)} className="text-sm font-semibold hover:underline" style={{ color: '#888' }}>← Back</button>
              <button
                onClick={handleLaunch}
                disabled={!storeName.trim() || !location.trim()}
                className="flex items-center gap-2 text-sm font-bold px-7 py-3 rounded-xl transition-all active:scale-95 disabled:opacity-40"
                style={{ backgroundColor: '#E8650A', color: '#fff' }}
              >
                Launch my store 🎉
              </button>
            </div>
          </div>
        )}

        {/* ── SUCCESS ─── */}
        {launched && (
          <div className="text-center py-16" style={{ animation: 'fadeSlideUp 0.4s ease both' }}>
            <div className="text-6xl mb-5">🎉</div>
            <h2 className="font-extrabold text-2xl mb-3" style={{ fontFamily: 'var(--font-display)', color: '#111', letterSpacing: '-0.02em' }}>
              Welcome aboard, vendor!
            </h2>
            <p className="text-sm mb-2" style={{ color: '#666' }}>
              <strong style={{ color: '#1C4A2E' }}>{storeName}</strong> is now live on The Solid Foundation.
            </p>
            <p className="text-sm" style={{ color: '#AAA' }}>Taking you to your dashboard…</p>
            <div className="mt-6 flex justify-center">
              <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: '#1C4A2E', borderTopColor: 'transparent' }} />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
