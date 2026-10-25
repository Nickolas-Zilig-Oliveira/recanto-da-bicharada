import { useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { Button } from "../components/Button"
import { getCategoryById, getProductBySlug } from "../data/catalog"

const toneStyles = {
  mata: "bg-mata/90",
  terracota: "bg-terracota/90",
  "verde-suave": "bg-verde-suave",
}

export function ProductDetail() {
  const { slug } = useParams()
  const [quantity, setQuantity] = useState(1)

  const product = slug ? getProductBySlug(slug) : undefined

  if (!product) {
    return <Navigate to="/catalogo" replace />
  }

  const category = getCategoryById(product.categoryId)
  const available = product.stock > 0
  const whatsappMessage = encodeURIComponent(
    `Olá! Tenho interesse no produto ${product.name} (${product.brand}, ${product.unit}).`,
  )

  return (
    <div className="mx-auto max-w-content px-6 py-10">
      <nav className="text-xs text-carvao/50">
        <Link to="/" className="hover:text-mata">Início</Link>
        {" / "}
        <Link to="/catalogo" className="hover:text-mata">Catálogo</Link>
        {category && (
          <>
            {" / "}
            <Link to={`/catalogo?categoria=${category.slug}`} className="hover:text-mata">
              {category.name}
            </Link>
          </>
        )}
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className={`flex aspect-square items-center justify-center rounded-card ${toneStyles[product.tone]}`}>
          <svg viewBox="0 0 48 48" className="h-24 w-24 opacity-80" aria-hidden="true">
            <path
              d="M24 8c6 4 10 10 10 17a10 10 0 1 1-20 0c0-7 4-13 10-17Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-creme"
            />
          </svg>
        </div>

        <div className="flex flex-col">
          <p className="text-xs uppercase tracking-wide text-carvao/45">{product.brand}</p>
          <h1 className="mt-1 font-display text-3xl text-carvao">{product.name}</h1>

          <p className="mt-4 text-sm leading-relaxed text-carvao/70">{product.description}</p>

          <div className="mt-6 flex items-center gap-3 text-sm text-carvao/60">
            <span>Unidade: {product.unit}</span>
            <span className="h-1 w-1 rounded-full bg-carvao/30" />
            {available ? (
              <span className="font-medium text-mata">
                {product.stock <= 5 ? `Últimas ${product.stock} unidades` : "Em estoque"}
              </span>
            ) : (
              <span className="font-medium text-terracota">Indisponível no momento</span>
            )}
          </div>

          <p className="mt-6 font-display text-4xl text-mata">
            {product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </p>

          {available && (
            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-center rounded-pill border border-carvao/15">
                <button
                  type="button"
                  aria-label="Diminuir quantidade"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-carvao/70 hover:text-mata"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                <button
                  type="button"
                  aria-label="Aumentar quantidade"
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="px-3 py-2 text-carvao/70 hover:text-mata"
                >
                  +
                </button>
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-4">
            <Button variant="primary" disabled={!available}>
              {available ? "Adicionar ao carrinho" : "Indisponível"}
            </Button>
            <a
              href={`https://wa.me/?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost">Consultar pelo WhatsApp</Button>
            </a>
          </div>

          <p className="mt-8 text-xs text-carvao/40">
            Preço e disponibilidade exibidos aqui são de exemplo e serão validados no servidor
            durante a implementação do checkout (Fase 4).
          </p>
        </div>
      </div>
    </div>
  )
}
