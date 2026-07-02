import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "./pages/login";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductDetailsPage from "./pages/product-details";
import MyCart from "./pages/my-cart";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route index element={<App />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/my-cart" element={<MyCart />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
