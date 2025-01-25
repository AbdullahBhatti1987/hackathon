import React, { useContext, useState } from "react";
import Modal from "react-modal";
import { CurriculumContext } from "../context/Curriculums"; // Import the CurriculumContext
import Button from "@/components/Button";
import Heading1 from "@/components/Heading1";
import ModalHeading from "@/components/ModalHeading";

Modal.setAppElement("#root"); // Accessibility for modal

const Curriculum = () => {
  const { curriculums, setCurriculums } = useContext(CurriculumContext); // Using the context
  const [isModalOpen, setIsModalOpen] = useState(false); // Handle modal visibility
  const [curriculumDetails, setCurriculumDetails] = useState({
    subject: "",
    description: "",
    duration: "", // Duration in hours or weeks
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurriculumDetails({
      ...curriculumDetails,
      [name]: value,
    });
  };

  const handleAddCurriculum = () => {
    if (
      curriculumDetails.subject &&
      curriculumDetails.description &&
      curriculumDetails.duration
    ) {
      // Add the new curriculum to the state
      setCurriculums((prevCurriculums) => [
        ...prevCurriculums,
        curriculumDetails,
      ]);

      // Clear form fields
      setCurriculumDetails({
        subject: "",
        description: "",
        duration: "",
      });

      setIsModalOpen(false); // Close modal after adding curriculum
    }
  };

  return (
    <div className="p-6">
      <Heading1 text={"Curriculum Management"} />
      <Button text={"Add Curriculum"} onClick={() => setIsModalOpen(true)} />

      {/* Modal to add curriculum */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)} // Close modal when clicking outside
        className={"modalStyle"}
      >
        <ModalHeading text={"Add Curriculum"} />

        <div className="mb-4">
          <label htmlFor="subject" className="block text-sm font-medium">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={curriculumDetails.subject}
            onChange={handleInputChange}
            placeholder="Enter subject name"
            className="inputClass"
          />
        </div>

        {/* Description Input */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={curriculumDetails.description}
            onChange={handleInputChange}
            placeholder="Enter description"
            className="inputClass"
          />
        </div>

        {/* Duration Input */}
        <div className="mb-4">
          <label htmlFor="duration" className="block text-sm font-medium">
            Duration
          </label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={curriculumDetails.duration}
            onChange={handleInputChange}
            placeholder="Enter duration"
            className="inputClass"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={handleAddCurriculum}
            className="px-6 py-2 bg-black text-white rounded-md shadow-md hover:bg-gray-200 transition"
          ></button>
          <Button text={"Add Curriculum"} onClick={handleAddCurriculum} />
          <Button text={"Cancel"} onClick={() => setIsModalOpen(false)} />
        </div>
      </Modal>

      {/* List of added curriculums */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Curriculum List</h2>
        {curriculums?.length === 0 ? (
          <p className="text-gray-500">No curriculums added yet.</p>
        ) : (
          <ul className="space-y-2 h-full overflow-y-auto">
            {curriculums?.map((curriculum, index) => (
              <li
                key={index}
                className={`p-4 border border-gray-200 rounded-lg shadow-md transition-transform transform hover:shadow-xl hover:border-gray-400 ${
                  index % 2 === 0 ? "bg-gray-100" : ""
                }`}
              >
                <div className={`grid grid-cols-3 gap-4 items-center`}>
                  <div className="text-gray-900 font-semibold">
                    {curriculum.subject}
                  </div>
                  <div className="text-gray-800">{curriculum.description}</div>
                  <div className="text-gray-600">{curriculum.duration}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Curriculum;
