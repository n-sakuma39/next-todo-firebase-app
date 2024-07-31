// json.server用
// package.jsonのscriptsに下記を追加
// "json-server": "json-server --watch src/app/data/todo json --port 3001"
import { NextResponse } from "next/server";
import { Task } from "@/app/types";

// 取得
export async function GET() {
  try {
    const todos = await getAllTodos();
    return NextResponse.json(todos);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch todos" },
      { status: 500 }
    );
  }
}

// 追加
export async function POST(request: Request) {
  try {
    const todo: Task = await request.json();
    const newTodo = await addTodo(todo);
    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add todo" }, { status: 500 });
  }
}

// 編集（PUTメソッド）
export async function PUT(request: Request) {
  try {
    const { id, text, progress } = await request.json();
    const updatedTodo = await editTodo(id, text, progress);
    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update todo" },
      { status: 500 }
    );
  }
}

// 削除（DELETEメソッド）
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const deletedTodo = await deleteTodo(id);
    return NextResponse.json(deletedTodo);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete todo" },
      { status: 500 }
    );
  }
}

// 以下は元の関数をそのまま残す（ただし、exportは削除）
async function getAllTodos(): Promise<Task[]> {
  const res = await fetch(`http://localhost:3001/tasks`, {
    cache: "no-store", //SSR
  });
  const todos = await res.json();
  return todos;
}

async function addTodo(todo: Task): Promise<Task> {
  const res = await fetch(`http://localhost:3001/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  const newTodo = await res.json();
  return newTodo;
}

async function editTodo(
  id: string,
  newText: string,
  newProgress: number
): Promise<Task> {
  const res = await fetch(`http://localhost:3001/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: newText, progress: newProgress }),
  });
  const updateTodo = await res.json();
  return updateTodo;
}

async function deleteTodo(id: string): Promise<Task> {
  const res = await fetch(`http://localhost:3001/tasks/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const deleteTodo = await res.json();
  return deleteTodo;
}
