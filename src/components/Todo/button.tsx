import React from "react";

interface TodoActionsProps {
  isEditing: boolean;
  isEditingProgress: boolean;
  onSave: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const TodoActions: React.FC<TodoActionsProps> = ({
  isEditing,
  isEditingProgress,
  onSave,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex items-center w-full md:w-auto mt-5 justify-center">
      {isEditing || isEditingProgress ? (
        <button
          className="bg-blue-500 hover:bg-blue-400 mr-1 md:mr-3 px-3 py-2 text-white rounded w-1/3 md:w-1/5"
          onClick={onSave}
        >
          保存
        </button>
      ) : (
        <button
          className="bg-green-700 hover:bg-green-600 mr-1 md:mr-3 px-3 py-2 text-white rounded w-1/3 md:w-1/5"
          onClick={onEdit}
        >
          編集
        </button>
      )}

      <button
        className="bg-red-600 hover:bg-red-500 px-3 py-2 text-white rounded w-1/3 md:w-1/5"
        onClick={onDelete}
      >
        削除
      </button>
    </div>
  );
};

export default TodoActions;
