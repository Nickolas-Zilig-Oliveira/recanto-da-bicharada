import { Outlet } from "react-router-dom"
import { Footer } from "./Footer"
import { Header } from "./Header"

export function Layout() {
  return (
    <div className="min-h-screen bg-creme-claro">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
