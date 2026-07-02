import { useState } from "react";
import { AuthLoginSchema, type AuthLogin } from "../schema/auth.schema";
import { useLogin } from "../queries/auth.queries";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginPage() {
  const [credentials, setCredentials] = useState<AuthLogin>({
    username: "",
    password: "",
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(AuthLoginSchema) });

  const { mutate: login, error, isPending } = useLogin();

  const handleChange = (label: "username" | "password", value: string) => {
    let changedCredentials = JSON.parse(JSON.stringify(credentials));
    changedCredentials[label] = value;
    setCredentials(changedCredentials);
  };

  const submitForm: SubmitHandler<AuthLogin> = (
    data: AuthLogin,
    event?: React.BaseSyntheticEvent,
  ) => {
    if (event) event.preventDefault();
    login(data);
  };

  return (
    <section className="flex flex-col gap-10 items-center justify-center mt-30">
      <h1>Login page</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit(submitForm)}>
        <label>Username</label>
        <input
          {...register("username")}
          placeholder="username"
          className="border border-gray-700"
          value={credentials?.username}
          onChange={(event) => handleChange("username", event.target.value)}
        />
        {errors && (
          <p className="italic text-red-500">{errors.username?.message}</p>
        )}

        <label>Password</label>
        <input
          {...register("password")}
          placeholder="password"
          type="password"
          className="border border-gray-700"
          value={credentials?.password}
          onChange={(event) => handleChange("password", event.target.value)}
        />
        {errors && (
          <p className="italic text-red-500">{errors.password?.message}</p>
        )}

        <input
          type="submit"
          value={isPending ? "..." : "Login"}
          disabled={isPending}
        />

        {error && <p className="italic text-red-500">{error.message}</p>}
      </form>
    </section>
  );
}
