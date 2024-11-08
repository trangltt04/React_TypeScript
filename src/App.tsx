import { Route, Routes } from "react-router-dom";
import "./App.scss";
import AdminLayout from "./components/AdminLayout";
import AuthForm from "./components/AuthForm";
import ClientLayout from "./components/ClientLayout";
import Dashboard from "./pages/admin/Dashboard";
import ProductForm from "./pages/admin/ProductForm";
import CartPage from "./pages/CartPage";
import Home from "./pages/Home";
import Order from "./pages/OrderPage";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<Home />} />
          <Route path="/order" element={<Order />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/admin/product-add" element={<ProductForm />} />
          <Route path="/admin/product-edit/:id" element={<ProductForm />} />
        </Route>

        <Route path="/register" element={<AuthForm />} />
        <Route path="/login" element={<AuthForm isLogin />} />
      </Routes>
    </>
  );
}

export default App;
