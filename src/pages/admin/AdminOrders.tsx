import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"
import type { Enums, Tables } from "../../types/database"

const paymentLabels: Record<string, string> = {
  pending: "Pagamento pendente",
  paid: "Pago",
  refunded: "Reembolsado",
  partially_refunded: "Parcialmente reembolsado",
  failed: "Falhou",
  cancelled: "Cancelado",
}

const fulfillmentOptions: { value: Enums<"fulfillment_status">; label: string }[] = [
  { value: "pending", label: "Pendente" },
  { value: "processing", label: "Em separação" },
  { value: "ready", label: "Pronto" },
  { value: "shipped", label: "Enviado" },
  { value: "delivered", label: "Entregue" },
  { value: "cancelled", label: "Cancelado" },
]

export function AdminOrders() {
  const [orders, setOrders] = useState<Tables<"orders">[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false })
    setOrders(data ?? [])
    setLoading(false)
  }

  async function updateStatus(orderId: string, fulfillment_status: Enums<"fulfillment_status">) {
    const { error } = await supabase.from("orders").update({ fulfillment_status }).eq("id", orderId)
    if (!error) {
      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, fulfillment_status } : o)))
    }
  }

  return (
    <div>
      <h1 className="font-display text-2xl text-carvao">Pedidos</h1>
      <p className="mt-1 text-sm text-carvao/60">{orders.length} pedidos registrados.</p>

      <div className="mt-6 overflow-x-auto rounded-card bg-branco shadow-card">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-carvao/10 text-xs uppercase tracking-wide text-carvao/50">
            <tr>
              <th className="px-4 py-3">Pedido</th>
              <th className="px-4 py-3">Cliente</th>
              <th className="px-4 py-3">Entrega</th>
              <th className="px-4 py-3">Pagamento</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Data</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-carvao/50">
                  Carregando...
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-carvao/50">
                  Nenhum pedido ainda.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="border-b border-carvao/5 last:border-0">
                  <td className="px-4 py-3 font-medium text-carvao">{order.order_number}</td>
                  <td className="px-4 py-3 text-carvao/70">
                    <div>{order.customer_name ?? "—"}</div>
                    <div className="text-xs text-carvao/45">{order.customer_phone}</div>
                  </td>
                  <td className="px-4 py-3 text-carvao/70">
                    {order.delivery_method === "entrega" ? "Entrega" : "Retirada"}
                  </td>
                  <td className="px-4 py-3 text-carvao/70">{paymentLabels[order.payment_status]}</td>
                  <td className="px-4 py-3">
                    <select
                      value={order.fulfillment_status}
                      onChange={(event) =>
                        updateStatus(order.id, event.target.value as Enums<"fulfillment_status">)
                      }
                      className="rounded-card border border-carvao/15 px-2 py-1 text-xs outline-none focus:border-mata"
                    >
                      {fulfillmentOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-carvao/70">
                    {(order.total_cents / 100).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td className="px-4 py-3 text-carvao/50">
                    {new Date(order.created_at).toLocaleDateString("pt-BR")}
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
