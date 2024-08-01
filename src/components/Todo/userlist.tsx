"use client";
import React, { useState, useEffect } from "react";
import { Task } from "@/app/types";
import Todo from "@/components/Todo";
import AddTask from "@/components/AddTask";
import Loading from "@/components/Loading";
import * as LocalStorage from "@/lib/localStorage";

const TodoList = () => {
  const [todos, setTodos] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTodos = () => {
      const storedTodos = LocalStorage.getTodos();
      setTodos(storedTodos);
      setIsLoading(false);
    };
    loadTodos();
  }, []);

  const handleUpdate = (updatedTodo: Task) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    );
    setTodos(updatedTodos);
    LocalStorage.saveTodos(updatedTodos);
  };

  const handleDelete = (id: string) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
    LocalStorage.saveTodos(filteredTodos);
  };

  const handleAdd = (newTask: Task) => {
    const updatedTodos = [newTask, ...todos];
    setTodos(updatedTodos);
    LocalStorage.saveTodos(updatedTodos);
  };

  if (isLoading) {
    return <Loading />;
  }

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
