import { createContext, useState, useEffect } from "react";

export const QuizContext = createContext();

function QuizContextProvider({ children }) {
  const [quizzes, setQuizzes] = useState([]);

  // Load quizzes from localStorage
  useEffect(() => {
    const storedQuizzes = JSON.parse(localStorage.getItem("quizzes"));
    if (storedQuizzes) {
      setQuizzes(storedQuizzes);
    }
  }, []);

  // Save quizzes to localStorage
  useEffect(() => {
    if (quizzes.length > 0) {
      localStorage.setItem("quizzes", JSON.stringify(quizzes));
    }
  }, [quizzes]);

  return (
    <QuizContext.Provider value={{ quizzes, setQuizzes }}>
      {children}
    </QuizContext.Provider>
  );
}

export default QuizContextProvider;
