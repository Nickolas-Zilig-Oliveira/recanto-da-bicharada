import { useEffect, useState } from "react"
import { Button } from "../../components/Button"
import { supabase } from "../../lib/supabase"
import type { Enums, Tables } from "../../types/database"

type Product = Tables<"products">
type Movement = Tables<"inventory_movements"> & { products: { name: string } | null }

export function AdminStock() {
  const [products, setProducts] = useState<Product[]>([])
  const [movements, setMovements] = useState<Movement[]>([])
  const [loading, setLoading] = useState(true)

  const [productId, setProductId] = useState("")
  const [type, setType] = useState<Enums<"movement_type">>("entrada")
  const [quantity, setQuantity] = useState("")
  const [reason, setReason] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function load() {
    setLoading(true)
    const [{ data: prods }, { data: moves }] = await Promise.all([
      supabase.from("products").select("*").order("name"),
      supabase
        .from("inventory_movements")
        .select("*, products(name)")
        .order("created_at", { ascending: false })
        .limit(30),
    ])
    setProducts(prods ?? [])
    setMovements((moves as Movement[]) ?? [])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setError(null)
    const qty = parseInt(quantity, 10)
    if (!productId || !qty || qty <= 0) {
      setError("Selecione um produto e informe uma quantidade válida.")
      return
    }

    setSubmitting(true)
    const { error } = await supabase.rpc("adjust_stock", {
      p_product_id: productId,
      p_type: type,
      p_quantity: qty,
      p_reason: reason || undefined,
    })
    setSubmitting(false)

    if (error) {
      setError(
        error.message.includes("insufficient stock")
          ? "Estoque insuficiente para essa saída."
          : error.message,
      )
      return
    }

    setQuantity("")
    setReason("")
    await load()
  }

  const selectedProduct = products.find((p) => p.id === productId)

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-carvao">Estoque</h1>
      <p className="mt-1 text-sm text-carvao/60">
        Toda alteração passa por aqui e fica registrada no histórico — o saldo nunca é editado direto.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 border-2 border-mata/15 bg-branco p-6">
          <h2 className="font-display text-lg font-semibold text-carvao">Registrar movimentação</h2>

          <label className="flex flex-col gap-1.5 text-sm text-carvao/80">
            Produto
            <select
              required
              value={productId}
              onChange={(event) => setProductId(event.target.value)}
              className="rounded-card border border-carvao/15 px-3 py-2 text-sm outline-none focus:border-mata"
            >
              <option value="">Selecione...</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} (atual: {p.stock_quantity})
                </option>
              ))}
            </select>
          </label>

          {selectedProduct && (
            <p className="text-xs text-carvao/50">
              Saldo atual: <span className="font-medium text-carvao">{selectedProduct.stock_quantity}</span>
            </p>
          )}

          <label className="flex flex-col gap-1.5 text-sm text-carvao/80">
            Tipo
            <select
              value={type}
              onChange={(event) => setType(event.target.value as Enums<"movement_type">)}
              className="rounded-card border border-carvao/15 px-3 py-2 text-sm outline-none focus:border-mata"
            >
              <option value="entrada">Entrada</option>
              <option value="saida">Saída</option>
              <option value="ajuste">Ajuste (soma)</option>
            </select>
          </label>

          <label className="flex flex-col gap-1.5 text-sm text-carvao/80">
            Quantidade
            <input
              required
              inputMode="numeric"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              className="rounded-card border border-carvao/15 px-3 py-2 text-sm outline-none focus:border-mata"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm text-carvao/80">
            Motivo (opcional)
            <input
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              placeholder="ex: compra de fornecedor, perda, contagem física"
              className="rounded-card border border-carvao/15 px-3 py-2 text-sm outline-none focus:border-mata"
            />
          </label>

          {error && <p className="text-sm text-terracota-escuro">{error}</p>}

          <Button type="submit" variant="primary" disabled={submitting}>
            {submitting ? "Registrando..." : "Registrar"}
          </Button>
        </form>

        <div className="border-2 border-mata/15 bg-branco p-6">
          <h2 className="font-display text-lg font-semibold text-carvao">Histórico recente</h2>
          {loading ? (
            <p className="mt-4 text-sm text-carvao/50">Carregando...</p>
          ) : movements.length === 0 ? (
            <p className="mt-4 text-sm text-carvao/50">Nenhuma movimentação registrada ainda.</p>
          ) : (
            <ul className="mt-4 flex flex-col divide-y divide-carvao/5">
              {movements.map((movement) => (
                <li key={movement.id} className="flex items-center justify-between gap-3 py-3 text-sm">
                  <div>
                    <p className="font-medium text-carvao">{movement.products?.name ?? "Produto removido"}</p>
                    <p className="text-xs text-carvao/50">
                      {movement.reason || "Sem motivo informado"} ·{" "}
                      {new Date(movement.created_at).toLocaleString("pt-BR")}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-pill px-2.5 py-1 text-xs font-medium ${
                      movement.type === "entrada"
                        ? "bg-mata/10 text-mata"
                        : movement.type === "saida"
                          ? "bg-terracota/10 text-terracota"
                          : "bg-carvao/10 text-carvao/70"
                    }`}
                  >
                    {movement.type === "entrada" ? "+" : movement.type === "saida" ? "−" : "±"}
                    {movement.quantity}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
