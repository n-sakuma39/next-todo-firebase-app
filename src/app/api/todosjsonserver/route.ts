// json.server用
// package.jsonのscriptsに下記を追加
// "json-server": "json-server --watch src/app/data/todo.json --port 3001"

import { Task } from "@/app/types";

// 取得
export const getAllTodos = async (): Promise<Task[]> => {
  const res = await fetch(`http://localhost:3001/tasks`, {
    cache: "no-store", //SSR
  });
  const todos = await res.json();
  return todos;
};

// 追加
export const addTodo = async (todo: Task): Promise<Task> => {
  const res = await fetch(`http://localhost:3001/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  const newTodo = await res.json();
  return newTodo;
};

// 編集
export const editTodo = async (
  id: string,
  newText: string,
  newProgress: number
): Promise<Task> => {
  const res = await fetch(`http://localhost:3001/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: newText, progress: newProgress }),
  });
  const updateTodo = await res.json();
  return updateTodo;
};

// 削除
export const deleteTodo = async (id: string): Promise<Task> => {
  const res = await fetch(`http://localhost:3001/tasks/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const deleteTodo = await res.json();
  return deleteTodo;
};
