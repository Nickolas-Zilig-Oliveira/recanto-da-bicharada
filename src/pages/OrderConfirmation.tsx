import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Button } from "../components/Button"
import { useCart } from "../lib/CartContext"
import { supabase } from "../lib/supabase"
import type { Tables } from "../types/database"

function formatBRL(cents: number) {
  return (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

type OrderWithItems = Tables<"orders"> & { order_items: Tables<"order_items">[] }

export function OrderConfirmation() {
  const { orderId } = useParams()
  const [order, setOrder] = useState<OrderWithItems | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const { clear } = useCart()

  useEffect(() => {
    if (!orderId) return
    supabase
      .from("orders")
      .select("*, order_items(*)")
      .eq("id", orderId)
      .maybeSingle()
      .then(({ data }) => {
        if (!data) {
          setNotFound(true)
        } else {
          setOrder(data as OrderWithItems)
          clear()
        }
        setLoading(false)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId])

  if (loading) {
    return <p className="mx-auto max-w-content px-6 py-20 text-center text-sm text-carvao/50">Carregando...</p>
  }

  if (notFound || !order) {
    return (
      <div className="mx-auto max-w-content px-6 py-20 text-center">
        <p className="font-display text-xl text-carvao">Pedido não encontrado</p>
        <Link to="/" className="mt-4 inline-block text-sm text-mata hover:underline">
          Voltar ao início
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-xl px-6 py-16 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracota">Pedido recebido</p>
      <h1 className="mt-3 font-display text-3xl font-semibold text-carvao">Obrigado, {order.customer_name}!</h1>
      <p className="mt-2 text-sm text-carvao/60">
        Pedido <span className="price-tag font-medium text-carvao">{order.order_number}</span> registrado.
        Entraremos em contato pelo telefone informado para combinar o pagamento
        {order.delivery_method === "entrega" ? " e a entrega" : " e a retirada"}.
      </p>

      <div className="mt-8 border-2 border-mata p-6 text-left">
        <ul className="flex flex-col gap-2 text-sm">
          {order.order_items.map((item) => (
            <li key={item.id} className="flex justify-between gap-2 text-carvao/70">
              <span className="min-w-0 truncate">
                {item.quantity}× {item.product_name}
              </span>
              <span className="price-tag shrink-0">{formatBRL(item.subtotal_cents)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-col gap-1.5 border-t border-carvao/10 pt-4 text-sm">
          <div className="flex justify-between text-carvao/70">
            <span>Subtotal</span>
            <span className="price-tag">{formatBRL(order.subtotal_cents)}</span>
          </div>
          <div className="flex justify-between text-carvao/70">
            <span>Frete</span>
            <span className="price-tag">
              {order.shipping_cents > 0 ? formatBRL(order.shipping_cents) : "Grátis"}
            </span>
          </div>
          <div className="flex justify-between pt-1 font-display text-lg font-semibold text-mata">
            <span>Total</span>
            <span className="price-tag">{formatBRL(order.total_cents)}</span>
          </div>
        </div>
      </div>

      <Link to="/catalogo" className="mt-8 inline-block">
        <Button variant="secondary">Continuar comprando</Button>
      </Link>
    </div>
  )
}
