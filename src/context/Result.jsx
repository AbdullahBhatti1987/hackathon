import { createContext, useState, useEffect } from "react";

export const ResultContext = createContext();

function ResultContextProvider({ children }) {
  const [results, setResults] = useState([]);

  // Load results from localStorage when the component mounts
  useEffect(() => {
    const storedResults = JSON.parse(localStorage.getItem("results"));
    if (storedResults) {
      setResults(storedResults);
    }
  }, []);

  // Save results to localStorage whenever the results state changes
  useEffect(() => {
    if (results.length > 0) {
      localStorage.setItem("results", JSON.stringify(results));
    }
  }, [results]);

  // Function to add a result
  const addResult = (result) => {
    setResults((prevResults) => [...prevResults, result]);
  };

  return (
    <ResultContext.Provider value={{ results, addResult }}>
      {children}
    </ResultContext.Provider>
  );
}

export default ResultContextProvider;
