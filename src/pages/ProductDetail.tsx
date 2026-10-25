import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Button } from "../components/Button"
import { useCart } from "../lib/CartContext"
import { getCategoryTone } from "../lib/categoryTone"
import { supabase } from "../lib/supabase"
import { useStoreSettings } from "../lib/useStoreSettings"

type ProductDetailData = {
  id: string
  name: string
  description: string
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

export function ProductDetail() {
  const { slug } = useParams()
  const [product, setProduct] = useState<ProductDetailData | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()
  const storeSettings = useStoreSettings()
  const navigate = useNavigate()

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    setNotFound(false)
    supabase
      .from("products")
      .select("*, categories(name, slug), brands(name)")
      .eq("slug", slug)
      .eq("active", true)
      .maybeSingle()
      .then(({ data }) => {
        if (!data) {
          setNotFound(true)
        } else {
          setProduct({
            id: data.id,
            name: data.name,
            description: data.description,
            brand: data.brands?.name ?? "",
            unit: data.unit,
            price_cents: data.price_cents,
            stock_quantity: data.stock_quantity,
            low_stock_threshold: data.low_stock_threshold,
            categoryName: data.categories?.name ?? "",
            categorySlug: data.categories?.slug ?? "",
          })
        }
        setLoading(false)
      })
  }, [slug])

  if (loading) return <p className="mx-auto max-w-content px-6 py-16 text-sm text-carvao/50">Carregando...</p>

  if (notFound || !product) {
    return (
      <div className="mx-auto max-w-content px-6 py-16 text-center">
        <p className="font-display text-xl text-carvao">Produto não encontrado</p>
        <Link to="/catalogo" className="mt-4 inline-block text-sm text-mata hover:underline">
          Voltar ao catálogo
        </Link>
      </div>
    )
  }

  const available = product.stock_quantity > 0
  const tone = getCategoryTone(product.categorySlug)
  const whatsappMessage = encodeURIComponent(
    `Olá! Tenho interesse no produto ${product.name}${product.brand ? ` (${product.brand})` : ""}, ${product.unit}.`,
  )
  const whatsappHref = storeSettings?.whatsapp
    ? `https://wa.me/${storeSettings.whatsapp}?text=${whatsappMessage}`
    : `https://wa.me/?text=${whatsappMessage}`

  function handleAddToCart() {
    if (!product) return
    addItem(
      {
        productId: product.id,
        slug: slug!,
        name: product.name,
        unit: product.unit,
        priceCents: product.price_cents,
        stockQuantity: product.stock_quantity,
      },
      quantity,
    )
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="mx-auto max-w-content px-6 py-10">
      <nav className="text-xs text-carvao/50">
        <Link to="/" className="hover:text-mata">Início</Link>
        {" / "}
        <Link to="/catalogo" className="hover:text-mata">Catálogo</Link>
        {product.categoryName && (
          <>
            {" / "}
            <Link to={`/catalogo?categoria=${product.categorySlug}`} className="hover:text-mata">
              {product.categoryName}
            </Link>
          </>
        )}
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className={`relative flex aspect-square flex-col justify-between border-2 border-carvao/15 p-6 ${panelStyles[tone]}`}>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] opacity-70">
            {product.categoryName}
          </span>
          <span className="price-tag self-end text-5xl font-medium leading-none sm:text-6xl">
            {(product.price_cents / 100).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>

        <div className="flex flex-col">
          {product.brand && (
            <p className="text-xs uppercase tracking-wide text-carvao/45">{product.brand}</p>
          )}
          <h1 className="mt-1 font-display text-3xl font-semibold text-carvao">{product.name}</h1>

          {product.description && (
            <p className="mt-4 text-sm leading-relaxed text-carvao/70">{product.description}</p>
          )}

          <div className="mt-6 flex items-center gap-3 text-sm text-carvao/60">
            <span>Unidade: {product.unit}</span>
            <span className="h-1 w-1 rounded-full bg-carvao/30" />
            {available ? (
              <span className="font-medium text-mata">
                {product.stock_quantity <= product.low_stock_threshold
                  ? `Últimas ${product.stock_quantity} unidades`
                  : "Em estoque"}
              </span>
            ) : (
              <span className="font-medium text-terracota">Indisponível no momento</span>
            )}
          </div>

          {available && (
            <div className="mt-8 flex items-center gap-3">
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
                  onClick={() => setQuantity((q) => Math.min(product.stock_quantity, q + 1))}
                  className="px-3 py-2 text-carvao/70 hover:text-mata"
                >
                  +
                </button>
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-4">
            <Button variant="primary" disabled={!available} onClick={handleAddToCart}>
              {!available ? "Indisponível" : added ? "Adicionado ✓" : "Adicionar ao carrinho"}
            </Button>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost">Consultar pelo WhatsApp</Button>
            </a>
          </div>

          {added && (
            <button
              type="button"
              onClick={() => navigate("/carrinho")}
              className="mt-3 w-fit text-xs font-medium text-mata hover:underline"
            >
              Ver carrinho →
            </button>
          )}

          <p className="mt-8 text-xs text-carvao/40">
            Preço e disponibilidade são validados no servidor no momento da compra.
          </p>
        </div>
      </div>
    </div>
  )
}
