import { useState, useRef } from 'react'
import BrandLogo from './BrandLogo'

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="8" fill="rgba(255,255,255,0.15)"/>
      <path d="M5 8l2 2 4-4" stroke="#F49349" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

const features = [
  'Groceries in bulk or small packs',
  'Global vendors, local prices',
  'Same-day delivery across cities',
  'Fresh produce, every order',
]

export default function LoginPage({ onEnter }: { onEnter: (role: 'customer' | 'vendor' | 'rider') => void }) {
  const [activeTab, setActiveTab] = useState<'customer' | 'vendor' | 'rider'>('customer')
  const [loading, setLoading] = useState<'google' | 'apple' | 'email' | null>(null)
  const [emailOpen, setEmailOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const emailInputRef = useRef<HTMLInputElement>(null)

  const handleSignIn = (provider: 'google' | 'apple') => {
    setLoading(provider)
    setTimeout(() => { setLoading(null); onEnter(activeTab) }, 1400)
  }

  const handleEmailOpen = () => {
    setEmailOpen(true)
    setEmailSent(false)
    setEmailError('')
    setTimeout(() => emailInputRef.current?.focus(), 80)
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed) { setEmailError('Please enter your email address.'); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) { setEmailError('That doesn\'t look like a valid email.'); return }
    setEmailError('')
    setLoading('email')
    setTimeout(() => { setLoading(null); setEmailSent(true); setTimeout(() => onEnter(activeTab), 1200) }, 1400)
  }

  const tabLabel = {
    customer: { heading: 'Welcome back', sub: 'Sign in to order food, groceries, and more.' },
    vendor: { heading: 'Sell on our platform', sub: 'Join thousands of vendors reaching customers worldwide.' },
    rider: { heading: 'Deliver with us', sub: 'Register as a rider and earn on your own schedule.' },
  }

  return (
    <div
      className="min-h-screen w-full flex"
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      {/* ── LEFT PANEL ─────────────────────────────────────────── */}
      <div
        className="hidden lg:flex flex-col justify-between w-[52%] relative overflow-hidden"
        style={{ backgroundColor: '#1C4A2E' }}
      >
        {/* subtle texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* decorative arc bottom-right */}
        <div
          className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full opacity-10"
          style={{ backgroundColor: '#52B788' }}
        />
        <div
          className="absolute -bottom-8 -right-8 w-56 h-56 rounded-full opacity-10"
          style={{ backgroundColor: '#E8650A' }}
        />

        {/* top: logo */}
        <div className="relative z-10 px-12 pt-12">
          <div>
            <BrandLogo tone="light" size="lg" />
            <div className="mt-2 text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Fresh · Fast · Worldwide
            </div>
          </div>
        </div>

        {/* middle: hero copy */}
        <div className="relative z-10 px-12 py-16">
          <div
            className="text-white font-extrabold leading-[1.1] mb-5"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 3.2vw, 3rem)',
              letterSpacing: '-0.03em',
            }}
          >
            Food &amp; groceries,<br />
            <span style={{ color: '#F49349' }}>your way.</span>
          </div>
          <p
            className="text-base leading-relaxed mb-10"
            style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '340px' }}
          >
            Bulk orders for businesses, everyday packs for families — delivered fast from vendors near and far.
          </p>

          <ul className="space-y-3">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-3">
                <CheckIcon />
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* bottom: food photography strip */}
        <div className="relative z-10 px-12 pb-10">
          <div className="flex gap-3">
            {[
              { id: '1640777822', label: 'Fresh produce' },
              { id: '1565958951', label: 'Bulk grains' },
              { id: '1567620905', label: 'Delivery ready' },
            ].map(({ id, label }) => (
              <div key={id} className="relative flex-1 rounded-xl overflow-hidden" style={{ height: '88px', backgroundColor: '#2D6A4F' }}>
                <img
                  src={`https://images.unsplash.com/photo-${id}?w=200&h=90&fit=crop&auto=format`}
                  alt={label}
                  className="w-full h-full object-cover opacity-70"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(28,74,46,0.7) 0%, transparent 60%)' }}
                />
                <span
                  className="absolute bottom-2 left-2 text-xs font-medium"
                  style={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-sans)' }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ────────────────────────────────────────── */}
      <div
        className="flex-1 flex flex-col items-center justify-center px-6 py-12 min-h-screen"
        style={{ backgroundColor: '#F4F3EE' }}
      >
        {/* mobile logo */}
        <BrandLogo size="md" className="mb-10 lg:hidden" />

        <div className="w-full" style={{ maxWidth: '400px' }}>
          {/* role tabs */}
          <div
            className="flex rounded-xl p-1 mb-8"
            style={{ backgroundColor: '#E8E6DE' }}
          >
            {(['customer', 'vendor', 'rider'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="flex-1 py-2 rounded-lg text-xs font-semibold capitalize transition-all duration-200"
                style={{
                  backgroundColor: activeTab === tab ? '#1C4A2E' : 'transparent',
                  color: activeTab === tab ? '#fff' : '#5a5a5a',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                {tab === 'customer' ? 'Customer' : tab === 'vendor' ? 'Vendor' : 'Rider'}
              </button>
            ))}
          </div>

          {/* heading */}
          <div className="mb-8">
            <h1
              className="font-extrabold mb-1.5"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.75rem',
                color: '#111',
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
              }}
            >
              {tabLabel[activeTab].heading}
            </h1>
            <p className="text-sm" style={{ color: '#777' }}>
              {tabLabel[activeTab].sub}
            </p>
          </div>

          {/* sign-in buttons */}
          <div className="space-y-3">
            <button
              onClick={() => handleSignIn('google')}
              disabled={loading !== null}
              className="w-full flex items-center justify-center gap-3 py-3.5 px-5 rounded-xl border text-sm font-semibold transition-all duration-150 active:scale-[0.98]"
              style={{
                backgroundColor: '#fff',
                borderColor: '#DDD',
                color: '#111',
                fontFamily: 'var(--font-sans)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                opacity: loading === 'apple' ? 0.5 : 1,
              }}
            >
              {loading === 'google' ? (
                <span className="w-5 h-5 border-2 rounded-full animate-spin" style={{ borderColor: '#1C4A2E', borderTopColor: 'transparent' }} />
              ) : (
                <GoogleIcon />
              )}
              Continue with Google
            </button>

            <button
              onClick={() => handleSignIn('apple')}
              disabled={loading !== null}
              className="w-full flex items-center justify-center gap-3 py-3.5 px-5 rounded-xl text-sm font-semibold transition-all duration-150 active:scale-[0.98]"
              style={{
                backgroundColor: '#111',
                color: '#fff',
                fontFamily: 'var(--font-sans)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                opacity: loading === 'google' ? 0.5 : 1,
              }}
            >
              {loading === 'apple' ? (
                <span className="w-5 h-5 border-2 rounded-full animate-spin" style={{ borderColor: '#fff', borderTopColor: 'transparent' }} />
              ) : (
                <AppleIcon />
              )}
              Continue with Apple
            </button>
          </div>

          {/* divider */}
          <div className="flex items-center gap-3 my-7">
            <div className="flex-1 h-px" style={{ backgroundColor: '#D9D7CE' }} />
            <span className="text-xs" style={{ color: '#AAA' }}>OR</span>
            <div className="flex-1 h-px" style={{ backgroundColor: '#D9D7CE' }} />
          </div>

          {/* email sign-in */}
          {!emailOpen ? (
            <button
              onClick={handleEmailOpen}
              disabled={loading !== null}
              className="w-full flex items-center justify-center gap-3 py-3.5 px-5 rounded-xl border text-sm font-semibold transition-all duration-150 active:scale-[0.98] hover:border-gray-400"
              style={{
                backgroundColor: '#EDECE7',
                borderColor: '#D5D3CA',
                color: '#444',
                fontFamily: 'var(--font-sans)',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 4h12v8a1 1 0 01-1 1H3a1 1 0 01-1-1V4z" stroke="#666" strokeWidth="1.2"/>
                <path d="M2 4l6 5 6-5" stroke="#666" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              Continue with email
            </button>
          ) : emailSent ? (
            <div
              className="w-full rounded-xl px-5 py-4 text-sm text-center"
              style={{ backgroundColor: '#E8F5E9', border: '1px solid #A5D6A7', color: '#2E7D32', fontFamily: 'var(--font-sans)' }}
            >
              <div className="font-semibold mb-0.5">Check your inbox ✓</div>
              <div style={{ color: '#4CAF50', fontSize: '0.78rem' }}>
                We sent a sign-in link to <strong>{email.trim()}</strong>
              </div>
              <button
                onClick={() => { setEmailSent(false); setEmail(''); setEmailOpen(false) }}
                className="mt-2 text-xs underline"
                style={{ color: '#388E3C' }}
              >
                Use a different email
              </button>
            </div>
          ) : (
            <form onSubmit={handleEmailSubmit} noValidate>
              <div
                className="rounded-xl overflow-hidden border transition-all"
                style={{
                  borderColor: emailError ? '#E8650A' : '#D5D3CA',
                  backgroundColor: '#fff',
                }}
              >
                <div className="flex items-center px-4 gap-2.5">
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
                    <path d="M2 4h12v8a1 1 0 01-1 1H3a1 1 0 01-1-1V4z" stroke="#999" strokeWidth="1.2"/>
                    <path d="M2 4l6 5 6-5" stroke="#999" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  <input
                    ref={emailInputRef}
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setEmailError('') }}
                    placeholder="you@example.com"
                    className="flex-1 py-3.5 text-sm bg-transparent outline-none"
                    style={{ color: '#111', fontFamily: 'var(--font-sans)' }}
                    disabled={loading === 'email'}
                  />
                  {email && (
                    <button
                      type="button"
                      onClick={() => { setEmail(''); setEmailError(''); emailInputRef.current?.focus() }}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                      tabIndex={-1}
                      aria-label="Clear"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                      </svg>
                    </button>
                  )}
                </div>
                <div style={{ height: '1px', backgroundColor: emailError ? '#E8650A' : '#E8E6DE' }} />
                <button
                  type="submit"
                  disabled={loading === 'email'}
                  className="w-full py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-150 active:opacity-80"
                  style={{
                    backgroundColor: '#1C4A2E',
                    color: '#fff',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  {loading === 'email' ? (
                    <span className="w-4 h-4 border-2 rounded-full animate-spin" style={{ borderColor: '#fff', borderTopColor: 'transparent' }} />
                  ) : (
                    <>
                      Send sign-in link
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M2 7h10M8 3l4 4-4 4" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </>
                  )}
                </button>
              </div>
              {emailError && (
                <p className="mt-2 text-xs" style={{ color: '#E8650A', fontFamily: 'var(--font-sans)' }}>
                  {emailError}
                </p>
              )}
              <button
                type="button"
                onClick={() => { setEmailOpen(false); setEmail(''); setEmailError('') }}
                className="mt-2 w-full text-xs text-center hover:underline"
                style={{ color: '#999' }}
              >
                Back to other sign-in options
              </button>
            </form>
          )}

          {/* footer links */}
          <div className="mt-8 space-y-3 text-center">
            <p className="text-xs" style={{ color: '#999' }}>
              By continuing, you agree to our{' '}
              <a href="#" className="underline hover:text-gray-700 transition-colors" style={{ color: '#666' }}>Terms</a>
              {' '}and{' '}
              <a href="#" className="underline hover:text-gray-700 transition-colors" style={{ color: '#666' }}>Privacy Policy</a>.
            </p>

            <div
              className="pt-4 border-t"
              style={{ borderColor: '#D9D7CE' }}
            >
              {activeTab === 'customer' && (
                <p className="text-sm" style={{ color: '#666' }}>
                  Want to sell with us?{' '}
                  <button
                    onClick={() => setActiveTab('vendor')}
                    className="font-semibold hover:underline transition-colors"
                    style={{ color: '#1C4A2E' }}
                  >
                    Become a vendor
                  </button>
                </p>
              )}
              {activeTab === 'vendor' && (
                <p className="text-sm" style={{ color: '#666' }}>
                  Want to deliver with us?{' '}
                  <button
                    onClick={() => setActiveTab('rider')}
                    className="font-semibold hover:underline transition-colors"
                    style={{ color: '#E8650A' }}
                  >
                    Register as a rider
                  </button>
                </p>
              )}
              {activeTab === 'rider' && (
                <p className="text-sm" style={{ color: '#666' }}>
                  Looking to shop?{' '}
                  <button
                    onClick={() => setActiveTab('customer')}
                    className="font-semibold hover:underline transition-colors"
                    style={{ color: '#1C4A2E' }}
                  >
                    Sign in as a customer
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* bottom: customer service */}
        <div className="mt-10 w-full flex justify-center">
          <a
            href="#"
            className="flex items-center gap-2 text-xs py-2 px-4 rounded-full transition-colors hover:opacity-80"
            style={{ color: '#888', backgroundColor: '#E8E6DE' }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <circle cx="6.5" cy="6.5" r="5.5" stroke="#888" strokeWidth="1.1"/>
              <path d="M4.5 5.2a2 2 0 013.5 1.3c0 1.1-.9 1.6-1.5 2v.5" stroke="#888" strokeWidth="1.1" strokeLinecap="round"/>
              <circle cx="6.5" cy="10" r=".6" fill="#888"/>
            </svg>
            Need help? Contact customer support
          </a>
        </div>
      </div>
    </div>
  )
}
