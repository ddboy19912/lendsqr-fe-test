import { Logo, LogoIllustration } from "@/assets";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginSchema, type LoginFormValues } from "../schemas/authSchema";
import { useAuthStore } from "../stores/authStore";

export const LoginPage = () => {
  const login = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (values: LoginFormValues) => {
    login(values.email, values.password);
  };

  const inputClasses =
    "border-primary-border focus-visible:ring-primary-blue placeholder:text-placeholder-text-color h-[50px] border-2 px-4 shadow-none placeholder:font-normal";

  return (
    <div className="login-page font-avenir-next h-screen">
      <div className="login-page__container chromebook:grid-cols-2 grid h-full">
        <div className="chromebook:flex hidden flex-col justify-center bg-[#f5f5f54f] p-[68px]">
          <div className="flex pl-[30px]">
            <img className="h-9 object-contain" src={Logo} alt="logo" />
          </div>
          <img
            className="mt-[139px]"
            src={LogoIllustration}
            alt="auth-illustration"
          />
        </div>
        <div className="chromebook:p-[100px] chromebook:items-start flex flex-col justify-center px-6 md:items-center">
          <img
            className="chromebook:hidden fixed top-10 left-[50%] h-6 translate-x-[-50%] object-contain"
            src={Logo}
            alt="logo"
          />
          <h1 className="text-primary-blue text-left">Welcome!</h1>
          <h4 className="text-secondary-font-color mt-[10px]">
            Enter details to login.
          </h4>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-[60px] w-full space-y-6 md:max-w-[520px]"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className={inputClasses}
                        placeholder="Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          className={inputClasses}
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-teal reveal-text absolute top-[50%] right-[17.64px] translate-y-[-50%] cursor-pointer transition-colors duration-200 hover:text-teal-600"
                        >
                          {showPassword ? "Hide" : "Show"}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <p className="reveal-text text-teal mb-[45px] w-max cursor-pointer transition-colors duration-200 hover:text-teal-600">
                Forgot Password?
              </p>

              <Button
                type="submit"
                className="bg-teal h-12 w-full cursor-pointer p-[14px] uppercase transition-colors duration-200 hover:bg-teal-600"
                disabled={form.formState.isSubmitting}
              >
                <p className="btn-text">
                  {" "}
                  {form.formState.isSubmitting ? "Logging in..." : "Log in"}
                </p>
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
