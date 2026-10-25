import type { Session } from "@supabase/supabase-js"
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { supabase } from "./supabase"

type AuthState = {
  session: Session | null
  isAdmin: boolean
  loading: boolean
  hasAnyAdmin: boolean | null
  refreshAdminStatus: () => Promise<void>
}

const AuthContext = createContext<AuthState | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [hasAnyAdmin, setHasAnyAdmin] = useState<boolean | null>(null)

  async function checkAdminStatus(currentSession: Session | null) {
    if (!currentSession) {
      setIsAdmin(false)
      return
    }
    const { data, error } = await supabase.rpc("is_admin")
    setIsAdmin(!error && data === true)
  }

  async function checkAnyAdminExists() {
    const { data, error } = await supabase.rpc("admin_exists")
    setHasAnyAdmin(!error && data === true)
  }

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      setSession(data.session)
      await checkAdminStatus(data.session)
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      setSession(newSession)
      await checkAdminStatus(newSession)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (session) {
      checkAnyAdminExists()
    }
  }, [session])

  async function refreshAdminStatus() {
    await checkAdminStatus(session)
    await checkAnyAdminExists()
  }

  return (
    <AuthContext.Provider value={{ session, isAdmin, loading, hasAnyAdmin, refreshAdminStatus }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
