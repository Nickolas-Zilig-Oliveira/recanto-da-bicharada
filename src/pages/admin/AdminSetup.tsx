import { useState } from "react"
import { Navigate } from "react-router-dom"
import { Button } from "../../components/Button"
import { useAuth } from "../../lib/AuthContext"
import { supabase } from "../../lib/supabase"

export function AdminSetup() {
  const { session, isAdmin, loading, refreshAdminStatus } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (loading) return null
  if (!session) return <Navigate to="/admin/login" replace />
  if (isAdmin) return <Navigate to="/admin" replace />

  async function handleClaim() {
    setSubmitting(true)
    setError(null)
    const { error } = await supabase.rpc("claim_first_admin")
    if (error) {
      setError(
        error.message.includes("admin_already_provisioned")
          ? "Já existe um administrador. Peça para ele te adicionar pelo painel."
          : error.message,
      )
      setSubmitting(false)
      return
    }
    await refreshAdminStatus()
    setSubmitting(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-creme-claro px-6">
      <div className="w-full max-w-sm rounded-card bg-branco p-8 text-center shadow-card">
        <h1 className="font-display text-xl text-carvao">Configuração inicial</h1>
        <p className="mt-2 text-sm text-carvao/60">
          Nenhum administrador foi configurado ainda. Clique abaixo para tornar esta conta
          ({session.user.email}) a primeira administradora do painel. Essa ação só funciona uma vez.
        </p>

        {error && <p className="mt-4 text-sm text-terracota-escuro">{error}</p>}

        <Button onClick={handleClaim} disabled={submitting} variant="primary" className="mt-6 w-full">
          {submitting ? "Configurando..." : "Tornar esta conta administradora"}
        </Button>
      </div>
    </div>
  )
}
