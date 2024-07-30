"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Task } from "@/app/types";

interface AddTaskProps {
  onAdd: (newTask: Task) => void;
}

const AddTask = ({ onAdd }: AddTaskProps) => {
  const [taskTitle, setTaskTitle] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (taskTitle.trim() === "") {
      return;
    }
    const newTask = {
      id: uuidv4(),
      text: taskTitle,
      progress: 0,
      dueDate: new Date().toISOString(),
    };

    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      const addedTask = await response.json();
      setTaskTitle("");
      onAdd(addedTask);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <form className="mb-4 space-y-3" onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTaskTitle(e.target.value)
        }
        value={taskTitle}
        placeholder="タスクを入力してください。"
        className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:border-blue-400"
      />
      <button className="w-full px-4 py-2 text-white bg-blue-500 rounded transform hover:bg-blue-400 hover:scale-95 duration-200">
        Add Task
      </button>
    </form>
  );
};

export default AddTask;
