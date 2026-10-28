type BrandLogoProps = {
  tone?: 'orange' | 'dark' | 'light'
  size?: 'sm' | 'md' | 'lg'
  showName?: boolean
  className?: string
  nameClassName?: string
}

const markByTone = {
  orange: '/branding/solid-foundation-mark-orange.png',
  dark: '/branding/solid-foundation-mark-dark.png',
  light: '/branding/solid-foundation-mark-white.png',
}

const sizeClasses = {
  sm: { mark: 'h-7', name: 'text-base' },
  md: { mark: 'h-10', name: 'text-xl' },
  lg: { mark: 'h-14', name: 'text-2xl' },
}

export default function BrandLogo({ tone = 'orange', size = 'md', showName = true, className = '', nameClassName = '' }: BrandLogoProps) {
  const sizes = sizeClasses[size]
  const nameColor = tone === 'light' ? 'text-white' : tone === 'dark' ? 'text-gray-900' : 'text-brand-orange'

  return (
    <div className={`flex items-center gap-2.5 ${className}`} aria-label="Solid Foundation">
      <img src={markByTone[tone]} alt="" className={`${sizes.mark} w-auto shrink-0 object-contain`} />
      {showName && (
        <span className={`${sizes.name} ${nameColor} ${nameClassName} font-display font-semibold uppercase leading-none tracking-[0.06em]`}>
          Solid Foundation
        </span>
      )}
    </div>
  )
}
