import type { ButtonHTMLAttributes, ReactNode } from "react"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost"
  children: ReactNode
}

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-terracota text-branco hover:bg-terracota-escuro active:bg-terracota-escuro",
  secondary: "bg-mata text-creme hover:bg-mata-escuro active:bg-mata-escuro",
  ghost: "bg-transparent text-mata border-2 border-mata hover:bg-mata hover:text-creme",
}

export function Button({ variant = "primary", className = "", children, ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-40 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
