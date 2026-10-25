import { CategoryGrid } from "../components/CategoryGrid"
import { EditorialSection } from "../components/EditorialSection"
import { FeaturedProducts } from "../components/FeaturedProducts"
import { Hero } from "../components/Hero"

export function Home() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <FeaturedProducts />
      <EditorialSection />
    </>
  )
}
