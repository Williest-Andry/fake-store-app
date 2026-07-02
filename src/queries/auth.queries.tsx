import { useMutation } from "@tanstack/react-query";
import type { AuthLogin } from "../schema/auth.schema";
import axios from "axios";
import { useNavigate } from "react-router";
import { fakeStoreClient } from "./client/axios-clients";

export function useLogin() {
  const navigation = useNavigate();

  return useMutation({
    mutationFn: async (credentials: AuthLogin) => {
      const response = await fakeStoreClient.post("auth/login", credentials);
      return response.data;
    },
    onSuccess: () => {
      navigation("/");
    },
  });
}
