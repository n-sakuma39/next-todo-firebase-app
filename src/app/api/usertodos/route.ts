import { NextResponse } from "next/server";
import { Task } from "@/app/types";

export async function GET() {
  return NextResponse.json([]);
}

export async function POST(request: Request) {
  const todo: Task = await request.json();
  return NextResponse.json(todo, { status: 201 });
}

export async function PUT(request: Request) {
  const updatedTodo: Task = await request.json();
  return NextResponse.json(updatedTodo);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  return NextResponse.json({ message: "Todo deleted successfully" });
}