import { Link, useNavigate } from "react-router-dom"
import { Button } from "../components/Button"
import { useCart } from "../lib/CartContext"

function formatBRL(cents: number) {
  return (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

export function Cart() {
  const { items, updateQuantity, removeItem, subtotalCents } = useCart()
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-content px-6 py-20 text-center">
        <p className="font-display text-2xl font-semibold text-carvao">Seu carrinho está vazio</p>
        <p className="mt-2 text-sm text-carvao/60">Que tal dar uma olhada no catálogo?</p>
        <Link to="/catalogo" className="mt-6 inline-block">
          <Button variant="primary">Ver catálogo</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-content px-6 py-10">
      <h1 className="font-display text-3xl font-semibold text-carvao">Carrinho</h1>

      <div className="mt-8 flex flex-col gap-8 lg:flex-row">
        <ul className="flex-1 divide-y divide-carvao/10 border-y-2 border-mata">
          {items.map((item) => (
            <li key={item.productId} className="flex items-center gap-4 py-5">
              <div className="flex-1">
                <Link to={`/produto/${item.slug}`} className="text-sm font-semibold text-carvao hover:text-terracota">
                  {item.name}
                </Link>
                <p className="text-xs text-carvao/55">{item.unit}</p>
                {item.quantity >= item.stockQuantity && (
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-terracota">
                    Limite de estoque ({item.stockQuantity})
                  </p>
                )}
              </div>

              <div className="flex items-center rounded-pill border border-carvao/20">
                <button
                  type="button"
                  aria-label="Diminuir quantidade"
                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                  className="px-3 py-1.5 text-carvao/70 hover:text-terracota"
                >
                  −
                </button>
                <span className="w-7 text-center text-sm font-medium">{item.quantity}</span>
                <button
                  type="button"
                  aria-label="Aumentar quantidade"
                  onClick={() => updateQuantity(item.productId, Math.min(item.quantity + 1, item.stockQuantity))}
                  disabled={item.quantity >= item.stockQuantity}
                  className="px-3 py-1.5 text-carvao/70 hover:text-terracota disabled:opacity-30"
                >
                  +
                </button>
              </div>

              <span className="price-tag w-24 shrink-0 text-right text-sm font-medium text-carvao">
                {formatBRL(item.priceCents * item.quantity)}
              </span>

              <button
                type="button"
                aria-label={`Remover ${item.name}`}
                onClick={() => removeItem(item.productId)}
                className="shrink-0 text-carvao/40 hover:text-terracota"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
                </svg>
              </button>
            </li>
          ))}
        </ul>

        <aside className="shrink-0 lg:w-72">
          <div className="border-2 border-mata p-5">
            <div className="flex items-center justify-between text-sm text-carvao/70">
              <span>Subtotal</span>
              <span className="price-tag font-medium text-carvao">{formatBRL(subtotalCents)}</span>
            </div>
            <p className="mt-1 text-xs text-carvao/45">Frete calculado no próximo passo.</p>

            <Button variant="primary" className="mt-5 w-full" onClick={() => navigate("/checkout")}>
              Finalizar pedido
            </Button>
          </div>
        </aside>
      </div>
    </div>
  )
}
