import { useState } from "react"
import { Link } from "react-router-dom"
import { useCart } from "../lib/CartContext"
import { getCategoryTone } from "../lib/categoryTone"
import { Sprig } from "./BrandMotif"
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

const toneStyles = {
  mata: "bg-mata text-creme/20",
  terracota: "bg-terracota text-creme/20",
  "verde-suave": "bg-verde-suave text-mata/15",
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
        <div className={`relative flex h-36 items-end overflow-hidden ${toneStyles[tone]}`}>
          <Sprig
            strokeWidth={1}
            className="pointer-events-none absolute -right-3 -top-2 h-44 w-28 transition-transform duration-300 group-hover:translate-y-1"
          />
          {!available && (
            <span className="absolute inset-0 flex items-center justify-center bg-carvao/55 text-xs font-semibold text-creme">
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
