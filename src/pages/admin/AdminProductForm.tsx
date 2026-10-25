import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button } from "../../components/Button"
import { supabase } from "../../lib/supabase"
import type { Tables } from "../../types/database"

type Category = Tables<"categories">
type Brand = Tables<"brands">

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export function AdminProductForm() {
  const { id } = useParams()
  const isEditing = Boolean(id)
  const navigate = useNavigate()

  const [categories, setCategories] = useState<Category[]>([])
  const [brands, setBrands] = useState<Brand[]>([])
  const [newBrandName, setNewBrandName] = useState("")

  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [slugTouched, setSlugTouched] = useState(false)
  const [description, setDescription] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [brandId, setBrandId] = useState("")
  const [sku, setSku] = useState("")
  const [unit, setUnit] = useState("unidade")
  const [price, setPrice] = useState("")
  const [initialStock, setInitialStock] = useState("0")
  const [lowStockThreshold, setLowStockThreshold] = useState("5")
  const [active, setActive] = useState(true)

  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadOptions() {
      const [{ data: cats }, { data: brs }] = await Promise.all([
        supabase.from("categories").select("*").order("position"),
        supabase.from("brands").select("*").order("name"),
      ])
      setCategories(cats ?? [])
      setBrands(brs ?? [])
    }
    loadOptions()
  }, [])

  useEffect(() => {
    if (!isEditing) return
    async function loadProduct() {
      const { data, error } = await supabase.from("products").select("*").eq("id", id as string).single()
      if (error || !data) {
        setError("Produto não encontrado.")
        setLoading(false)
        return
      }
      setName(data.name)
      setSlug(data.slug)
      setSlugTouched(true)
      setDescription(data.description)
      setCategoryId(data.category_id ?? "")
      setBrandId(data.brand_id ?? "")
      setSku(data.sku ?? "")
      setUnit(data.unit)
      setPrice((data.price_cents / 100).toString())
      setInitialStock(data.stock_quantity.toString())
      setLowStockThreshold(data.low_stock_threshold.toString())
      setActive(data.active)
      setLoading(false)
    }
    loadProduct()
  }, [id, isEditing])

  function handleNameChange(value: string) {
    setName(value)
    if (!slugTouched) setSlug(slugify(value))
  }

  async function handleAddBrand() {
    if (!newBrandName.trim()) return
    const { data, error } = await supabase
      .from("brands")
      .insert({ name: newBrandName.trim() })
      .select()
      .single()
    if (error) {
      setError(error.message)
      return
    }
    setBrands((prev) => [...prev, data].sort((a, b) => a.name.localeCompare(b.name)))
    setBrandId(data.id)
    setNewBrandName("")
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setError(null)

    const priceCents = Math.round(parseFloat(price.replace(",", ".")) * 100)
    if (!name || !categoryId || isNaN(priceCents) || priceCents < 0) {
      setError("Preencha nome, categoria e um preço válido.")
      return
    }

    setSaving(true)

    const payload = {
      name,
      slug: slug || slugify(name),
      description,
      category_id: categoryId,
      brand_id: brandId || null,
      sku: sku || null,
      unit,
      price_cents: priceCents,
      low_stock_threshold: parseInt(lowStockThreshold, 10) || 5,
      active,
    }

    if (isEditing) {
      const { error } = await supabase.from("products").update(payload).eq("id", id as string)
      if (error) {
        setError(error.message)
        setSaving(false)
        return
      }
    } else {
      const { data, error } = await supabase
        .from("products")
        .insert({ ...payload, stock_quantity: 0 })
        .select()
        .single()
      if (error) {
        setError(error.message)
        setSaving(false)
        return
      }

      const stock = parseInt(initialStock, 10) || 0
      if (stock > 0) {
        const { error: stockError } = await supabase.rpc("adjust_stock", {
          p_product_id: data.id,
          p_type: "entrada",
          p_quantity: stock,
          p_reason: "Estoque inicial no cadastro",
        })
        if (stockError) {
          setError(`Produto criado, mas falhou ao definir estoque inicial: ${stockError.message}`)
          setSaving(false)
          navigate(`/admin/produtos/${data.id}`)
          return
        }
      }
    }

    setSaving(false)
    navigate("/admin/produtos")
  }

  if (loading) return <p className="text-sm text-carvao/50">Carregando...</p>

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-semibold text-carvao">
        {isEditing ? "Editar produto" : "Novo produto"}
      </h1>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm text-carvao/80">
            Nome do produto
            <input
              required
              value={name}
              onChange={(event) => handleNameChange(event.target.value)}
              className="rounded-card border border-carvao/15 px-3 py-2 text-sm outline-none focus:border-mata"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm text-carvao/80">
            Slug (URL)
            <input
              required
              value={slug}
              onChange={(event) => {
                setSlug(slugify(event.target.value))
                setSlugTouched(true)
              }}
              className="rounded-card border border-carvao/15 px-3 py-2 text-sm outline-none focus:border-mata"
            />
          </label>
        </div>

        <label className="flex flex-col gap-1.5 text-sm text-carvao/80">
          Descrição
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={3}
            className="rounded-card border border-carvao/15 px-3 py-2 text-sm outline-none focus:border-mata"
          />
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm text-carvao/80">
            Categoria
            <select
              required
              value={categoryId}
              onChange={(event) => setCategoryId(event.target.value)}
              className="rounded-card border border-carvao/15 px-3 py-2 text-sm outline-none focus:border-mata"
            >
              <option value="">Selecione...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </label>

          <div className="flex flex-col gap-1.5 text-sm text-carvao/80">
            Marca
            <div className="flex gap-2">
              <select
                value={brandId}
                onChange={(event) => setBrandId(event.target.value)}
                className="flex-1 rounded-card border border-carvao/15 px-3 py-2 text-sm outline-none focus:border-mata"
              >
                <option value="">Sem marca</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-1 flex gap-2">
              <input
                placeholder="Nova marca..."
                value={newBrandName}
                onChange={(event) => setNewBrandName(event.target.value)}
                className="flex-1 rounded-card border border-carvao/15 px-3 py-1.5 text-xs outline-none focus:border-mata"
              />
              <button
                type="button"
                onClick={handleAddBrand}
                className="rounded-card bg-mata/10 px-3 py-1.5 text-xs font-medium text-mata hover:bg-mata/20"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <label className="flex flex-col gap-1.5 text-sm text-carvao/80">
            Preço (R$)
            <input
              required
              inputMode="decimal"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              placeholder="0,00"
              className="rounded-card border border-carvao/15 px-3 py-2 text-sm outline-none focus:border-mata"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm text-carvao/80">
            Unidade / embalagem
            <input
              value={unit}
              onChange={(event) => setUnit(event.target.value)}
              placeholder="ex: 15kg, unidade"
              className="rounded-card border border-carvao/15 px-3 py-2 text-sm outline-none focus:border-mata"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm text-carvao/80">
            SKU (código interno)
            <input
              value={sku}
              onChange={(event) => setSku(event.target.value)}
              className="rounded-card border border-carvao/15 px-3 py-2 text-sm outline-none focus:border-mata"
            />
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          {!isEditing && (
            <label className="flex flex-col gap-1.5 text-sm text-carvao/80">
              Estoque inicial
              <input
                inputMode="numeric"
                value={initialStock}
                onChange={(event) => setInitialStock(event.target.value)}
                className="rounded-card border border-carvao/15 px-3 py-2 text-sm outline-none focus:border-mata"
              />
            </label>
          )}

          <label className="flex flex-col gap-1.5 text-sm text-carvao/80">
            Alerta de estoque baixo
            <input
              inputMode="numeric"
              value={lowStockThreshold}
              onChange={(event) => setLowStockThreshold(event.target.value)}
              className="rounded-card border border-carvao/15 px-3 py-2 text-sm outline-none focus:border-mata"
            />
          </label>

          <label className="mt-6 flex items-center gap-2 text-sm text-carvao/80">
            <input
              type="checkbox"
              checked={active}
              onChange={(event) => setActive(event.target.checked)}
              className="h-4 w-4 rounded border-carvao/30"
            />
            Produto ativo (visível na loja)
          </label>
        </div>

        {isEditing && (
          <p className="text-xs text-carvao/45">
            Estoque é alterado pela tela de Estoque, não por aqui — garante histórico de movimentações.
          </p>
        )}

        {error && (
          <p className="rounded-card bg-terracota/10 px-4 py-2 text-sm text-terracota-escuro">{error}</p>
        )}

        <div className="flex gap-3">
          <Button type="submit" variant="primary" disabled={saving}>
            {saving ? "Salvando..." : isEditing ? "Salvar alterações" : "Criar produto"}
          </Button>
          <Button type="button" variant="ghost" onClick={() => navigate("/admin/produtos")}>
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  )
}
