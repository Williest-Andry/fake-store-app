import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import Email from "../../public/mail.png";
import Password from "../../public/padlock.png";
import Brand from "../components/brand";
import { useLogin } from "../queries/auth.queries";
import { AuthLoginSchema, type AuthLogin } from "../schema/auth.schema";

export default function LoginPage() {
  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({ resolver: zodResolver(AuthLoginSchema) });

  const { mutate: login, error, isPending } = useLogin();

  const submitForm: SubmitHandler<AuthLogin> = (
    data: AuthLogin,
    event?: React.BaseSyntheticEvent,
  ) => {
    if (event) event.preventDefault();
    login(data);
  };

  return (
    <section className="flex flex-col gap-30 items-center justify-center mt-20">
      <Brand />

      <div className="flex flex-col items-center justify-center gap-20 shadow-xl rounded-xl w-120 h-100 px-6 py-5">
        <p className="font-bold text-2xl">Sign in with username</p>

        <form
          className="flex flex-col items-center gap-6 w-[90%]"
          onSubmit={handleSubmit(submitForm)}
        >
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <div className="relative flex flex-col w-97">
                <img
                  src={Email}
                  alt="username icon"
                  className="absolute left-2 top-2"
                />
                <input
                  {...field}
                  placeholder="username"
                  className="border border-gray-700 h-10 rounded-xl pl-12 w-full"
                ></input>
                {errors && (
                  <p className="italic text-red-500">
                    {errors.username?.message}
                  </p>
                )}
              </div>
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <div className="relative flex flex-col w-97">
                <img
                  src={Password}
                  alt="password icon"
                  className="absolute left-2 top-2"
                />
                <input
                  {...field}
                  placeholder="password"
                  className="border border-gray-700 h-10 rounded-xl pl-12 w-full"
                ></input>
                {errors && (
                  <p className="italic text-red-500">
                    {errors.password?.message}
                  </p>
                )}
              </div>
            )}
          />

          <input
            type="submit"
            value={isPending ? "..." : "Login"}
            disabled={isPending}
            className="bg-black text-white rounded-xl text-xl h-10 w-50 mt-10"
          />

          {error && <p className="italic text-red-500">{error.message}</p>}
        </form>
      </div>
    </section>
  );
}
