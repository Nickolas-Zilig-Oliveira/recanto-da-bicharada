import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../../components/Button"
import { supabase } from "../../lib/supabase"

type Stats = {
  totalProducts: number
  activeProducts: number
  lowStock: number
  outOfStock: number
  totalOrders: number
  pendingOrders: number
}

export function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [{ count: total }, { count: active }, { data: products }, { count: orders }, { count: pending }] =
        await Promise.all([
          supabase.from("products").select("id", { count: "exact", head: true }),
          supabase.from("products").select("id", { count: "exact", head: true }).eq("active", true),
          supabase.from("products").select("stock_quantity, low_stock_threshold"),
          supabase.from("orders").select("id", { count: "exact", head: true }),
          supabase
            .from("orders")
            .select("id", { count: "exact", head: true })
            .eq("fulfillment_status", "pending"),
        ])

      const lowStock = (products ?? []).filter(
        (p) => p.stock_quantity > 0 && p.stock_quantity <= p.low_stock_threshold,
      ).length
      const outOfStock = (products ?? []).filter((p) => p.stock_quantity === 0).length

      setStats({
        totalProducts: total ?? 0,
        activeProducts: active ?? 0,
        lowStock,
        outOfStock,
        totalOrders: orders ?? 0,
        pendingOrders: pending ?? 0,
      })
      setLoading(false)
    }
    load()
  }, [])

  const cards = stats
    ? [
        { label: "Produtos ativos", value: stats.activeProducts, to: "/admin/produtos" },
        { label: "Total de produtos", value: stats.totalProducts, to: "/admin/produtos" },
        { label: "Estoque baixo", value: stats.lowStock, to: "/admin/estoque", warn: stats.lowStock > 0 },
        { label: "Indisponíveis", value: stats.outOfStock, to: "/admin/estoque", warn: stats.outOfStock > 0 },
        { label: "Pedidos (total)", value: stats.totalOrders, to: "/admin/pedidos" },
        { label: "Aguardando processamento", value: stats.pendingOrders, to: "/admin/pedidos" },
      ]
    : []

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-carvao">Dashboard</h1>
      <p className="mt-1 text-sm text-carvao/60">Visão geral da loja — dados ao vivo do banco.</p>

      {loading ? (
        <p className="mt-8 text-sm text-carvao/50">Carregando...</p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-3">
          {cards.map((card) => (
            <Link
              key={card.label}
              to={card.to}
              className="border-2 border-carvao/15 bg-branco p-5 transition-colors hover:border-mata"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-carvao/50">{card.label}</p>
              <p
                className={`price-tag mt-2 text-3xl font-medium ${
                  card.warn ? "text-terracota" : "text-mata"
                }`}
              >
                {card.value}
              </p>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-10 flex flex-wrap gap-3">
        <Link to="/admin/produtos/novo">
          <Button variant="primary">+ Novo produto</Button>
        </Link>
        <Link to="/admin/estoque">
          <Button variant="ghost">Ajustar estoque</Button>
        </Link>
      </div>
    </div>
  )
}
