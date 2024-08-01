import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import TodoList from "@/components/Todo/list";
import { authOptions } from "@/lib/auth";
import Header from "@/components/Header";

async function getTodos() {
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? process.env.PRODUCTION_API_URL
      : process.env.DEVELOPMENT_API_URL;
  const res = await fetch(`${apiUrl}/api/todos`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch todos");
  }
  return res.json();
}

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  console.log("Dashboard: セッション情報", session); // デバッグ用ログ

  if (!session || session.user?.role !== "admin") {
    console.log("Dashboard: 権限なし、リダイレクト"); // デバッグ用ログ
    redirect("/");
  }

  const todos = await getTodos();

  return (
    <>
      <Header />
      <main className="bg-gray-100 py-7 min-h-screen">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold mb-4">管理者ダッシュボード</h1>
          <div className="flex flex-col justify-center items-center">
            <TodoList initialTodos={todos} />
          </div>
        </div>
      </main>
    </>
  );
}
