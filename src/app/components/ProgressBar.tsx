import React from "react";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div className="w-full">
      <div
        className="bg-gray-300 h-3 w-full relative"
        style={{
          backgroundImage: `linear-gradient(to right, transparent 0%, transparent calc(10% - 1px), rgba(0, 0, 0, 0.2) calc(10% - 1px), rgba(0, 0, 0, 0.2) 10%, transparent 10%, transparent calc(20% - 1px), rgba(0, 0, 0, 0.2) calc(20% - 1px), rgba(0, 0, 0, 0.2) 20%, transparent 20%, transparent calc(30% - 1px), rgba(0, 0, 0, 0.2) calc(30% - 1px), rgba(0, 0, 0, 0.2) 30%, transparent 30%, transparent calc(40% - 1px), rgba(0, 0, 0, 0.2) calc(40% - 1px), rgba(0, 0, 0, 0.2) 40%, transparent 40%, transparent calc(50% - 1px), rgba(0, 0, 0, 0.2) calc(50% - 1px), rgba(0, 0, 0, 0.2) 50%, transparent 50%, transparent calc(60% - 1px), rgba(0, 0, 0, 0.2) calc(60% - 1px), rgba(0, 0, 0, 0.2) 60%, transparent 60%, transparent calc(70% - 1px), rgba(0, 0, 0, 0.2) calc(70% - 1px), rgba(0, 0, 0, 0.2) 70%, transparent 70%, transparent calc(80% - 1px), rgba(0, 0, 0, 0.2) calc(80% - 1px), rgba(0, 0, 0, 0.2) 80%, transparent 80%, transparent calc(90% - 1px), rgba(0, 0, 0, 0.2) calc(90% - 1px), rgba(0, 0, 0, 0.2) 90%, transparent 90%, transparent calc(100% - 1px), rgba(0, 0, 0, 0.2) calc(100% - 1px), rgba(0, 0, 0, 0.2) 100%)`,
        }}
      >
        <div
          className="bg-orange-500 h-3"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
