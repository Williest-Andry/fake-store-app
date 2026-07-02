import { create } from "zustand";
import { type AuthLoginStore } from "../schema/auth.schema";

export const saveAuthData = (username: string, token: string) => {
  localStorage.setItem("username", username);
  localStorage.setItem("token", token);
};

export const logout = () => {
  localStorage.clear();
};

export const useAuthStore = create<AuthLoginStore>(() => ({
  username: localStorage.getItem("username") ?? "",
  token: localStorage.getItem("token") ?? "",
}));
