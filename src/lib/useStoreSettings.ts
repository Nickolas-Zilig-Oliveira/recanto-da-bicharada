import { useEffect, useState } from "react"
import { supabase } from "./supabase"
import type { Tables } from "../types/database"

export function useStoreSettings() {
  const [settings, setSettings] = useState<Tables<"store_settings"> | null>(null)

  useEffect(() => {
    supabase
      .from("store_settings")
      .select("*")
      .single()
      .then(({ data }) => setSettings(data))
  }, [])

  return settings
}
