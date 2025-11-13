import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Input from "@/components/Layouts/Input/Input"; 
import Spinner from "../Layouts/Loaders/Spinner";

const loginSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log(data);
  };

  return (
    <div className="w-full md:h-[45vw] h-[80vh] rounded-2xl bg-zinc-100/10 dark:bg-zinc-900/10 border-2 border-zinc-100/80 dark:border-zinc-900/50 flex items-center justify-center relative">
      <div className="w-full md:w-[40%] p-6 dark:md:bg-zinc-900/50 md:bg-zinc-100/50 md:rounded-2xl">
        <div className="text-center mb-6">
          <h1 className="text-[3vh] md:text-[2vw] font-semibold text-zinc-700 dark:text-zinc-300 select-none">
            Welcome Back
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base">
            Glad to see you again! Log in to access your dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            register={register("email")}
            error={errors.email}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            register={register("password")}
            error={errors.password}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-light hover:bg-light/80 dark:hover:bg-dark/80 dark:bg-dark text-white font-medium py-2 rounded-lg transition-colors duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <Spinner color="text-white" size="sm" /> Logging in...
              </div>
            ) : "Login"}
          </button>
        </form>

        <div className="text-center mt-4 text-sm">
          <a href="/auth/forgot-password" className="text-indigo-500 hover:underline">
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
