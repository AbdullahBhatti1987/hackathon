import React, { useState, useContext } from "react";
import { RegistrationContext } from "../context/Registration";
import Modal from "react-modal";
import Button from "@/components/Button";
import Heading1 from "@/components/Heading1";
import ModalHeading from "@/components/ModalHeading";

Modal.setAppElement("#root"); // Required for accessibility

const RegistrationPage = () => {
  const { registrations, handleRegister, handleQuizStatus } = useContext(RegistrationContext);

  const [isModalOpen, setIsModalOpen] = useState(false); // Modal for registration
  const [studentDetails, setStudentDetails] = useState({
    studentName: "",
    course: "",
    batch: "",
    registrationDate: "",
  });
  const [selectedFilter, setSelectedFilter] = useState({
    course: "",
    batch: "",
    registrationDate: "",
  });

  const [quizPassed, setQuizPassedState] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentDetails({
      ...studentDetails,
      [name]: value,
    });
  };

  // Handle quiz pass or fail
  const handleQuizPass = (status) => {
    setQuizPassedState(status);
    handleQuizStatus(status);
  };

  // Handle form submission
  const handleSubmit = () => {
    handleRegister(studentDetails);
    setIsModalOpen(false);
  };

  // Filter registrations based on selected filter
  const filteredRegistrations = registrations.filter((reg) => {
    return (
      (selectedFilter.course ? reg.course === selectedFilter.course : true) &&
      (selectedFilter.batch ? reg.batch === selectedFilter.batch : true) &&
      (selectedFilter.registrationDate ? reg.registrationDate === selectedFilter.registrationDate : true)
    );
  });

  return (
    <div className="p-6">
      <Heading1 text={"Student Registration"} />

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setSelectedFilter({ ...selectedFilter, course: "Course 1" })}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Course 1
        </button>
        <button
          onClick={() => setSelectedFilter({ ...selectedFilter, batch: "Batch A" })}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Batch A
        </button>
        <button
          onClick={() => setSelectedFilter({ ...selectedFilter, registrationDate: "2024-12-25" })}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Date: 2024-12-25
        </button>
      </div>

      {/* Button to open modal for registration */}
      <Button text={"Register Now"} onClick={() => setIsModalOpen(true)} />

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)} // Close modal when clicking outside
        className={"modalStyle max-h-[80vh] overflow-y-auto scrollbar-custom"} // Added max-height and overflow styles
      >
        <ModalHeading text={"Student Registration"} />

        {/* Quiz Status */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Quiz Status</label>
          <div>
            <button onClick={() => handleQuizPass(true)} className="px-4 py-2 bg-green-500 text-white rounded-lg">
              Pass Quiz
            </button>
            <button onClick={() => handleQuizPass(false)} className="px-4 py-2 bg-red-500 text-white rounded-lg ml-2">
              Fail Quiz
            </button>
          </div>
        </div>

        {/* Student Name Input */}
        <div className="mb-4">
          <label htmlFor="student-name" className="block text-sm font-medium">
            Student Name
          </label>
          <input
            type="text"
            id="student-name"
            name="studentName"
            value={studentDetails.studentName}
            onChange={handleInputChange}
            placeholder="Enter your name"
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        

        {/* Course Selection */}
        <div className="mb-4">
          <label htmlFor="course" className="block text-sm font-medium">
            Course
          </label>
          <select
            id="course"
            name="course"
            value={studentDetails.course}
            onChange={handleInputChange}
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md"
          >
            <option value="">Select Course</option>
            <option value="Course 1">Course 1</option>
            <option value="Course 2">Course 2</option>
          </select>
        </div>

        {/* Repeat Course Selection for other fields */}
        {/* ... (repeat the course selection input as needed) ... */}

        {/* Batch Selection */}
        <div className="mb-4">
          <label htmlFor="batch" className="block text-sm font-medium">
            Batch
          </label>
          <select
            id="batch"
            name="batch"
            value={studentDetails.batch}
            onChange={handleInputChange}
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md"
          >
            <option value="">Select Batch</option>
            <option value="Batch A">Batch A</option>
            <option value="Batch B">Batch B</option>
          </select>
        </div>

        {/* Registration Date */}
        <div className="mb-4">
          <label htmlFor="registrationDate" className="block text-sm font-medium">
            Registration Date
          </label>
          <input
            type="date"
            id="registrationDate"
            name="registrationDate"
            value={studentDetails.registrationDate}
            onChange={handleInputChange}
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-3">
          <Button text={"Register"} onClick={handleSubmit} />
          <Button text={"Cancel"} onClick={() => setIsModalOpen(false)} />
        </div>
      </Modal>

      {/* Display filtered registrations */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Registrations</h2>
        {filteredRegistrations.length === 0 ? (
          <p className="text-gray-500">No registrations found.</p>
        ) : (
          <ul className="space-y-4">
            {filteredRegistrations.map((registration, index) => (
              <li key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-semibold">{registration.studentName}</div>
                  <div>{registration.course}</div>
                  <div>{registration.batch}</div>
                  <div>{registration.registrationDate}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RegistrationPage;
