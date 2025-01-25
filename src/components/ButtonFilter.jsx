import React from "react";

function ButtonFilter({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="font-medium p-1 border-transparent bg-white rounded-lg text-gray-400 focus:shadow-md focus:border-gray-500 focus:bg-white focus:text-black"
    >
      {text}
    </button>
  );
}

export default ButtonFilter;
