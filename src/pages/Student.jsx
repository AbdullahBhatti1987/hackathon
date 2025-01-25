import React, { useContext, useState } from "react";
import Modal from "react-modal";
import { StudentContext } from "../context/Student"; // Import StudentContext
import Heading1 from "@/components/Heading1";
import Button from "@/components/Button";
import ModalHeading from "@/components/ModalHeading";
import ButtonM from "@/components/ButtonM";

Modal.setAppElement("#root"); // Required for accessibility

const Student = () => {
  const { students, setStudents } = useContext(StudentContext); // Consume StudentContext
  const [isModalOpen, setIsModalOpen] = useState(false); // To handle modal visibility
  const [studentDetails, setStudentDetails] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    enrollmentDate: "",
  }); // Store student details
  const [editingIndex, setEditingIndex] = useState(null); // Track the index of the campus being edited

  // Function to handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentDetails({
      ...studentDetails,
      [name]: value,
    });
  };

  // Function to handle student addition
  const handleAddStudent = () => {
    if (
      studentDetails.name &&
      studentDetails.email &&
      studentDetails.phone &&
      studentDetails.dob &&
      studentDetails.enrollmentDate
    ) {
      // Save the student details in the context
      setStudents([...students, studentDetails]);
      // Clear the form fields
      setStudentDetails({
        name: "",
        email: "",
        phone: "",
        dob: "",
        enrollmentDate: "",
      });
      setIsModalOpen(false); // Close modal after adding student
    }
  };

  const handleEditStudent = (index) => {
    const studentToEdit = students[index];
    setStudentDetails(studentToEdit); // Pre-fill the modal with the existing campus data
    setEditingIndex(index); // Store the index of the campus being edited
    setIsModalOpen(true); // Open the modal for editing
  };

  const handleDeleteStudent = (index) => {
    deleteStudent(index); // Call deleteCampus from context
  };

  return (
    <div className="p-6">
      <Heading1 text={"Student Management"} />

      <ButtonM text={"Add Student"} onClick={() => setIsModalOpen(true)} />

      {/* Modal for adding a student */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)} // Close modal when clicking outside
        className={"modalStyle"}
      >
        <ModalHeading text={"Add Student"} />
        {/* Student Name Input */}
        <div className="mb-4">
          <label htmlFor="student-name" className="block text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            id="student-name"
            name="name"
            value={studentDetails.name}
            onChange={handleInputChange}
            placeholder="Enter student name"
            className="inputClass"
          />
        </div>

        {/* Student Email Input */}
        <div className="mb-4">
          <label htmlFor="student-email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="student-email"
            name="email"
            value={studentDetails.email}
            onChange={handleInputChange}
            placeholder="Enter student email"
            className="inputClass"
          />
        </div>

        {/* Student Phone Input */}
        <div className="mb-4">
          <label htmlFor="student-phone" className="block text-sm font-medium">
            Phone
          </label>
          <input
            type="text"
            id="student-phone"
            name="phone"
            value={studentDetails.phone}
            onChange={handleInputChange}
            placeholder="Enter student phone"
            className="inputClass"
          />
        </div>

        {/* Student Date of Birth Input */}
        <div className="mb-4">
          <label htmlFor="student-dob" className="block text-sm font-medium">
            Date of Birth
          </label>
          <input
            type="date"
            id="student-dob"
            name="dob"
            value={studentDetails.dob}
            onChange={handleInputChange}
            className="inputClass"
          />
        </div>

        {/* Enrollment Date Input */}
        <div className="mb-4">
          <label
            htmlFor="student-enrollment-date"
            className="block text-sm font-medium"
          >
            Enrollment Date
          </label>
          <input
            type="date"
            id="student-enrollment-date"
            name="enrollmentDate"
            value={studentDetails.enrollmentDate}
            onChange={handleInputChange}
            className="inputClass"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <ButtonM text={"Add Student"} onClick={handleAddStudent} />
          <ButtonM text={"Cancel"} onClick={() => setIsModalOpen(false)} />
        </div>
      </Modal>

      {/* List of added students */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Student List</h2>
        {students?.length === 0 ? (
          <p className="text-gray-500">No students added yet.</p>
        ) : (
          <ul className="space-y-2 h-full overflow-y-auto">
            {students?.map((student, index) => (
              <li
              key={index}
              className={`p-4 border border-gray-200 rounded-lg shadow-md transition-transform transform hover:shadow-xl hover:border-gray-400 ${
                index % 2 === 0 ? "bg-blue-100" : ""
              }`}
            >
                <div className="flex items-center justify-between space-x-4 text-sm">
                  <div className="text-gray-900 truncate font-semibold">
                    {student.name}
                  </div>
                  <div className="text-gray-800 truncate">{student.email}</div>
                  <div className="text-gray-600 truncate">{student.phone}</div>
                  <div className="text-gray-700 truncate">
                    <p className="text-sm">
                      Date of Birth:{" "}
                      <span className="font-medium">{student.dob}</span>
                    </p>
                  </div>
                  <div className="text-gray-700 truncate">
                    <p className="text-sm">
                      Enrollment Date:{" "}
                      <span className="font-medium">
                        {student.enrollmentDate}
                      </span>
                    </p>
                  </div>
                  <ButtonM
                    text={"Edit"}
                    variant="text"
                    onClick={() => handleEditStudent(index)}
                  />
                  <ButtonM
                    text={"Delete"}
                    variant="text"
                    onClick={() => handleDeleteStudent(index)}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Student;
