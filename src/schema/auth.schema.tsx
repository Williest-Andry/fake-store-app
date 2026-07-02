import z from "zod";

export const AuthLoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type AuthLogin = z.infer<typeof AuthLoginSchema>;
