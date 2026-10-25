import { useState } from "react"
import { Navigate } from "react-router-dom"
import { Button } from "../../components/Button"
import { Logo } from "../../components/Logo"
import { useAuth } from "../../lib/AuthContext"
import { supabase } from "../../lib/supabase"

export function AdminLogin() {
  const { session, loading } = useAuth()
  const [mode, setMode] = useState<"login" | "signup">("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (loading) return null
  if (session) return <Navigate to="/admin" replace />

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setError(null)
    setInfo(null)
    setSubmitting(true)

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(traduzErro(error.message))
    } else {
      if (password.length < 8) {
        setError("A senha precisa ter ao menos 8 caracteres.")
        setSubmitting(false)
        return
      }
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) {
        setError(traduzErro(error.message))
      } else {
        setInfo("Conta criada. Verifique seu e-mail para confirmar o acesso, se exigido, e faça login.")
        setMode("login")
      }
    }

    setSubmitting(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-creme-claro px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        <div className="border-2 border-mata bg-branco p-8">
          <h1 className="font-display text-xl font-semibold text-carvao">
            {mode === "login" ? "Acesso administrativo" : "Criar conta administrativa"}
          </h1>
          <p className="mt-1 text-sm text-carvao/60">
            {mode === "login"
              ? "Entre com suas credenciais do painel."
              : "Primeira conta: depois de criar, use o botão de configuração inicial para virar administrador."}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <label className="flex flex-col gap-1.5 text-sm text-carvao/80">
              E-mail
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="rounded-card border border-carvao/15 px-3 py-2 text-sm outline-none focus:border-mata"
              />
            </label>

            <label className="flex flex-col gap-1.5 text-sm text-carvao/80">
              Senha
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="rounded-card border border-carvao/15 px-3 py-2 text-sm outline-none focus:border-mata"
              />
            </label>

            {error && <p className="text-sm text-terracota-escuro">{error}</p>}
            {info && <p className="text-sm text-mata">{info}</p>}

            <Button type="submit" variant="primary" disabled={submitting} className="mt-2 w-full">
              {submitting ? "Aguarde..." : mode === "login" ? "Entrar" : "Criar conta"}
            </Button>
          </form>

          <button
            type="button"
            onClick={() => {
              setMode(mode === "login" ? "signup" : "login")
              setError(null)
              setInfo(null)
            }}
            className="mt-4 w-full text-center text-xs text-carvao/50 hover:text-mata"
          >
            {mode === "login" ? "Primeira vez? Criar conta administrativa" : "Já tenho conta, entrar"}
          </button>
        </div>
      </div>
    </div>
  )
}

function traduzErro(message: string) {
  if (message.includes("Invalid login credentials")) return "E-mail ou senha incorretos."
  if (message.includes("already registered")) return "Este e-mail já tem uma conta."
  return message
}
