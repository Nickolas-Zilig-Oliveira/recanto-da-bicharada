import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../lib/CartContext"
import { Logo } from "./Logo"

const navItems = [
  { label: "Catálogo", to: "/catalogo" },
  { label: "Categorias", to: "/#categorias" },
  { label: "Nossa história", to: "/#historia" },
  { label: "Contato", to: "/#contato" },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState("")
  const navigate = useNavigate()
  const { itemCount } = useCart()

  function handleSearch(event: React.FormEvent) {
    event.preventDefault()
    if (!query.trim()) return
    navigate(`/catalogo?q=${encodeURIComponent(query.trim())}`)
    setSearchOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-carvao/10 bg-creme-claro/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-content items-center justify-between gap-6 px-6 py-3">
        <Link to="/" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm font-medium text-carvao/80 transition-colors hover:text-mata"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="relative">
            <button
              type="button"
              aria-label="Pesquisar produtos"
              onClick={() => setSearchOpen((open) => !open)}
              className="rounded-full p-2 text-carvao/70 transition-colors hover:bg-mata/10 hover:text-mata"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" strokeLinecap="round" />
              </svg>
            </button>

            {searchOpen && (
              <form
                onSubmit={handleSearch}
                className="absolute right-0 top-12 w-64 rounded-card bg-branco p-2 shadow-lifted"
              >
                <input
                  autoFocus
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Buscar produtos..."
                  className="w-full rounded-pill border border-carvao/15 px-4 py-2 text-sm text-carvao outline-none focus:border-mata"
                />
              </form>
            )}
          </div>

          <Link
            to="/carrinho"
            aria-label="Carrinho de compras"
            className="relative rounded-full p-2 text-carvao/70 transition-colors hover:bg-mata/10 hover:text-mata"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 4h2l2.4 12.4a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 8H6" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="10" cy="21" r="1" />
              <circle cx="17" cy="21" r="1" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-terracota text-[10px] font-semibold text-branco">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            aria-label="Abrir menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="rounded-full p-2 text-carvao/70 transition-colors hover:bg-mata/10 hover:text-mata lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-carvao/10 px-6 py-4 lg:hidden">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className="rounded-card px-2 py-2.5 text-sm font-medium text-carvao/80 hover:bg-mata/5 hover:text-mata"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
