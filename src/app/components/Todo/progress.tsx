import React, { useState } from "react";

interface ProgressBarProps {
  progress: number;
  isEditing: boolean;
  onProgressChange: (newProgress: number) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, isEditing, onProgressChange }) => {
  const [editProgress, setEditProgress] = useState(progress);

  const convertToHalfWidth = (str: string) => {
    return str.replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xFEE0));
  };

  return (
    <div className="w-full">
      <div className="flex items-center mb-2">
        <span className="mr-1 inline-block">進捗率：</span>
        {isEditing ? (
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
                onProgressChange(progressValue);
              }}
            />
            %
          </>
        ) : (
          <span>{progress} %</span>
        )}
      </div>
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