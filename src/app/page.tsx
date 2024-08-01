import TodoList from "@/components/Todo/userlist";
import Header from "@/components/Header";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/signin");
  }

  if (session.user?.role === "admin") {
    redirect("/dashboard");
  }
  return (
    <>
      <Header />
      <main className="bg-gray-100 py-7 min-h-screen">
        <div className="container mx-auto">
          <div className="flex flex-col justify-center items-center">
            <TodoList />
          </div>
        </div>
      </main>
    </>
  );
}
