"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt, FaTimes } from "react-icons/fa";
import { Task } from "@/app/types";

interface CalendarProps {
  dueDate: Date;
  setDueDate: (date: Date) => void;
  todoId: string;
  onUpdate: (updatedTodo: Task) => void;
  todo: Task;
  disabled: boolean;
}

const Calendar = ({
  dueDate,
  setDueDate,
  todoId,
  onUpdate,
  todo,
  disabled,
}: CalendarProps) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const validDueDate = dueDate instanceof Date ? dueDate : new Date(dueDate);
  if (isNaN(validDueDate.getTime())) {
    console.error("Invalid dueDate provided:", dueDate);
    return null;
  }

  const handleDateChange = async (date: Date | null) => {
    if (date) {
      const newDate = new Date(date);
      setDueDate(newDate);
      try {
        const response = await fetch(`/api/todos`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: todoId,
            text: todo.text,
            progress: todo.progress,
            dueDate: newDate,
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to update due date");
        }
        const updatedTodo = await response.json();
        onUpdate(updatedTodo);
      } catch (error) {
        console.error("Error updating due date: ", error);
      }
    }
    setShowDatePicker(false);
  };

  return (
    <div className="flex items-center mb-2 relative justify-end">
      <div
        className={`text-right text-blue-800 font-bold flex items-center cursor-pointer bg-blue-50 p-2 text-sm rounded ${
          disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
        }`}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => !disabled && setShowDatePicker(true)}
      >
        期限：
        {validDueDate.toLocaleDateString("ja-JP", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        <FaCalendarAlt className="ml-2 cursor-pointer" />
      </div>
      {showDatePicker && (
        <>
          <div
            className="fixed inset-0 bg-gray-700 bg-opacity-75 z-10"
            onClick={() => setShowDatePicker(false)}
          ></div>
          <div className="fixed inset-0 flex items-center justify-center z-20">
            <div className="bg-white p-4 rounded shadow-lg relative scale-125 md:scale-150">
              <FaTimes
                className="absolute -top-3 -right-3 cursor-pointer text-3xl z-30 bg-white rounded-full p-1 shadow-2xl border"
                onClick={() => setShowDatePicker(false)}
              />
              <DatePicker
                selected={validDueDate}
                onChange={handleDateChange}
                inline
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Calendar;
