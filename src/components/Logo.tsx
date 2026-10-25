type LogoProps = {
  variant?: "full" | "mark"
  className?: string
}

export function Logo({ variant = "full", className = "" }: LogoProps) {
  const mark = (
    <svg viewBox="0 0 64 64" className="h-10 w-10 shrink-0" aria-hidden="true">
      <rect width="64" height="64" fill="var(--color-mata)" />
      <path
        d="M15 41c0-11 7.5-19.5 17-19.5S49 30 49 41"
        stroke="var(--color-creme)"
        strokeWidth="4.5"
        strokeLinecap="square"
        fill="none"
      />
      <path d="M15 41h34" stroke="var(--color-creme)" strokeWidth="4.5" strokeLinecap="square" />
      <rect x="29" y="12" width="7" height="7" fill="var(--color-dourado)" />
    </svg>
  )

  if (variant === "mark") {
    return <div className={className}>{mark}</div>
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {mark}
      <span className="font-display text-xl font-semibold leading-none text-mata">
        Recanto da
        <br />
        Bicharada
      </span>
    </div>
  )
}
