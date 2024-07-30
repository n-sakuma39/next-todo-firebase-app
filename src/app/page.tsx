import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import TodoList from "@/app/components/TodoList";
import { authOptions } from "@/app/lib/auth";
import Header from "@/app/components/Header";

async function getTodos() {
  // APIのURLが設定されていない場合のフォールバック
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const res = await fetch(`${apiUrl}/api/todos`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch todos");
  }
  return res.json();
}

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/signin");
  }

  const todos = await getTodos();

  return (
    <>
      <Header />
      <main className="bg-gray-100 py-7 min-h-screen">
        <div className="container mx-auto">
          <div className="flex flex-col justify-center items-center">
            <TodoList initialTodos={todos} />
          </div>
        </div>
      </main>
    </>
  );
}
