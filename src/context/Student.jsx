import { createContext, useEffect, useState } from "react";

export const StudentContext = createContext();

function StudentContextProvider({ children }) {
  const [students, setStudents] = useState([]);

  // Load students from localStorage when the component mounts
  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem("students"));
    if (storedStudents) {
      setStudents(storedStudents);
    }
  }, []);

  // Save students to localStorage whenever the students state changes
  useEffect(() => {
    if (students.length > 0) {
      localStorage.setItem("students", JSON.stringify(students));
    }
  }, [students]);

  // Function to add a student to the list
  const addStudent = (student) => {
    setStudents((prevStudents) => [...prevStudents, student]);
  };

  return (
    <StudentContext.Provider value={{ students, setStudents, addStudent }}>
      {children}
    </StudentContext.Provider>
  );
}

export default StudentContextProvider;
