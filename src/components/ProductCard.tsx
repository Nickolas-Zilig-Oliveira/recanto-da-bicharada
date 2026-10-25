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

const panelStyles = {
  mata: "bg-mata text-creme",
  terracota: "bg-terracota text-creme",
  "verde-suave": "bg-verde-suave text-mata",
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
    <article className="group flex flex-col border-2 border-carvao/15 bg-branco transition-colors duration-150 hover:border-mata">
      <Link to={`/produto/${product.slug}`} className="block">
        <div className={`relative flex h-32 flex-col justify-between p-3 ${panelStyles[tone]}`}>
          <span className="text-[10px] font-semibold uppercase tracking-wide opacity-70">
            {product.categoryName}
          </span>
          <span className="price-tag self-end text-2xl font-medium leading-none">
            {(product.price_cents / 100).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
          {!available && (
            <span className="absolute inset-0 flex items-center justify-center bg-carvao/60 text-xs font-bold uppercase tracking-wide text-creme">
              Indisponível
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div>
          {product.brand && (
            <p className="text-[11px] uppercase tracking-wide text-carvao/40">{product.brand}</p>
          )}
          <Link to={`/produto/${product.slug}`}>
            <h3 className="mt-0.5 text-sm font-semibold text-carvao hover:text-terracota">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-carvao/55">{product.unit}</p>
        </div>

        {lowStock && (
          <p className="text-[11px] font-semibold uppercase tracking-wide text-terracota">
            Últimas {product.stock_quantity} un.
          </p>
        )}

        <Button
          variant="primary"
          className="mt-auto w-full px-4 py-2 text-xs"
          disabled={!available || inCart >= product.stock_quantity}
          onClick={handleAdd}
        >
          {!available
            ? "Indisponível"
            : added
              ? "Adicionado ✓"
              : inCart >= product.stock_quantity
                ? "Limite"
                : "Adicionar"}
        </Button>
      </div>
    </article>
  )
}
