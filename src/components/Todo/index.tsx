"use client";
import React, { useEffect, useRef, useState } from "react";
import { Task } from "@/app/types";
import ProgressBar from "@/components/Todo/progress";
import Calendar from "@/components/Todo/calendar";
import TodoActions from "@/components/Todo/button";
import TodoTitle from "@/components/Todo/todotitle";

interface TodoProps {
  todo: Task;
  onUpdate: (updatedTodo: Task) => void;
  onDelete: (id: string) => void;
}

const Todo = ({ todo, onUpdate, onDelete }: TodoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.text);
  const [progress, setProgress] = useState(todo.progress);
  const [isEditingProgress, setIsEditingProgress] = useState(false);
  const [editProgress, setEditProgress] = useState<number>(todo.progress);
  const [dueDate, setDueDate] = useState(
    todo.dueDate ? new Date(todo.dueDate) : new Date()
  );

  useEffect(() => {
    setEditTitle(todo.text);
    setEditProgress(todo.progress);
    setDueDate(todo.dueDate ? new Date(todo.dueDate) : new Date(todo.dueDate));
  }, [todo]);

  const handleEdit = () => {
    setIsEditing(true);
    setIsEditingProgress(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/todos`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: todo.id,
          text: editTitle,
          progress: editProgress,
          dueDate: dueDate,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update todo");
      }
      const updatedTodo = await response.json();
      setIsEditing(false);
      setIsEditingProgress(false);
      setProgress(editProgress);
      setDueDate(
        updatedTodo.dueDate ? new Date(updatedTodo.dueDate) : new Date()
      );
      onUpdate(updatedTodo);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/todos`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: todo.id }),
      });
      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }
      onDelete(todo.id);
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleTitleChange = (newTitle: string) => {
    setEditTitle(newTitle);
  };

  const handleProgressChange = (newProgress: number) => {
    setEditProgress(newProgress);
  };

  return (
    <li
      className="p-3 md:p-4 bg-white border-l-4 border-blue-500 rounded shadow-[0_-4px_8px_-1px_rgba(0,0,0,0.08),0_4px_8px_-1px_rgba(0,0,0,0.08)] relative"
      key={todo.id}
    >
      <TodoTitle
        isEditing={isEditing}
        title={editTitle}
        onTitleChange={handleTitleChange}
      />
      <Calendar
        dueDate={dueDate}
        setDueDate={setDueDate}
        todoId={todo.id}
        onUpdate={onUpdate}
        todo={todo}
        disabled={isEditing || isEditingProgress}
      />
      <ProgressBar
        progress={progress}
        isEditing={isEditingProgress}
        onProgressChange={handleProgressChange}
      />
      <TodoActions
        isEditing={isEditing}
        isEditingProgress={isEditingProgress}
        onSave={handleSave}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </li>
  );
};

export default Todo;
