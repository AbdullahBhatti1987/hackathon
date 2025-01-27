import React, { useState } from "react";

function Toggle() {
  const [darkMode, setDarkMode] = useState(false);


  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
    document.body.style.backgroundColor = darkMode ? "#fff" : "#333";
    document.body.style.color = darkMode ? "#000" : "#fff";
  };

  return (
    <div
      onClick={handleThemeToggle}
      className={`w-10 h-6 flex items-center rounded-full cursor-pointer ${
        darkMode ? "bg-gray-700" : "bg-gray-500"
      }`}
    >
      <div
        className={`w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${
          darkMode ? "translate-x-5" : "translate-x-1"
        }`}
      >
        {darkMode ? "🌙" : "🌞"}
      </div>
    </div>
  );
}

export default Toggle;
