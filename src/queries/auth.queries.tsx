import { useMutation } from "@tanstack/react-query";
import type { AuthLogin } from "../schema/auth.schema";
import { useNavigate } from "react-router";
import { fakeStoreClient } from "./client/axios-clients";
import { saveAuthData } from "../store/auth.store";

export function useLogin() {
  const navigation = useNavigate();

  return useMutation({
    mutationFn: async (credentials: AuthLogin) => {
      const response = await fakeStoreClient.post("auth/login", credentials);
      return response.data;
    },
    onSuccess: (data, variables) => {
      saveAuthData(variables.username, data.token);
      navigation("/");
    },
  });
}
