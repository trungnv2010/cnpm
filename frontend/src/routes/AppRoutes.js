import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { NotFound } from "@/components";
import AdminLayout from "@/components/navbar/AdminLayout";
import Admin from "@/pages/Admin";
import Orders from "@/pages/Admin/orders/Orders";
import Products from "@/pages/Admin/Products/Products";
import ListOrder from "../pages/Admin/orders/ListOrder";
import User from "@/pages/User"
import ShopPage from "../pages/User/ShopPage/ShopPage";
import Product from "../pages/User/Product/Product";
import Cart from "../pages/User/Cart/Cart";
import AddProduct from "../pages/Admin/Products/AddProduct";
import ProductDetail from "../pages/Admin/Products/ProductDetails";
import UserLayout from "../pages/User/Navbar";
import VoucherList from "../pages/Admin/voucher/voucher";
import RatingStatistics from "../pages/Admin/reviews/review";
import Customer from "../pages/Admin/Customer/customer";
import Service from "../pages/Admin/Service/service";

const Home = lazy(() => import("@/pages/HomePage/Home"));

// Helper function to dynamically generate routes
function generateDynamicRoutes() {
  const pages = require.context("@/pages", true, /\.(js|jsx|ts|tsx|mdx)$/);
  return pages.keys()
    .map((filePath) => {
      // Skip Home component
      if (filePath.includes("HomePage/Home")) return null;

      const Component = lazy(() =>
        import(`@/pages/${filePath.replace("./", "")}`)
      );
      const path = filePath
        .replace("./", "/")
        .replace(/\/index|\.(js|jsx|ts|tsx|mdx)$/g, "")
        .toLowerCase();

      return { path, Component };
    })
    .filter(Boolean);
}

// Generate dynamic routes
const dynamicRoutes = generateDynamicRoutes();

function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Admin />} /> 
          <Route path="orders/create" element={<Orders />} />
          <Route path="orders" element={<ListOrder />} />
          <Route path="products" element={<Products />} />
          <Route path="products/create" element={<AddProduct />} />
          <Route path="products/:id" element={<ProductDetail/>}/>
          <Route path="voucher" element={<VoucherList/>}/>
          <Route path="reviews" element={<RatingStatistics/>}/>
          <Route path="customer" element={<Customer/>}/>
          <Route path="service" element={<Service/>}/>
        </Route>

        <Route path="/user">
          <Route index element={<User/>}/>
          <Route path="shoppage/:category" element={<ShopPage/>}/>
          <Route path="products/:id" element={<Product/>}/>
          <Route path="cart" element={<Cart/>}/>
        </Route>

    
        <Route path="/" element={<User />} />


        {dynamicRoutes.map(({ path, Component }, index) => (
          <Route key={index} path={path} element={<Component />} />
        ))}

        {/* Fallback for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
