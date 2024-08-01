"use client";
import { LoginForm } from "@/components/LoginForm";

export default function SignInPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <div className="w-full max-w-xl px-4">
        <div className="w-full px-6 pt-7 pb-10 bg-white shadow-md rounded-lg">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
