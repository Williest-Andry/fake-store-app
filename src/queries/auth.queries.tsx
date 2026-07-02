import { useMutation } from "@tanstack/react-query";
import type { AuthLogin } from "../schema/auth.schema";
import { saveAuthData } from "../store/auth.store";
import { fakeStoreClient } from "./client/axios-clients";

export function useLogin() {
  return useMutation({
    mutationFn: async (credentials: AuthLogin) => {
      const response = await fakeStoreClient.post("auth/login", credentials);
      return response.data;
    },
    onSuccess: (data, variables) => {
      saveAuthData(variables.username, data.token);
      window.location.href = "/";
    },
  });
}
