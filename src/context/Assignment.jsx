import { createContext, useState, useEffect } from "react";

export const AssignmentContext = createContext();

function AssignmentContextProvider({ children }) {
  const [assignments, setAssignments] = useState([]);

  // Load assignments from localStorage when the component mounts
  useEffect(() => {
    const storedAssignments = JSON.parse(localStorage.getItem("assignments"));
    if (storedAssignments) {
      setAssignments(storedAssignments);
    }
  }, []);

  // Save assignments to localStorage whenever the assignments state changes
  useEffect(() => {
    if (assignments.length > 0) {
      localStorage.setItem("assignments", JSON.stringify(assignments));
    }
  }, [assignments]);

  return (
    <AssignmentContext.Provider value={{ assignments, setAssignments }}>
      {children}
    </AssignmentContext.Provider>
  );
}

export default AssignmentContextProvider;
