import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { Task } from "@/app/types";
import { NextResponse } from "next/server";

const collectionName = "tasks";

// Get all todos
async function getAllTodos(): Promise<Task[]> {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const todos = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    text: doc.data().text,
    progress: doc.data().progress,
    dueDate: doc.data().dueDate,
    createdAt: doc.data().createdAt,
  }));
  return todos.sort((a, b) => b.createdAt - a.createdAt);
}

// Add todo
async function addTodo(todo: Task): Promise<Task> {
  const todoWithTimestamp = { ...todo, createdAt: Date.now() };
  const docRef = await addDoc(
    collection(db, collectionName),
    todoWithTimestamp
  );
  return { ...todoWithTimestamp, id: docRef.id };
}

// Edit todo
async function editTodo(
  id: string,
  newText: string,
  newProgress: number,
  newDueDate: Date
): Promise<Task> {
  const todoRef = doc(db, collectionName, id);
  const updateData = {
    text: newText,
    progress: newProgress,
    dueDate: newDueDate.toISOString(),
  };
  await updateDoc(todoRef, updateData);

  const updatedDoc = await getDoc(todoRef);
  const updatedData = updatedDoc.data();

  return {
    id,
    text: newText,
    progress: newProgress,
    dueDate: newDueDate.toISOString(),
    createdAt: updatedData?.createdAt,
  };
}

// Delete todo
async function deleteTodo(id: string): Promise<void> {
  const todoRef = doc(db, collectionName, id);
  await deleteDoc(todoRef);
}

// HTTP メソッドに対応する関数をエクスポート
export async function PUT(request: Request) {
  const { id, text, progress, dueDate } = await request.json();
  const updatedTodo = await editTodo(id, text, progress, new Date(dueDate));
  return NextResponse.json(updatedTodo);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  await deleteTodo(id);
  return NextResponse.json({ message: "Todo deleted successfully" });
}

// Get
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

// Add
export async function POST(request: Request) {
  try {
    const todo: Task = await request.json();
    const newTodo = await addTodo(todo);
    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add todo" }, { status: 500 });
  }
}
