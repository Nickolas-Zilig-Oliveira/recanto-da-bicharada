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

  if (loading) return null
  if (!session) return <Navigate to="/admin/login" replace />
  if (hasAnyAdmin === null) return null
  if (!hasAnyAdmin) return <Navigate to="/admin/setup" replace />
  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-creme-claro px-6 text-center">
        <div>
          <p className="font-display text-xl text-carvao">Acesso restrito</p>
          <p className="mt-2 text-sm text-carvao/60">
            Sua conta ({session.user.email}) não tem permissão de administrador.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-creme-claro">
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

      <div className="flex-1">
        <main className="px-6 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
