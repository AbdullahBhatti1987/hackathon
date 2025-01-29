import React from "react";

const App = ({ onClick, value }) => {
  return (
    <div className="bg-gray-200 p-2 font-semibold rounded-lg shadow-sm shadow-gray-600">
      {["Cities", "Branches", "Departments", "Employees", "Seekers"].map((option) => (
        <button
          key={option}
          className={`w-fit m-1 py-1.5 px-4 rounded border shadow-md ${
            value === option
              ? "bg-primary text-white"
              : "bg-white text-black border-gray-300"
          }`}
          onClick={() => onClick(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default App;
