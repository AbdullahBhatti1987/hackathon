import React from "react";

function Button({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2  font-semibold rounded-lg shadow-lg hover:bg-white hover:text-black transition ${text === 'Cancel' ? "bg-white text-black" : "bg-black text-white"}`}
    >
      {text}
    </button>
  );
}

export default Button;
