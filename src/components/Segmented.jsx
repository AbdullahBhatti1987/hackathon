import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [value, setValue] = useState("Campuses");
  const navigate = useNavigate();

  const HandleRoutes = (val) => {
    console.log("Selected Value:", val);
    setValue(val);
    // navigate to the selected route
    navigate(`/${val.toLowerCase()}`);
  };

  return (
    <div className="flex flex-col items-start gap-4">
      <div className="bg-gray-100 p-2 font-semibold rounded">
        {["Cities" , "Campuses", "Courses", "Batches", "Students", "Trainers", "Users"].map(option => (
          <button
            key={option}
            className={`w-24 m-1 p-2 rounded border ${value === option ? 'b0g-primary text-white' : 'bg-white text-black border-gray-300'} hover:bg-blue-400 hover:text-white`}
            onClick={() => HandleRoutes(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
