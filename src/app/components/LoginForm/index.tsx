"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const loginSchema = z.object({
  id: z.string().min(1, "IDは必須です"),
  password: z.string().min(6, "パスワードは6文字以上である必要があります"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm = () => {
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

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-12">
        ログイン
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="id" className="block font-medium text-gray-700">
            ID
          </label>
          <input
            {...register("id")}
            type="text"
            id="id"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.id && (
            <p className="text-red-500 text-sm mt-1">{errors.id.message}</p>
          )}
        </div>
        <div className="mb-10 relative">
          <label htmlFor="password" className="block font-medium text-gray-700">
            パスワード
          </label>
          <div className="relative">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              id="password"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 pr-10"
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
        <button
          type="submit"
          className="w-60 mx-auto flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm font-medium text-white bg-indigo-500 hover:bg-indigo-700 active:ring-0 active:ring-offset-0"
        >
          SIGN IN
        </button>
      </form>
    </div>
  );
};
