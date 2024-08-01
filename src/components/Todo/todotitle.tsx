import React, { useRef, useEffect } from 'react';

interface TodoTitleProps {
  isEditing: boolean;
  title: string;
  onTitleChange: (newTitle: string) => void;
}

const TodoTitle: React.FC<TodoTitleProps> = ({ isEditing, title, onTitleChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div className="mb-4">
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          className="py-1 px-2 rounded border-gray-400 border w-full"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onTitleChange(e.target.value)
          }
        />
      ) : (
        <p>{title}</p>
      )}
    </div>
  );
};

export default TodoTitle;