import { Logo } from "./Logo"

const navItems = [
  { label: "Catálogo", href: "#catalogo" },
  { label: "Categorias", href: "#categorias" },
  { label: "Nossa história", href: "#historia" },
  { label: "Contato", href: "#contato" },
]

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-carvao/10 bg-creme-claro/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-content items-center justify-between gap-6 px-6 py-3">
        <a href="#top" className="shrink-0">
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-carvao/80 transition-colors hover:text-mata"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Pesquisar produtos"
            className="rounded-full p-2 text-carvao/70 transition-colors hover:bg-mata/10 hover:text-mata"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" strokeLinecap="round" />
            </svg>
          </button>

          <button
            type="button"
            aria-label="Minha conta"
            className="hidden rounded-full p-2 text-carvao/70 transition-colors hover:bg-mata/10 hover:text-mata sm:block"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c1.6-4 5-6 8-6s6.4 2 8 6" strokeLinecap="round" />
            </svg>
          </button>

          <button
            type="button"
            aria-label="Carrinho de compras"
            className="relative rounded-full p-2 text-carvao/70 transition-colors hover:bg-mata/10 hover:text-mata"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 4h2l2.4 12.4a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 8H6" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="10" cy="21" r="1" />
              <circle cx="17" cy="21" r="1" />
            </svg>
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-terracota text-[10px] font-semibold text-branco">
              0
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}
