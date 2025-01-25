import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import { QuizContext } from "../context/Quiz"; // Import QuizContext
import Button from "@/components/Button";
import Heading1 from "@/components/Heading1";
import ModalHeading from "@/components/ModalHeading";
import SelectWithLabel from "@/components/SelectWithLabel";
import { fetchCourses } from "@/api/Course";
import { fetchBatches } from "@/api/Batch";

const Quiz = () => {
  const { quizzes, setQuizzes } = useState([]); // Consume QuizContext
  const { courses, setCourses } = useState([]); // Courses QuizContext
  const { batches, setBatches } = useState([]); // Batches QuizContext
  const [isModalOpen, setIsModalOpen] = useState(false); // To handle modal visibility
  const [quizDetails, setQuizDetails] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  }); // Store quiz question details

  useEffect(async () => {
    try {
      
      fetchCourses(setCourses);
      fetchBatches(setBatches);
      
      console.log("courses=>", courses);
      console.log("batches=>", batches);
      // console.log("batches=>", batches);
    } catch (error) {
      console.log("waiting for data")
    }
  }, []);

  // useEffect(() => {
  //   if (quizDetails) {
  //    try {
  //      console.log("quizzes=>", quizzes)
  //     const campusesInCity = campuses.filter((campus) => campus.city._id === classDetails.city);
  //     console.log("campusesInCity=>", campusesInCity)
  //     setFilteredCampuses(campusesInCity);
  //   } catch (error) {
  //      console.log("campusesInCity=>", campusesInCity)

  //    }
  //   } else {
  //     setFilteredCampuses([]);
  //   }
  // }, [classDetails]);


  // Function to handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuizDetails({
      ...quizDetails,
      [name]: value,
    });
  };

  // Function to handle options change
  const handleOptionChange = (e, index) => {
    const newOptions = [...quizDetails.options];
    newOptions[index] = e.target.value;
    setQuizDetails({
      ...quizDetails,
      options: newOptions,
    });
  };

  // Function to handle quiz addition
  const handleAddQuiz = () => {
    if (quizDetails.question && quizDetails.options.every((option) => option !== "") && quizDetails.correctAnswer) {
      // Save the quiz details in the context
      setQuizzes([...quizzes, quizDetails]);
      // Clear the form fields
      setQuizDetails({
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
      });
      setIsModalOpen(false); // Close modal after adding quiz
    }
  };

  return (
    <div className="p-6">
      <Heading1 text={"Quiz Management"} />
      <Button text={"Add Quiz"} onClick={() => setIsModalOpen(true)} />

      {/* Modal for adding a quiz */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)} // Close modal when clicking outside
        className={"modalStyle"}
      >
        <ModalHeading text={"Add Quiz"} />

        <div className="mb-4 flex gap-4 justify-between items-center">
          <label htmlFor="quiz-title" className="block text-sm font-medium w-1/4">
            Quiz Title
          </label>
          <input
            type="text"
            id=""
            name=""
            value={""}
            onChange={handleInputChange}
            placeholder="Enter quiz title"
            className="inputClass w-3/4"
          />
        </div>

        <SelectWithLabel
          label="Course"
          id="batch-course"
          name="course"
          value={"_id"}
          onChange={handleInputChange}
          options={courses}
          placeholder="Select Course"
          saveItem={"_id"}
          view="title"
        />

        

      

        

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <Button text={"Add Quiz"} onClick={handleAddQuiz} />
          <Button text={"Cancel"} onClick={() => setIsModalOpen(false)} />
        </div>
      </Modal>

      {/* List of added quizzes */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Quizzes List</h2>
        {quizzes?.length === 0 ? (
          <p className="text-gray-500">No quizzes added yet.</p>
        ) : (
          <ul className="space-y-2 h-full overflow-y-auto">
            {quizzes?.map((quiz, index) => (
              <li
                key={index}
                className={`p-4 border border-gray-200 rounded-lg shadow-md transition-transform transform hover:shadow-xl hover:border-gray-400 ${index % 2 === 0 ? "bg-gray-100" : ""}`}
              >
                <div className="grid grid-cols-3 gap-4 items-center">
                  <div className="text-gray-900 font-semibold">{quiz.question}</div>
                  <div className="text-gray-800">{quiz.options.join(", ")}</div>
                  <div className="text-gray-600">{quiz.correctAnswer}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Quiz;
