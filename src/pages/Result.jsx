import React, { useContext, useState } from "react";
import { ResultContext } from "../context/Result"; // Import ResultContext

const ResultPage = () => {
  const { results, addResult } = useContext(ResultContext); // Consume ResultContext
  const [studentName, setStudentName] = useState(""); // Student Name state
  const [quizTitle, setQuizTitle] = useState(""); // Quiz Title state
  const [score, setScore] = useState(""); // Score state

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "studentName") setStudentName(value);
    if (name === "quizTitle") setQuizTitle(value);
    if (name === "score") setScore(value);
  };

  // Add result to the list
  const handleAddResult = () => {
    if (studentName && quizTitle && score) {
      const newResult = { studentName, quizTitle, score };
      addResult(newResult); // Add the result to the context
      setStudentName(""); // Reset the form fields
      setQuizTitle("");
      setScore("");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Quiz Result Management</h1>

      {/* Form to add result */}
      <div className="mb-6">
        <div className="mb-4">
          <label htmlFor="studentName" className="block text-sm font-medium">Student Name</label>
          <input
            type="text"
            id="studentName"
            name="studentName"
            value={studentName}
            onChange={handleInputChange}
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="quizTitle" className="block text-sm font-medium">Quiz Title</label>
          <input
            type="text"
            id="quizTitle"
            name="quizTitle"
            value={quizTitle}
            onChange={handleInputChange}
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="score" className="block text-sm font-medium">Score</label>
          <input
            type="number"
            id="score"
            name="score"
            value={score}
            onChange={handleInputChange}
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <button
          onClick={handleAddResult}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
        >
          Add Result
        </button>
      </div>

      {/* List of results */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Results List</h2>
        {results?.length === 0 ? (
          <p className="text-gray-500">No results added yet.</p>
        ) : (
          <ul className="space-y-2">
            {results?.map((result, index) => (
              <li key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-semibold">{result.studentName}</div>
                  <div>{result.quizTitle}</div>
                  <div>{result.score}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ResultPage;
