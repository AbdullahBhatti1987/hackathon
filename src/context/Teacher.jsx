import { createContext, useEffect, useState } from "react";

export const TeacherContext = createContext();

function TeacherContextProvider({ children }) {
  const [teachers, setTeachers] = useState([]);

  // Load teachers from localStorage when the component mounts
  useEffect(() => {
    const storedTeachers = JSON.parse(localStorage.getItem("teachers"));
    if (storedTeachers) {
      setTeachers(storedTeachers);
    }
  }, []);

  // Save teachers to localStorage whenever the teachers state changes
  useEffect(() => {
    if (teachers.length > 0) {
      localStorage.setItem("teachers", JSON.stringify(teachers));
    }
  }, [teachers]);

  // Function to add a teacher to the list
  const addTeacher = (teacher) => {
    setTeachers((prevTeachers) => [...prevTeachers, teacher]);
  };

  return (
    <TeacherContext.Provider value={{ teachers, setTeachers, addTeacher }}>
      {children}
    </TeacherContext.Provider>
  );
}

export default TeacherContextProvider;
