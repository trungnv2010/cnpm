import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { NotFound } from "@/components";

const Home = lazy(() => import("@/pages/HomePage/Home"));

const pages = require.context("@/pages", true, /\.(js|jsx|ts|tsx|mdx)$/);

const dynamicRoutes = pages
  .keys()
  .map((filePath) => {
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

function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        {dynamicRoutes.map(({ path, Component }, index) => (
          <Route key={index} path={path} element={<Component />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
