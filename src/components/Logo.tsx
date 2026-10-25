type LogoProps = {
  variant?: "full" | "mark"
  className?: string
}

export function Logo({ variant = "full", className = "" }: LogoProps) {
  const mark = (
    <svg viewBox="0 0 64 64" className="h-10 w-10 shrink-0" aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="var(--color-mata)" />
      <path
        d="M16 40c0-10 7-18 16-18s16 8 16 18"
        stroke="var(--color-creme)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M16 40h32" stroke="var(--color-creme)" strokeWidth="4" strokeLinecap="round" />
      <path d="M32 22c0-5 3.5-9 8-10-1 4.5-2.5 8-8 10Z" fill="var(--color-terracota)" />
    </svg>
  )

  if (variant === "mark") {
    return <div className={className}>{mark}</div>
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {mark}
      <span className="font-display text-xl leading-none text-mata">
        Recanto da
        <br />
        Bicharada
      </span>
    </div>
  )
}
