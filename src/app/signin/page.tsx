"use client";
import { LoginForm } from "@/app/components/LoginForm";

export default function SignInPage() {
  return (
    <main className="flex flex-col items-center justify-start h-screen py-2 bg-gray-200">
      <div className="w-full max-w-xl items-center justify-center mt-5">
        <div className="w-full px-14 py-8 bg-white shadow-md rounded-lg">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
