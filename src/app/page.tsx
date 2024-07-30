import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import TodoList from "@/app/components/TodoList";
import { getAllTodos } from "@/app/api/todos/route";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Header from "@/app/components/Header";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/signin");
  }
  const todos = await getAllTodos();

  return (
    <>
      <Header />
      <main className="bg-gray-100 py-7">
        <div className="container mx-auto">
          <div className="flex flex-col justify-center items-center">
            <TodoList initialTodos={todos} />
          </div>
        </div>
      </main>
    </>
  );
}
