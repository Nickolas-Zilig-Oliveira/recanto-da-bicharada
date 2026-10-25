import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { supabase } from "../../lib/supabase"
import type { Tables } from "../../types/database"

type ProductRow = Tables<"products"> & { categories: { name: string } | null }

export function AdminProductList() {
  const [products, setProducts] = useState<ProductRow[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [error, setError] = useState<string | null>(null)

  async function load() {
    setLoading(true)
    const { data, error } = await supabase
      .from("products")
      .select("*, categories(name)")
      .order("created_at", { ascending: false })

    if (error) {
      setError(error.message)
    } else {
      setProducts(data as ProductRow[])
    }
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  async function toggleActive(product: ProductRow) {
    const { error } = await supabase
      .from("products")
      .update({ active: !product.active })
      .eq("id", product.id)
    if (error) {
      setError(error.message)
      return
    }
    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, active: !p.active } : p)),
    )
  }

  async function handleDelete(product: ProductRow) {
    if (!confirm(`Excluir "${product.name}" permanentemente? Esta ação não pode ser desfeita.`)) return
    const { error } = await supabase.from("products").delete().eq("id", product.id)
    if (error) {
      setError(
        error.code === "23503"
          ? `"${product.name}" já tem histórico de estoque ou pedidos — desative em vez de excluir.`
          : `Não foi possível excluir: ${error.message}`,
      )
      return
    }
    setProducts((prev) => prev.filter((p) => p.id !== product.id))
  }

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-carvao">Produtos</h1>
          <p className="mt-1 text-sm text-carvao/60">{products.length} produtos cadastrados.</p>
        </div>
        <Link
          to="/admin/produtos/novo"
          className="rounded-pill bg-terracota px-5 py-2.5 text-sm font-medium text-branco hover:bg-terracota-escuro"
        >
          + Novo produto
        </Link>
      </div>

      <input
        type="search"
        placeholder="Buscar por nome..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className="mt-6 w-full max-w-sm rounded-card border border-carvao/15 px-4 py-2 text-sm outline-none focus:border-mata"
      />

      {error && (
        <p className="mt-4 rounded-card bg-terracota/10 px-4 py-2 text-sm text-terracota-escuro">
          {error}
        </p>
      )}

      <div className="mt-6 overflow-x-auto rounded-card bg-branco shadow-card">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-carvao/10 text-xs uppercase tracking-wide text-carvao/50">
            <tr>
              <th className="px-4 py-3">Produto</th>
              <th className="px-4 py-3">Categoria</th>
              <th className="px-4 py-3">Preço</th>
              <th className="px-4 py-3">Estoque</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-carvao/50">
                  Carregando...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-carvao/50">
                  Nenhum produto encontrado.
                </td>
              </tr>
            ) : (
              filtered.map((product) => (
                <tr key={product.id} className="border-b border-carvao/5 last:border-0">
                  <td className="px-4 py-3 font-medium text-carvao">{product.name}</td>
                  <td className="px-4 py-3 text-carvao/70">{product.categories?.name ?? "—"}</td>
                  <td className="px-4 py-3 text-carvao/70">
                    {(product.price_cents / 100).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        product.stock_quantity === 0
                          ? "font-medium text-terracota"
                          : product.stock_quantity <= product.low_stock_threshold
                            ? "font-medium text-terracota/80"
                            : "text-carvao/70"
                      }
                    >
                      {product.stock_quantity}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => toggleActive(product)}
                      className={`rounded-pill px-3 py-1 text-xs font-medium ${
                        product.active
                          ? "bg-mata/10 text-mata"
                          : "bg-carvao/10 text-carvao/60"
                      }`}
                    >
                      {product.active ? "Ativo" : "Inativo"}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      to={`/admin/produtos/${product.id}`}
                      className="mr-3 text-xs font-medium text-mata hover:underline"
                    >
                      Editar
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(product)}
                      className="text-xs font-medium text-terracota hover:underline"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
