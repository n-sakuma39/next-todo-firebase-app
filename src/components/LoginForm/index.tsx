"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import CredentialsForm from "./CredentialsForm";
import SocialLoginButtons from "./SocialLoginButtons";
import Divider from "./Divider";

export const LoginForm = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleCredentialsLogin = async (data: {
    id: string;
    password: string;
  }) => {
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

      <CredentialsForm onSubmit={handleCredentialsLogin} error={error} />
      <Divider />
      <SocialLoginButtons />
    </div>
  );
};
