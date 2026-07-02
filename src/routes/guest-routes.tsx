import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store/auth.store";

export default function GuestRoute() {
  const { token } = useAuthStore();

  return token ? <Navigate to={"/products"} /> : <Outlet />;
}
