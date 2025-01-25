import { createContext, useState, useEffect } from "react";

// Create context
export const CurriculumContext = createContext();

function CurriculumContextProvider({ children }) {
  const [curriculums, setCurriculums] = useState([]);

  // Load curriculums from localStorage when the component mounts
  useEffect(() => {
    const storedCurriculums = JSON.parse(localStorage.getItem("curriculums"));
    if (storedCurriculums) {
      setCurriculums(storedCurriculums);
    }
  }, []);

  // Save curriculums to localStorage whenever the curriculums state changes
  useEffect(() => {
    if (curriculums.length > 0) {
      localStorage.setItem("curriculums", JSON.stringify(curriculums));
    }
  }, [curriculums]);

  return (
    <CurriculumContext.Provider value={{ curriculums, setCurriculums }}>
      {children}
    </CurriculumContext.Provider>
  );
}

export default CurriculumContextProvider;
