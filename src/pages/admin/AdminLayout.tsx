import { useState } from "react"
import { Link, Navigate, NavLink, Outlet } from "react-router-dom"
import { Logo } from "../../components/Logo"
import { useAuth } from "../../lib/AuthContext"
import { supabase } from "../../lib/supabase"

const navItems = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/produtos", label: "Produtos" },
  { to: "/admin/estoque", label: "Estoque" },
  { to: "/admin/pedidos", label: "Pedidos" },
  { to: "/admin/configuracoes", label: "Configurações" },
]

export function AdminLayout() {
  const { session, isAdmin, loading, hasAnyAdmin } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  if (loading) return null
  if (!session) return <Navigate to="/admin/login" replace />
  if (hasAnyAdmin === null) return null
  if (!hasAnyAdmin) return <Navigate to="/admin/setup" replace />
  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-creme-claro px-6 text-center">
        <div>
          <p className="font-display text-xl font-semibold text-carvao">Acesso restrito</p>
          <p className="mt-2 text-sm text-carvao/60">
            Sua conta ({session.user.email}) não tem permissão de administrador.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-creme-claro lg:flex">
      {/* Mobile top bar */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-carvao/10 bg-branco px-4 py-3 lg:hidden">
        <Link to="/admin" className="flex items-center gap-2">
          <Logo variant="mark" />
          <span className="font-display text-base text-mata">Painel</span>
        </Link>
        <button
          type="button"
          aria-label="Abrir menu"
          onClick={() => setMenuOpen((open) => !open)}
          className="rounded-full p-2 text-carvao/70 hover:bg-mata/10 hover:text-mata"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </header>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-b border-carvao/10 bg-branco px-4 py-3 lg:hidden">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `rounded-card px-3 py-2.5 text-sm font-medium ${
                  isActive ? "bg-mata text-creme" : "text-carvao/70 hover:bg-mata/5"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <div className="mt-2 border-t border-carvao/10 pt-3">
            <p className="truncate px-3 text-xs text-carvao/50">{session.user.email}</p>
            <button
              type="button"
              onClick={() => supabase.auth.signOut()}
              className="mt-1 px-3 text-xs font-medium text-terracota hover:underline"
            >
              Sair
            </button>
          </div>
        </nav>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-carvao/10 bg-branco px-5 py-6 lg:flex">
        <Link to="/">
          <Logo variant="mark" className="mb-8" />
        </Link>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `rounded-card px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? "bg-mata text-creme" : "text-carvao/70 hover:bg-mata/5"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto border-t border-carvao/10 pt-4">
          <p className="truncate text-xs text-carvao/50">{session.user.email}</p>
          <button
            type="button"
            onClick={() => supabase.auth.signOut()}
            className="mt-2 text-xs font-medium text-terracota hover:underline"
          >
            Sair
          </button>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <main className="px-4 py-6 sm:px-6 sm:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
