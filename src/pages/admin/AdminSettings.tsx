import { useEffect, useState } from "react"
import { Button } from "../../components/Button"
import { supabase } from "../../lib/supabase"

export function AdminSettings() {
  const [tradeName, setTradeName] = useState("")
  const [phone, setPhone] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [address, setAddress] = useState("")
  const [shippingFlat, setShippingFlat] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    supabase
      .from("store_settings")
      .select("*")
      .single()
      .then(({ data }) => {
        if (data) {
          setTradeName(data.trade_name)
          setPhone(data.phone ?? "")
          setWhatsapp(data.whatsapp ?? "")
          setAddress(data.address ?? "")
          const rules = data.shipping_rules as { flat_cents?: number } | null
          setShippingFlat(rules?.flat_cents ? (rules.flat_cents / 100).toString() : "")
        }
        setLoading(false)
      })
  }, [])

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setSaving(true)
    setSaved(false)
    setError(null)

    const flatCents = Math.round(parseFloat(shippingFlat.replace(",", ".")) * 100)

    const { error } = await supabase
      .from("store_settings")
      .update({
        trade_name: tradeName,
        phone,
        whatsapp,
        address,
        shipping_rules: { flat_cents: isNaN(flatCents) ? 0 : flatCents },
      })
      .eq("id", true)

    setSaving(false)
    if (error) {
      setError(error.message)
      return
    }
    setSaved(true)
  }

  if (loading) return <p className="text-sm text-carvao/50">Carregando...</p>

  return (
    <div className="max-w-xl">
      <h1 className="font-display text-2xl text-carvao">Configurações da loja</h1>
      <p className="mt-1 text-sm text-carvao/60">
        Dados exibidos no site (rodapé, contato). Nenhum segredo ou credencial de pagamento vai aqui.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-sm text-carvao/80">
          Nome comercial
          <input
            value={tradeName}
            onChange={(event) => setTradeName(event.target.value)}
            className="rounded-card border border-carvao/15 px-3 py-2 text-sm outline-none focus:border-mata"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm text-carvao/80">
          Telefone
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className="rounded-card border border-carvao/15 px-3 py-2 text-sm outline-none focus:border-mata"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm text-carvao/80">
          WhatsApp (com DDI, ex: 5511999999999)
          <input
            value={whatsapp}
            onChange={(event) => setWhatsapp(event.target.value)}
            className="rounded-card border border-carvao/15 px-3 py-2 text-sm outline-none focus:border-mata"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm text-carvao/80">
          Endereço
          <textarea
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            rows={2}
            className="rounded-card border border-carvao/15 px-3 py-2 text-sm outline-none focus:border-mata"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm text-carvao/80">
          Taxa de entrega (R$) — retirada na loja é sempre grátis
          <input
            inputMode="decimal"
            value={shippingFlat}
            onChange={(event) => setShippingFlat(event.target.value)}
            placeholder="15,00"
            className="rounded-card border border-carvao/15 px-3 py-2 text-sm outline-none focus:border-mata"
          />
        </label>

        {error && <p className="text-sm text-terracota-escuro">{error}</p>}
        {saved && <p className="text-sm text-mata">Configurações salvas.</p>}

        <Button type="submit" variant="primary" disabled={saving} className="w-fit">
          {saving ? "Salvando..." : "Salvar"}
        </Button>
      </form>
    </div>
  )
}
