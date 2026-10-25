import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"
import type { Tables } from "../../types/database"

const paymentLabels: Record<string, string> = {
  pending: "Pagamento pendente",
  paid: "Pago",
  refunded: "Reembolsado",
  partially_refunded: "Parcialmente reembolsado",
  failed: "Falhou",
  cancelled: "Cancelado",
}

const fulfillmentLabels: Record<string, string> = {
  pending: "Pendente",
  processing: "Em separação",
  ready: "Pronto",
  shipped: "Enviado",
  delivered: "Entregue",
  cancelled: "Cancelado",
}

export function AdminOrders() {
  const [orders, setOrders] = useState<Tables<"orders">[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setOrders(data ?? [])
        setLoading(false)
      })
  }, [])

  return (
    <div>
      <h1 className="font-display text-2xl text-carvao">Pedidos</h1>
      <p className="mt-1 text-sm text-carvao/60">
        O checkout ainda não está implementado (Fase 4) — esta tela já está conectada ao banco e
        vai exibir os pedidos reais assim que o fluxo de compra entrar no ar.
      </p>

      <div className="mt-6 overflow-x-auto rounded-card bg-branco shadow-card">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-carvao/10 text-xs uppercase tracking-wide text-carvao/50">
            <tr>
              <th className="px-4 py-3">Pedido</th>
              <th className="px-4 py-3">Pagamento</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Data</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-carvao/50">
                  Carregando...
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-carvao/50">
                  Nenhum pedido ainda.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="border-b border-carvao/5 last:border-0">
                  <td className="px-4 py-3 font-medium text-carvao">{order.order_number}</td>
                  <td className="px-4 py-3 text-carvao/70">{paymentLabels[order.payment_status]}</td>
                  <td className="px-4 py-3 text-carvao/70">{fulfillmentLabels[order.fulfillment_status]}</td>
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
