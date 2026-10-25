import { Route, Routes } from "react-router-dom"
import { Layout } from "./components/Layout"
import { Catalog } from "./pages/Catalog"
import { Home } from "./pages/Home"
import { ProductDetail } from "./pages/ProductDetail"

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="catalogo" element={<Catalog />} />
        <Route path="produto/:slug" element={<ProductDetail />} />
      </Route>
    </Routes>
  )
}

export default App
