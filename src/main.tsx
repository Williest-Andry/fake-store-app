import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "./pages/login";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductDetailsPage from "./pages/product-details";
import MyCart from "./pages/my-cart";
import PrivateRoute from "./routes/private-routes";
import GuestRoute from "./routes/guest-routes";
import CreateProductPage from "./pages/create-product";
import ModifyProductPage from "./pages/modify-product";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<GuestRoute />}>
            <Route index element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/products" element={<App />} />
            <Route path="/products/:id" element={<ProductDetailsPage />} />
            <Route path="/my-cart" element={<MyCart />} />
            <Route path="/create-product" element={<CreateProductPage />} />
            <Route path="/modify-product/:id" element={<ModifyProductPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
