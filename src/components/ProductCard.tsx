import { Link } from "react-router-dom"
import type { Product } from "../types/product"
import { Button } from "./Button"

const toneStyles: Record<Product["tone"], string> = {
  mata: "bg-mata/90",
  terracota: "bg-terracota/90",
  "verde-suave": "bg-verde-suave",
}

export function ProductCard({ product, categoryName }: { product: Product; categoryName: string }) {
  const available = product.stock > 0
  const lowStock = available && product.stock <= 5

  return (
    <article className="group flex flex-col overflow-hidden rounded-card bg-branco shadow-card transition-shadow duration-200 hover:shadow-lifted">
      <Link to={`/produto/${product.slug}`} className="block">
        <div className={`relative flex h-40 items-center justify-center ${toneStyles[product.tone]}`}>
          <svg viewBox="0 0 48 48" className="h-12 w-12 opacity-80" aria-hidden="true">
            <path
              d="M24 8c6 4 10 10 10 17a10 10 0 1 1-20 0c0-7 4-13 10-17Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-creme"
            />
          </svg>
          <span className="absolute left-3 top-3 rounded-pill bg-branco/90 px-2.5 py-1 text-[11px] font-medium text-carvao">
            {categoryName}
          </span>
          {!available && (
            <span className="absolute inset-0 flex items-center justify-center bg-carvao/50 text-xs font-semibold text-creme">
              Indisponível
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-carvao/45">{product.brand}</p>
          <Link to={`/produto/${product.slug}`}>
            <h3 className="text-sm font-semibold text-carvao hover:text-mata">{product.name}</h3>
          </Link>
          <p className="text-xs text-carvao/60">{product.unit}</p>
        </div>

        {lowStock && (
          <p className="text-[11px] font-medium text-terracota">Últimas {product.stock} unidades</p>
        )}

        <div className="mt-auto flex flex-col gap-2">
          <span className="font-display text-lg text-mata">
            {product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </span>
          <Button variant="primary" className="w-full px-4 py-2 text-xs" disabled={!available}>
            {available ? "Adicionar" : "Indisponível"}
          </Button>
        </div>
      </div>
    </article>
  )
}
