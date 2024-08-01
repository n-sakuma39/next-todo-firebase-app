import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-500"></div>
    </div>
  );
};

export default Loading;
