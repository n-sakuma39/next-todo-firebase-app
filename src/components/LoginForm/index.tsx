"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaEye, FaEyeSlash, FaGithub, FaGoogle } from "react-icons/fa";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const loginSchema = z.object({
  id: z.string().min(1, "IDは必須です"),
  password: z.string().min(6, "パスワードは6文字以上である必要があります"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const [isGitHubLoading, setIsGitHubLoading] = useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const router = useRouter();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setError("");

    try {
      const response = await signIn("credentials", {
        redirect: false,
        id: data.id,
        password: data.password,
      });

      if (response?.error) {
        setError("IDとパスワードが一致しません");
      } else if (response?.ok) {
        router.push("/");
      }
    } catch (err) {
      console.error("ログイン中にエラーが発生:", err);
      setError("予期せぬエラーが発生しました");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGitHubSignIn = () => {
    signIn("github", { callbackUrl: "/" });
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="container">
      <h1 className="text-2xl font-bold text-center text-gray-700 mb-5">
        Welcome Todo App
      </h1>
      <p className="text-sm text-muted-foreground mb-7 text-center">
        指定のIDとPWを入力するか
        <br />
        SNSアカウントでログインしてください。
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mb-7">
        <div className="mb-4">
          <Label
            htmlFor="id"
            className="mb-2 block text-sm text-muted-foreground"
          >
            ID
          </Label>
          <Input {...register("id")} type="text" id="id" />
          {errors.id && (
            <p className="text-red-500 text-sm mt-1">{errors.id.message}</p>
          )}
        </div>
        <div className="mb-5 relative">
          <Label
            htmlFor="password"
            className="mb-2 block text-sm text-muted-foreground"
          >
            パスワード
          </Label>
          <div className="relative">
            <Input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              id="password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-400 hover:text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        {error && (
          <p className="text-red-500 text-base mb-5 text-center">{error}</p>
        )}
        <button type="submit" className={cn(buttonVariants(), "w-full py-6")}>
          SIGN IN
        </button>
      </form>
      <div className="relative mb-5">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t"></span>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="text-muted-foreground px-2 bg-background">
            または
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <button
          className={cn(buttonVariants({ variant: "outline" }), "py-6")}
          onClick={() => {
            setIsGitHubLoading(true);
            handleGitHubSignIn();
          }}
        >
          {isGitHubLoading ? (
            <Icon.spinner className="mr-2 animate-spin" />
          ) : (
            <Icon.github className="mr-2" />
          )}
          Github
        </button>
        <button
          className={cn(buttonVariants({ variant: "outline" }), "py-6")}
          onClick={() => {
            setIsGoogleLoading(true);
            handleGoogleSignIn();
          }}
        >
          {isGoogleLoading ? (
            <Icon.spinner className="mr-2 animate-spin" />
          ) : (
            <Icon.google className="mr-2" />
          )}
          Google
        </button>
      </div>
    </div>
  );
};
