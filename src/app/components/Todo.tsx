"use client";
import React, { useEffect, useRef, useState } from "react";
import { Task } from "@/app/types";
import ProgressBar from "@/app/components/ProgressBar";
import Calendar from "@/app/components/Calendar";

interface TodoProps {
  todo: Task;
  onUpdate: (updatedTodo: Task) => void;
  onDelete: (id: string) => void;
}

const Todo = ({ todo, onUpdate, onDelete }: TodoProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.text);
  const [progress, setProgress] = useState(todo.progress);
  const [isEditingProgress, setIsEditingProgress] = useState(false);
  const [editProgress, setEditProgress] = useState(todo.progress);
  const [dueDate, setDueDate] = useState(
    todo.dueDate ? new Date(todo.dueDate) : new Date()
  );

  useEffect(() => {
    if (isEditing) {
      ref.current?.focus();
    }
  }, [isEditing]);

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

  return (
    <li
      className="p-3 md:p-4 bg-white border-l-4 border-blue-500 rounded shadow-md relative"
      key={todo.id}
    >
      <div className="flex md:justify-between items-center mb-4 flex-col md:flex-row">
        {isEditing ? (
          <input
            ref={ref}
            type="text"
            className="md:mr-3 py-1 px-2 rounded border-gray-400 border w-full md:w-[340px]"
            value={editTitle}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEditTitle(e.target.value)
            }
          />
        ) : (
          <span className="mr-3 md:max-w-[340px]">{todo.text}</span>
        )}

        <div className="flex items-center w-full md:w-auto mt-5 md:mt-0 justify-center">
          {isEditing || isEditingProgress ? (
            <button
              className="bg-blue-500 mr-1 text-sm md:mr-3 px-3 py-1 text-white rounded w-1/3 md:w-auto"
              onClick={handleSave}
            >
              保存
            </button>
          ) : (
            <button
              className="bg-green-700 mr-1 md:mr-3 px-3 py-1 text-white rounded text-sm w-1/3 md:w-auto"
              onClick={handleEdit}
            >
              編集
            </button>
          )}

          <button
            className="bg-red-600 text-sm px-3 py-1 text-white rounded w-1/3 md:w-auto"
            onClick={handleDelete}
          >
            削除
          </button>
        </div>
      </div>
      <Calendar
        dueDate={dueDate}
        setDueDate={setDueDate}
        todoId={todo.id}
        onUpdate={onUpdate}
        todo={todo}
        disabled={isEditing || isEditingProgress}
      />
      <div className="flex items-center">
        <span className="mr-3">進捗率：</span>
        {isEditingProgress ? (
          <>
            <input
              type="number"
              className="w-16 border px-2 py-1 rounded"
              value={editProgress}
              onFocus={(e) => e.target.select()}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEditProgress(Number(e.target.value))
              }
              min="0"
              max="100"
            />
            %
          </>
        ) : (
          <span>{progress}%</span>
        )}
      </div>
      <ProgressBar progress={progress} />
    </li>
  );
};

export default Todo;
