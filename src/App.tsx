import { CategoryGrid } from "./components/CategoryGrid"
import { EditorialSection } from "./components/EditorialSection"
import { FeaturedProducts } from "./components/FeaturedProducts"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { Hero } from "./components/Hero"

function App() {
  return (
    <div className="min-h-screen bg-creme-claro">
      <Header />
      <main>
        <Hero />
        <CategoryGrid />
        <FeaturedProducts />
        <EditorialSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
