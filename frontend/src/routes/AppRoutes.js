import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { NotFound } from "@/components";
import AdminLayout from "@/components/navbar/AdminLayout";
import Admin from "@/pages/Admin";
import Orders from "@/pages/Admin/orders/Orders";
import Products from "@/pages/Admin/Products/Products";
import ListOrder from "../pages/Admin/orders/ListOrder";

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
          
        </Route>

        <Route path="/" element={<Home />} />

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
