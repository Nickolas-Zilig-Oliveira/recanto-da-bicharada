import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { Button } from "../components/Button"
import { useCart } from "../lib/CartContext"
import { supabase } from "../lib/supabase"
import { useStoreSettings } from "../lib/useStoreSettings"

function formatBRL(cents: number) {
  return (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

export function Checkout() {
  const { items, subtotalCents } = useCart()
  const storeSettings = useStoreSettings()
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [deliveryMethod, setDeliveryMethod] = useState<"retirada" | "entrega">("retirada")
  const [street, setStreet] = useState("")
  const [number, setNumber] = useState("")
  const [neighborhood, setNeighborhood] = useState("")
  const [city, setCity] = useState("Itapecerica da Serra")
  const [state, setState] = useState("SP")
  const [zip, setZip] = useState("")
  const [notes, setNotes] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (items.length === 0) {
    return <Navigate to="/carrinho" replace />
  }

  const flatShippingCents = (storeSettings?.shipping_rules as { flat_cents?: number } | null)?.flat_cents ?? 0
  const shippingCents = deliveryMethod === "entrega" ? flatShippingCents : 0
  const totalCents = subtotalCents + shippingCents

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setError(null)

    if (!name.trim() || !phone.trim()) {
      setError("Nome e telefone são obrigatórios.")
      return
    }
    if (deliveryMethod === "entrega" && (!street.trim() || !number.trim() || !neighborhood.trim() || !zip.trim())) {
      setError("Preencha o endereço completo para entrega.")
      return
    }

    setSubmitting(true)

    const { data, error: rpcError } = await supabase.rpc("place_order", {
      p_items: items.map((i) => ({ product_id: i.productId, quantity: i.quantity })),
      p_delivery_method: deliveryMethod,
      p_customer_name: name.trim(),
      p_customer_phone: phone.trim(),
      p_shipping_address:
        deliveryMethod === "entrega"
          ? { street, number, neighborhood, city, state, zip_code: zip }
          : undefined,
      p_notes: notes.trim() || undefined,
    })

    setSubmitting(false)

    if (rpcError) {
      setError(
        rpcError.message.includes("insufficient stock")
          ? "Um dos produtos ficou sem estoque suficiente. Volte ao carrinho e ajuste a quantidade."
          : rpcError.message.includes("unavailable")
            ? "Um dos produtos não está mais disponível. Volte ao carrinho e remova-o."
            : `Não foi possível concluir o pedido: ${rpcError.message}`,
      )
      return
    }

    const result = data?.[0]
    if (!result) {
      setError("Não foi possível concluir o pedido. Tente novamente.")
      return
    }

    navigate(`/pedido/${result.order_id}`, { replace: true })
  }

  return (
    <div className="mx-auto max-w-content px-6 py-10">
      <h1 className="font-display text-3xl font-semibold text-carvao">Finalizar pedido</h1>

      <div className="mt-8 flex flex-col gap-10 lg:flex-row">
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-6">
          <div className="flex flex-col gap-4 border-2 border-mata/20 p-5">
            <h2 className="font-display text-lg font-semibold text-carvao">Seus dados</h2>
            <label className="flex flex-col gap-1.5 text-sm text-carvao/80">
              Nome completo
              <input
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="rounded-card border border-carvao/15 px-3 py-2 text-sm outline-none focus:border-mata"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm text-carvao/80">
              WhatsApp / telefone
              <input
                required
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="(11) 99999-9999"
                className="rounded-card border border-carvao/15 px-3 py-2 text-sm outline-none focus:border-mata"
              />
            </label>
          </div>

          <div className="flex flex-col gap-4 border-2 border-mata/20 p-5">
            <h2 className="font-display text-lg font-semibold text-carvao">Entrega</h2>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setDeliveryMethod("retirada")}
                className={`flex-1 border-2 px-4 py-3 text-left text-sm transition-colors ${
                  deliveryMethod === "retirada"
                    ? "border-mata bg-mata text-creme"
                    : "border-carvao/15 text-carvao/70"
                }`}
              >
                <span className="font-semibold">Retirar na loja</span>
                <p className="price-tag text-xs opacity-75">Grátis</p>
              </button>
              <button
                type="button"
                onClick={() => setDeliveryMethod("entrega")}
                className={`flex-1 border-2 px-4 py-3 text-left text-sm transition-colors ${
                  deliveryMethod === "entrega"
                    ? "border-mata bg-mata text-creme"
                    : "border-carvao/15 text-carvao/70"
                }`}
              >
                <span className="font-semibold">Entrega</span>
                <p className="price-tag text-xs opacity-75">
                  {flatShippingCents > 0 ? formatBRL(flatShippingCents) : "A combinar"}
                </p>
              </button>
            </div>

            {deliveryMethod === "entrega" && (
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5 text-sm text-carvao/80 sm:col-span-2">
                  Rua
                  <input
                    required
                    value={street}
                    onChange={(event) => setStreet(event.target.value)}
                    className="rounded-card border border-carvao/15 px-3 py-2 text-sm outline-none focus:border-mata"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm text-carvao/80">
                  Número
                  <input
                    required
                    value={number}
                    onChange={(event) => setNumber(event.target.value)}
                    className="rounded-card border border-carvao/15 px-3 py-2 text-sm outline-none focus:border-mata"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm text-carvao/80">
                  Bairro
                  <input
                    required
                    value={neighborhood}
                    onChange={(event) => setNeighborhood(event.target.value)}
                    className="rounded-card border border-carvao/15 px-3 py-2 text-sm outline-none focus:border-mata"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm text-carvao/80">
                  Cidade
                  <input
                    required
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    className="rounded-card border border-carvao/15 px-3 py-2 text-sm outline-none focus:border-mata"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm text-carvao/80">
                  Estado
                  <input
                    required
                    maxLength={2}
                    value={state}
                    onChange={(event) => setState(event.target.value.toUpperCase())}
                    className="rounded-card border border-carvao/15 px-3 py-2 text-sm uppercase outline-none focus:border-mata"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm text-carvao/80">
                  CEP
                  <input
                    required
                    value={zip}
                    onChange={(event) => setZip(event.target.value)}
                    className="rounded-card border border-carvao/15 px-3 py-2 text-sm outline-none focus:border-mata"
                  />
                </label>
              </div>
            )}
          </div>

          <label className="flex flex-col gap-1.5 text-sm text-carvao/80">
            Observações (opcional)
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={2}
              className="rounded-card border border-carvao/15 px-3 py-2 text-sm outline-none focus:border-mata"
            />
          </label>

          {error && (
            <p className="border-2 border-terracota bg-terracota/10 px-4 py-2 text-sm text-terracota-escuro">
              {error}
            </p>
          )}

          <p className="text-xs text-carvao/45">
            Pagamento online ainda não está disponível — seu pedido será registrado e o acerto do
            pagamento combinado por telefone/WhatsApp.
          </p>

          <Button type="submit" variant="primary" disabled={submitting} className="w-fit">
            {submitting ? "Enviando..." : "Confirmar pedido"}
          </Button>
        </form>

        <aside className="shrink-0 lg:w-80">
          <div className="border-2 border-mata p-5">
            <h2 className="font-display text-lg font-semibold text-carvao">Resumo</h2>
            <ul className="mt-4 flex flex-col gap-2 text-sm">
              {items.map((item) => (
                <li key={item.productId} className="flex justify-between gap-2 text-carvao/70">
                  <span className="min-w-0 truncate">
                    {item.quantity}× {item.name}
                  </span>
                  <span className="price-tag shrink-0">{formatBRL(item.priceCents * item.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-col gap-1.5 border-t border-carvao/10 pt-4 text-sm">
              <div className="flex justify-between text-carvao/70">
                <span>Subtotal</span>
                <span className="price-tag">{formatBRL(subtotalCents)}</span>
              </div>
              <div className="flex justify-between text-carvao/70">
                <span>Frete</span>
                <span className="price-tag">{shippingCents > 0 ? formatBRL(shippingCents) : "Grátis"}</span>
              </div>
              <div className="flex justify-between pt-1 font-display text-lg font-semibold text-mata">
                <span>Total</span>
                <span className="price-tag">{formatBRL(totalCents)}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
