import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/home.jsx";
import ProductsPage from "./Pages/products.jsx";
import CategoryProductsPage from "./Pages/categoryProducts.jsx";
import ErrorPage from "./Pages/error.jsx";
import DetailProductPage from "./Pages/detailProducts.jsx";
import CartProvider from "./context/CartContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    // errorElement: <ErrorPage />,
  },
  {
    path: "/products",
    element: <ProductsPage />,
  },
  {
    path: "/products/:slug",
    element: <DetailProductPage />,
  },
  {
    path: "/category/:slug",
    element: <CategoryProductsPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <CartProvider> */}
    <RouterProvider router={router} />
    {/* </CartProvider> */}
  </React.StrictMode>
);
