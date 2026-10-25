import { useState } from "react"
import { Link } from "react-router-dom"
import { useCart } from "../lib/CartContext"
import { getCategoryTone } from "../lib/categoryTone"
import { Button } from "./Button"

export type ProductCardData = {
  id: string
  slug: string
  name: string
  brand: string
  unit: string
  price_cents: number
  stock_quantity: number
  low_stock_threshold: number
  categoryName: string
  categorySlug: string
}

const accentBar = {
  mata: "bg-mata",
  terracota: "bg-terracota",
  "verde-suave": "bg-mata/40",
}

export function ProductCard({ product }: { product: ProductCardData }) {
  const available = product.stock_quantity > 0
  const lowStock = available && product.stock_quantity <= product.low_stock_threshold
  const tone = getCategoryTone(product.categorySlug)
  const { addItem, items } = useCart()
  const inCart = items.find((i) => i.productId === product.id)?.quantity ?? 0
  const [added, setAdded] = useState(false)

  function handleAdd() {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      unit: product.unit,
      priceCents: product.price_cents,
      stockQuantity: product.stock_quantity,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <article className="group flex flex-col border border-carvao/10 bg-branco transition-colors duration-150 hover:border-mata/30">
      <Link to={`/produto/${product.slug}`} className="block">
        <div className="surface-sand relative flex h-36 flex-col overflow-hidden">
          <span className={`h-1 w-full ${accentBar[tone]}`} />
          {!available && (
            <span className="absolute inset-0 flex items-center justify-center bg-carvao/50 text-xs font-semibold text-creme">
              Indisponível
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-carvao/40">
            {product.categoryName}
            {product.brand && ` · ${product.brand}`}
          </p>
          <Link to={`/produto/${product.slug}`}>
            <h3 className="mt-0.5 text-sm font-semibold text-carvao hover:text-mata">{product.name}</h3>
          </Link>
          <p className="text-xs text-carvao/55">{product.unit}</p>
        </div>

        {lowStock && (
          <p className="text-[11px] font-medium text-terracota">
            Últimas {product.stock_quantity} unidades
          </p>
        )}

        <div className="mt-auto flex flex-col gap-2 pt-1">
          <span className="font-display text-lg text-mata">
            {(product.price_cents / 100).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
          <Button
            variant="primary"
            className="w-full px-4 py-2 text-xs"
            disabled={!available || inCart >= product.stock_quantity}
            onClick={handleAdd}
          >
            {!available
              ? "Indisponível"
              : added
                ? "Adicionado ✓"
                : inCart >= product.stock_quantity
                  ? "Limite no carrinho"
                  : "Adicionar"}
          </Button>
        </div>
      </div>
    </article>
  )
}
