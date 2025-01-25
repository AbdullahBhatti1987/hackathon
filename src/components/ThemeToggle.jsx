import React, { useState, useEffect } from 'react';
import { IoIosMoon, IoIosSunny } from 'react-icons/io';
import { Switch } from '@headlessui/react'; // Assuming you're using this Switch

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check if a theme is stored in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
  };

  return (
    <div className="flex justify-center items-center p-2 text-2xl text-black hover:text-neutral-700">
      <Switch
        checked={darkMode}
        onChange={toggleTheme}
        className={`${
          darkMode ? 'bg-gray-900' : 'bg-gray-200'
        } relative inline-flex items-center h-6 rounded-full w-12`}
      >
        <span className="sr-only">Toggle Dark Mode</span>
        <span
          className={`${
            darkMode ? 'translate-x-6' : 'translate-x-1'
          } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
        />
      </Switch>
      {darkMode ? (
        <IoIosMoon className="text-gray-700" />
      ) : (
        <IoIosSunny className="text-yellow-500" />
      )}
    </div>
  );
};

export default ThemeToggle;
