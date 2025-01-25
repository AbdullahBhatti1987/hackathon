import React, { createContext, useEffect, useState } from 'react';

// Create the context
export const ClassContext = createContext();

function ClassContextProvider({ children }) {
  const [classes, setClasses] = useState([]);

  // Load classes from localStorage when the component mounts
  useEffect(() => {
    const storedClasses = JSON.parse(localStorage.getItem('classes'));
    if (storedClasses) {
      setClasses(storedClasses);
    }
  }, []);

  // Save classes to localStorage whenever the classes state changes
  useEffect(() => {
    if (classes.length > 0) {
      localStorage.setItem('classes', JSON.stringify(classes));
    }
  }, [classes]);

  return (
    <ClassContext.Provider value={{ classes, setClasses }}>
      {children}
    </ClassContext.Provider>
  );
}

export default ClassContextProvider;
