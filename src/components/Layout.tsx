import { useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { Footer } from "./Footer"
import { Header } from "./Header"

function ScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 })
      return
    }

    const id = hash.slice(1)
    // Sections like #categorias render after an async fetch, so the element
    // may not exist on the first paint — retry briefly instead of giving up.
    let attempts = 0
    const timer = setInterval(() => {
      const el = document.getElementById(id)
      attempts += 1
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
        clearInterval(timer)
      } else if (attempts > 20) {
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [pathname, hash])

  return null
}

export function Layout() {
  return (
    <div className="min-h-screen bg-creme-claro">
      <ScrollToHash />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
