"use client";
import React, { useState } from "react";
import { Task } from "@/app/types";
import Todo from "@/app/components/Todo";
import AddTask from "./AddTask";

interface TodoListProps {
  initialTodos: Task[];
}

const TodoList = ({ initialTodos }: TodoListProps) => {
  const [todos, setTodos] = useState(initialTodos);

  const handleUpdate = (updatedTodo: Task) => {
    setTodos(
      todos
        .map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
        .sort((a, b) => b.createdAt - a.createdAt)
    );
  };

  const handleDelete = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleAdd = (newTask: Task) => {
    setTodos((prevTodos) => [newTask, ...prevTodos]);
  };

  return (
    <div className="w-full max-w-xl items-center justify-center mt-5">
      <div className="w-full px-4 py-5 md:px-8 md:py-7 bg-white shadow-md rounded-lg">
        <AddTask onAdd={handleAdd} />
        <ul className="space-y-5">
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
