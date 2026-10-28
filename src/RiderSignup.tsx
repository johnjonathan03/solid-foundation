import { useState } from 'react'
import BrandLogo from './BrandLogo'

type Vehicle = 'motorcycle' | 'cycle' | 'truck' | null

const vehicles = [
  {
    id: 'motorcycle' as Vehicle,
    label: 'Motorcycle',
    emoji: '🏍️',
    desc: 'Fast urban deliveries. Best for city zones and express orders.',
    capacity: 'Up to 30kg',
    range: 'City-wide',
    earn: '₦8,000–₦22,000 / day',
  },
  {
    id: 'cycle' as Vehicle,
    label: 'Bicycle / Cycle',
    emoji: '🚲',
    desc: 'Eco-friendly deliveries for short distances and light loads.',
    capacity: 'Up to 15kg',
    range: '5km radius',
    earn: '₦4,000–₦9,000 / day',
  },
  {
    id: 'truck' as Vehicle,
    label: 'Truck',
    emoji: '🚚',
    desc: 'Bulk and large-scale deliveries. Ideal for business orders.',
    capacity: '500kg+',
    range: 'Inter-city',
    earn: '₦35,000–₦80,000 / day',
  },
]

const trackingSteps = [
  { label: 'Order Placed',    icon: '🛒', done: true,    active: false },
  { label: 'Vendor Packing',  icon: '📦', done: true,    active: false },
  { label: 'Rider Assigned',  icon: '🏍️', done: false,   active: true  },
  { label: 'En Route',        icon: '📍', done: false,   active: false },
  { label: 'Delivered',       icon: '✅', done: false,   active: false },
]

