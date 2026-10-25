import { Route, Routes } from "react-router-dom"
import { Layout } from "./components/Layout"
import { Cart } from "./pages/Cart"
import { Catalog } from "./pages/Catalog"
import { Checkout } from "./pages/Checkout"
import { Home } from "./pages/Home"
import { OrderConfirmation } from "./pages/OrderConfirmation"
import { ProductDetail } from "./pages/ProductDetail"
import { AdminDashboard } from "./pages/admin/AdminDashboard"
import { AdminLayout } from "./pages/admin/AdminLayout"
import { AdminLogin } from "./pages/admin/AdminLogin"
import { AdminOrders } from "./pages/admin/AdminOrders"
import { AdminProductForm } from "./pages/admin/AdminProductForm"
import { AdminProductList } from "./pages/admin/AdminProductList"
import { AdminSettings } from "./pages/admin/AdminSettings"
import { AdminSetup } from "./pages/admin/AdminSetup"
import { AdminStock } from "./pages/admin/AdminStock"

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="catalogo" element={<Catalog />} />
        <Route path="produto/:slug" element={<ProductDetail />} />
        <Route path="carrinho" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="pedido/:orderId" element={<OrderConfirmation />} />
      </Route>

      <Route path="admin/login" element={<AdminLogin />} />
      <Route path="admin/setup" element={<AdminSetup />} />

      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="produtos" element={<AdminProductList />} />
        <Route path="produtos/novo" element={<AdminProductForm />} />
        <Route path="produtos/:id" element={<AdminProductForm />} />
        <Route path="estoque" element={<AdminStock />} />
        <Route path="pedidos" element={<AdminOrders />} />
        <Route path="configuracoes" element={<AdminSettings />} />
      </Route>
    </Routes>
  )
}

export default App
