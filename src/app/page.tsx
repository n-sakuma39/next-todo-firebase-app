import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import TodoList from "@/components/Todo/list";
import { authOptions } from "@/app/lib/auth";
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
