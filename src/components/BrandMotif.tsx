type SprigProps = {
  className?: string
  strokeWidth?: number
}

/**
 * Hand-drawn botanical linework — the recurring signature device across the
 * site (hero backdrop, category tiles, product placeholders). Deliberately
 * organic/asymmetric rather than a geometric icon, echoing the logo's arch.
 */
export function Sprig({ className = "", strokeWidth = 1.5 }: SprigProps) {
  return (
    <svg viewBox="0 0 120 160" fill="none" className={className} aria-hidden="true">
      <path
        d="M60 150c0-40-18-55-18-90 0-20 10-34 18-44 8 10 18 24 18 44 0 35-18 50-18 90Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <path d="M60 60c0-18-14-28-26-30" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M60 85c0-16 16-24 30-24" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M60 112c0-14-13-22-24-22" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      <circle cx="33" cy="30" r="2.5" fill="currentColor" />
      <circle cx="91" cy="61" r="2.5" fill="currentColor" />
      <circle cx="35" cy="90" r="2.5" fill="currentColor" />
    </svg>
  )
}

/** The arch from the mark, used large and faint as a cropping/texture device. */
export function ArchOutline({ className = "", strokeWidth = 1.5 }: SprigProps) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className} aria-hidden="true">
      <path
        d="M20 190V110C20 60 55 20 100 20s80 40 80 90v80"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <path
        d="M45 190V115c0-38 25-68 55-68s55 30 55 68v75"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        opacity="0.55"
      />
    </svg>
  )
}
