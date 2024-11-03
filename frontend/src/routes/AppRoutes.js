import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "@/components";

const Home = lazy(() => import("../pages/HomePage/Home"));

const pages = require.context("../pages", true, /\.(js|jsx|ts|tsx|mdx)$/);

const dynamicRoutes = pages
  .keys()
  .map((filePath) => {
    if (filePath.includes("HomePage/Home")) return null;

    const Component = lazy(pages(filePath).default);
    const path = filePath
      .replace("./", "/")
      .replace(/\/index|\.(js|jsx|ts|tsx|mdx)$/g, "")
      .toLowerCase();

    return { path, Component };
  })
  .filter(Boolean);

function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          {dynamicRoutes.map(({ path, Component }, index) => (
            <Route key={index} path={path} element={<Component />} />
          ))}
        </Routes>
      </Layout>
    </Suspense>
  );
}

export default AppRoutes;