export default function RiderSignup({ onFinish, onBack }: { onFinish: () => void; onBack: () => void }) {
  const [step, setStep] = useState<'vehicle' | 'details' | 'tracking' | 'done'>('vehicle')
  const [vehicle, setVehicle] = useState<Vehicle>(null)
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [zone, setZone] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [trackActive, setTrackActive] = useState(2) // index of active tracking step

  const handleSubmit = () => {
    setSubmitted(true)
    setTimeout(() => setStep('tracking'), 600)
  }

  const simulateTracking = () => {
    if (trackActive < trackingSteps.length - 1) {
      setTrackActive((n) => n + 1)
    }
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F4F3EE', fontFamily: 'var(--font-sans)' }}>

      {/* Header */}
      <header className="sticky top-0 z-20 border-b bg-white" style={{ borderColor: '#E8E6DE' }}>
        <div className="max-w-3xl mx-auto px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="text-gray-400 hover:text-gray-700 transition-colors" aria-label="Back">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 4l-5 5 5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <BrandLogo size="sm" showName={false} className="ml-1" />
            <span className="font-bold text-sm" style={{ fontFamily: 'var(--font-display)', color: '#1C4A2E' }}>Rider Registration</span>
          </div>
          <div className="flex items-center gap-1.5">
            {(['vehicle','details','tracking'] as const).map((s, i) => (
              <div
                key={s}
                className="w-2 h-2 rounded-full transition-all"
                style={{ backgroundColor: step === s ? '#E8650A' : (i < (['vehicle','details','tracking'] as const).indexOf(step) ? '#1C4A2E' : '#D5D3CA') }}
              />
            ))}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-5 py-10">

        {/* ── STEP: Vehicle selection ── */}
        {step === 'vehicle' && (
          <div style={{ animation: 'fadeSlideUp 0.35s ease both' }}>
            <div className="mb-8">
              <h1 className="font-extrabold text-2xl mb-2" style={{ fontFamily: 'var(--font-display)', color: '#111', letterSpacing: '-0.02em' }}>
                What do you ride? 🛵
              </h1>
              <p className="text-sm" style={{ color: '#777' }}>
                Select your vehicle type. This determines your zone, load capacity, and daily earnings.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {vehicles.map((v) => {
                const active = vehicle === v.id
                return (
                  <button
                    key={v.id}
                    onClick={() => setVehicle(v.id)}
                    className="text-left rounded-2xl border p-5 transition-all hover:shadow-md active:scale-[0.98]"
                    style={{
                      backgroundColor: active ? '#E8F5E9' : '#fff',
                      borderColor: active ? '#1C4A2E' : '#E8E6DE',
                      boxShadow: active ? '0 0 0 2px #1C4A2E' : 'none',
                    }}
                  >
                    <div className="text-4xl mb-3">{v.emoji}</div>
                    <div className="font-bold text-base mb-1" style={{ color: active ? '#1C4A2E' : '#111', fontFamily: 'var(--font-display)' }}>{v.label}</div>
                    <p className="text-xs leading-relaxed mb-3" style={{ color: '#777' }}>{v.desc}</p>
                    <div className="space-y-1.5">
                      {[['Capacity', v.capacity], ['Range', v.range], ['Earnings', v.earn]].map(([key, val]) => (
                        <div key={key} className="flex items-center justify-between text-xs">
                          <span style={{ color: '#aaa' }}>{key}</span>
                          <span className="font-semibold" style={{ color: active ? '#1C4A2E' : '#444' }}>{val}</span>
                        </div>
                      ))}
                    </div>
                    {active && (
                      <div className="mt-3 text-xs font-bold text-center py-1 rounded-lg" style={{ backgroundColor: '#1C4A2E', color: '#fff' }}>
                        Selected ✓
                      </div>
                    )}
                  </button>
                )
              })}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setStep('details')}
                disabled={!vehicle}
                className="flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-xl transition-all active:scale-95 disabled:opacity-40"
                style={{ backgroundColor: '#1C4A2E', color: '#fff' }}
              >
                Continue
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>
        )}

        {/* ── STEP: Personal details ── */}
        {step === 'details' && (
          <div style={{ animation: 'fadeSlideUp 0.35s ease both' }}>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{vehicles.find(v => v.id === vehicle)?.emoji}</span>
                <div>
                  <h1 className="font-extrabold text-2xl" style={{ fontFamily: 'var(--font-display)', color: '#111', letterSpacing: '-0.02em' }}>
                    Your details
                  </h1>
                  <p className="text-xs" style={{ color: '#aaa' }}>Registering as a {vehicles.find(v => v.id === vehicle)?.label} rider</p>
                </div>
              </div>
              <p className="text-sm" style={{ color: '#777' }}>We need a few details to verify your identity and set up your rider profile.</p>
            </div>

            <div className="space-y-4 mb-8">
              {[
                { label: 'Full name', value: fullName, set: setFullName, placeholder: 'e.g. Tunde Adeyemi', type: 'text' },
                { label: 'Phone number', value: phone, set: setPhone, placeholder: 'e.g. 08012345678', type: 'tel' },
                { label: 'Delivery zone / area', value: zone, set: setZone, placeholder: 'e.g. Yaba, Lagos', type: 'text' },
              ].map(({ label, value, set, placeholder, type }) => (
                <div key={label}>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: '#555' }}>{label} *</label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => set(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
                    style={{
                      borderColor: value ? '#1C4A2E' : '#D5D3CA',
                      backgroundColor: '#fff',
                      color: '#111',
                      fontFamily: 'var(--font-sans)',
                      boxShadow: value ? '0 0 0 3px rgba(28,74,46,0.08)' : 'none',
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Earnings preview */}
            {vehicle && (
              <div className="rounded-2xl p-5 border mb-8" style={{ backgroundColor: '#E8F5E9', borderColor: '#C8E6C9' }}>
                <div className="text-xs font-bold mb-2 uppercase tracking-wide" style={{ color: '#2E7D32' }}>Your estimated earnings</div>
                <div className="font-extrabold text-xl" style={{ fontFamily: 'var(--font-display)', color: '#1C4A2E' }}>
                  {vehicles.find(v => v.id === vehicle)?.earn}
                </div>
                <div className="text-xs mt-1" style={{ color: '#52B788' }}>Based on {vehicle} deliveries in {zone || 'your zone'}</div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <button onClick={() => setStep('vehicle')} className="text-sm font-semibold hover:underline" style={{ color: '#888' }}>← Back</button>
              <button
                onClick={handleSubmit}
                disabled={!fullName.trim() || !phone.trim() || !zone.trim()}
                className="flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-xl transition-all active:scale-95 disabled:opacity-40"
                style={{ backgroundColor: '#1C4A2E', color: '#fff' }}
              >
                {submitted ? <span className="w-4 h-4 border-2 rounded-full animate-spin" style={{ borderColor: '#fff', borderTopColor: 'transparent' }} /> : null}
                Register as Rider
              </button>
            </div>
          </div>
        )}

        {/* ── STEP: Order tracking demo ── */}
        {step === 'tracking' && (
          <div style={{ animation: 'fadeSlideUp 0.35s ease both' }}>
            {/* Success banner */}
            <div className="rounded-2xl p-6 mb-8 text-center" style={{ backgroundColor: '#E8F5E9', border: '1px solid #C8E6C9' }}>
              <div className="text-4xl mb-2">🎉</div>
              <h2 className="font-extrabold text-xl mb-1" style={{ fontFamily: 'var(--font-display)', color: '#1C4A2E', letterSpacing: '-0.02em' }}>You're registered, {fullName.split(' ')[0]}!</h2>
              <p className="text-sm" style={{ color: '#52B788' }}>Your rider profile is live. Explore how order tracking works below.</p>
            </div>

            {/* Tracking demo */}
            <div className="mb-6">
              <h3 className="font-extrabold text-lg mb-1" style={{ fontFamily: 'var(--font-display)', color: '#111', letterSpacing: '-0.02em' }}>📍 Live Order Tracking</h3>
              <p className="text-sm mb-6" style={{ color: '#777' }}>As a rider, you'll see real-time order status updates. Here's a preview of how it looks.</p>

              {/* Tracking timeline */}
              <div className="rounded-2xl border overflow-hidden" style={{ backgroundColor: '#fff', borderColor: '#E8E6DE' }}>
                <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: '#F0EEE8' }}>
                  <div>
                    <div className="font-bold text-sm" style={{ color: '#111' }}>Order #TSF-00429</div>
                    <div className="text-xs" style={{ color: '#aaa' }}>FarmFresh Lagos → Yaba, Lagos</div>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: '#FFF3E0', color: '#E65100' }}>In progress</span>
                </div>

                <div className="px-5 py-6">
                  <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-4 top-5 bottom-5 w-0.5" style={{ backgroundColor: '#E8E6DE' }} />

                    <div className="space-y-5">
                      {trackingSteps.map((ts, i) => {
                        const isDone = i < trackActive
                        const isActive = i === trackActive
                        return (
                          <div key={ts.label} className="flex items-center gap-4 relative z-10">
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 transition-all duration-300"
                              style={{
                                backgroundColor: isDone ? '#1C4A2E' : isActive ? '#E8650A' : '#F4F3EE',
                                boxShadow: isActive ? '0 0 0 4px rgba(232,101,10,0.15)' : 'none',
                              }}
                            >
                              {isDone
                                ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3 3 7-6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                : <span style={{ fontSize: isActive ? '16px' : '14px' }}>{ts.icon}</span>
                              }
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-sm" style={{ color: isDone ? '#1C4A2E' : isActive ? '#E8650A' : '#aaa' }}>{ts.label}</div>
                              {isActive && (
                                <div className="text-xs mt-0.5" style={{ color: '#E8650A', animation: 'pulse-dot 1.5s ease-in-out infinite' }}>
                                  ● Live update
                                </div>
                              )}
                            </div>
                            {isDone && <span className="text-xs" style={{ color: '#52B788', fontWeight: 600 }}>Done</span>}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {trackActive < trackingSteps.length - 1 && (
                  <div className="px-5 pb-5">
                    <button
                      onClick={simulateTracking}
                      className="w-full py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95"
                      style={{ backgroundColor: '#F4F3EE', color: '#555', border: '1px solid #E8E6DE' }}
                    >
                      Simulate next step →
                    </button>
                  </div>
                )}

                {trackActive === trackingSteps.length - 1 && (
                  <div className="px-5 pb-5">
                    <div className="rounded-xl py-3 text-center text-sm font-bold" style={{ backgroundColor: '#E8F5E9', color: '#1C4A2E' }}>
                      🎉 Order delivered successfully!
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Map placeholder */}
            <div
              className="rounded-2xl overflow-hidden mb-8 flex items-center justify-center"
              style={{ height: '180px', backgroundColor: '#1C4A2E', position: 'relative' }}
            >
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              {/* Road lines */}
              <div className="absolute" style={{ top: '50%', left: 0, right: 0, height: '2px', backgroundColor: 'rgba(255,255,255,0.15)' }} />
              <div className="absolute" style={{ left: '50%', top: 0, bottom: 0, width: '2px', backgroundColor: 'rgba(255,255,255,0.08)' }} />
              {/* Animated rider dot */}
              <div
                className="absolute"
                style={{ top: 'calc(50% - 12px)', left: '30%', animation: 'cartSlide 6s linear infinite', width: '24px', height: '24px' }}
              >
                <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-xs" style={{ backgroundColor: '#E8650A', boxShadow: '0 0 12px rgba(232,101,10,0.5)' }}>
                  🏍️
                </div>
              </div>
              {/* Destination pin */}
              <div className="absolute right-12 flex flex-col items-center" style={{ top: '30%' }}>
                <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E8F5E9' }}>
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#1C4A2E' }} />
                </div>
                <div className="text-xs font-bold mt-1" style={{ color: '#fff' }}>You</div>
              </div>
              <div className="relative z-10 text-center">
                <div className="text-white font-bold text-sm mb-1" style={{ fontFamily: 'var(--font-display)' }}>Live Map Tracking</div>
                <div className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Real-time in the rider app</div>
              </div>
            </div>

            <button
              onClick={onFinish}
              className="w-full flex items-center justify-center gap-2 text-sm font-bold py-3.5 rounded-xl transition-all active:scale-95"
              style={{ backgroundColor: '#E8650A', color: '#fff' }}
            >
              Go to my rider dashboard →
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
