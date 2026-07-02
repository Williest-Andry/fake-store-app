import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store/auth.store";

export default function PrivateRoute() {
  const { token } = useAuthStore();

  return token ? <Outlet /> : <Navigate to={"/"} />;
}
