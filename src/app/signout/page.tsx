"use client";
import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignOutPage() {
  const router = useRouter();

  useEffect(() => {
    signOut({ redirect: false }).then(() => {
      router.push("/signin");
    });
  }, [router]);

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <p>ログアウト中...</p>
    </main>
  );
}
