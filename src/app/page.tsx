import TodoList from "@/components/Todo/userlist";
import Header from "@/components/Header";

export default function Home() {
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
