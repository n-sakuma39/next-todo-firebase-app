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
  const [editProgress, setEditProgress] = useState<number>(todo.progress);
  const [dueDate, setDueDate] = useState(
    todo.dueDate ? new Date(todo.dueDate) : new Date()
  );

  const convertToHalfWidth = (str: string) => {
    return str.replace(/[０-９]/g, function (s) {
      return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
    });
  };

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
      className="p-3 md:p-4 bg-white border-l-4 border-blue-500 rounded shadow-[0_-4px_8px_-1px_rgba(0,0,0,0.08),0_4px_8px_-1px_rgba(0,0,0,0.08)] relative"
      key={todo.id}
    >
      <div className="mb-4">
        {isEditing ? (
          <input
            ref={ref}
            type="text"
            className="py-1 px-2 rounded border-gray-400 border w-full"
            value={editTitle}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEditTitle(e.target.value)
            }
          />
        ) : (
          <p>{todo.text}</p>
        )}
      </div>
      <Calendar
        dueDate={dueDate}
        setDueDate={setDueDate}
        todoId={todo.id}
        onUpdate={onUpdate}
        todo={todo}
        disabled={isEditing || isEditingProgress}
      />
      <div className="flex items-center mb-2">
        <span className="mr-1 inline-block">進捗率：</span>
        {isEditingProgress ? (
          <>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="w-16 border px-2 mr-2 rounded no-spinners"
              value={editProgress}
              onFocus={(e) => {
                if (e.target.value === "0") {
                  setEditProgress(0);
                }
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = convertToHalfWidth(e.target.value);
                const numericValue = value.replace(/[^0-9]/g, "");
                const progressValue = Math.min(Number(numericValue), 100);
                setEditProgress(numericValue === "" ? 0 : progressValue);
              }}
            />
            %
          </>
        ) : (
          <span>{progress} %</span>
        )}
      </div>
      <ProgressBar progress={progress} />
      <div className="flex items-center w-full md:w-auto mt-5 justify-center">
        {isEditing || isEditingProgress ? (
          <button
            className="bg-blue-500 hover:bg-blue-400 mr-1 md:mr-3 px-3 py-2 text-white rounded w-1/3 md:w-1/5"
            onClick={handleSave}
          >
            保存
          </button>
        ) : (
          <button
            className="bg-green-700 hover:bg-green-600 mr-1 md:mr-3 px-3 py-2 text-white rounded w-1/3 md:w-1/5"
            onClick={handleEdit}
          >
            編集
          </button>
        )}

        <button
          className="bg-red-600 hover:bg-red-500 px-3 py-2 text-white rounded w-1/3 md:w-1/5"
          onClick={handleDelete}
        >
          削除
        </button>
      </div>
    </li>
  );
};

export default Todo;
