import React, { useState } from "react";
import { IoMoon } from "react-icons/io5";
import { MdWbSunny } from "react-icons/md";
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
      className={`w-10 h-6 flex items-center rounded-full cursor-pointer shadow-sm ${
        darkMode ? "bg-gray-600" : "bg-gray-200"
      }`}
    >
      <div
        className={`w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${
          darkMode ? "translate-x-5" : "translate-x-1"
        }`}
      >
        {darkMode ? <IoMoon color="white"/> : <MdWbSunny/>}
      </div>
    </div>
  );
}

export default Toggle;
