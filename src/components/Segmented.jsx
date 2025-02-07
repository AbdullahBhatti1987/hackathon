import React from "react";

const App = ({ onClick, value }) => {

  return (
    <div className="bg-blue-100 p-1.5 font-semibold rounded-lg shadow-sm shadow-gray-600">
      {["Cities", "Branches", "Departments", "Employees", "Seekers"].map((option) => (
        <button
          key={option}
          className={`w-fit m-1 py-1.5 px-4 rounded border shadow-md ${
            value === option
              ? "bg-blue-200 hover:bg-blue-300 focus:bg-blue-300"
              : "bg-white text-black border-gray-300 hover:bg-blue-100"
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
