"use client";
import { useEffect } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

export default function SignOutPage() {
  const router = useRouter();

  useEffect(() => {
    signOut({ redirect: false }).then(() => {
      router.push("/signin");
    });
  }, [router]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <div className="w-full max-w-xl px-4">
        <Loading />
      </div>
    </main>
  );
}
