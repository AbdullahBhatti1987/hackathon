import React, { useContext, useState } from "react";
import Modal from "react-modal";
import { AttendanceContext } from "../context/Attendance"; // Import the AttendanceContext
import Button from "@/components/Button";
import ModalHeading from "@/components/ModalHeading";
import Heading1 from "@/components/Heading1";
import ButtonM from "@/components/ButtonM";

Modal.setAppElement("#root"); // Accessibility for modal

const AttendancePage = () => {
  const { attendanceRecords, setAttendanceRecords } =
    useState([]); // Use the context
  const [isModalOpen, setIsModalOpen] = useState(false); // To handle modal visibility
  const [attendanceDetails, setAttendanceDetails] = useState({
    studentName: "",
    date: "",
    isPresent: false,
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAttendanceDetails({
      ...attendanceDetails,
      [name]: value,
    });
  };

  // Add attendance record
  const handleAddAttendance = () => {
    if (attendanceDetails.studentName && attendanceDetails.date) {
      setAttendanceRecords([...attendanceRecords, attendanceDetails]);

      // Clear form fields
      setAttendanceDetails({
        studentName: "",
        date: "",
        isPresent: false,
      });

      setIsModalOpen(false); // Close modal after adding attendance
    }
  };

  return (
    <div className="p-6">
      
      <Heading1 text={"Student Attendance"} />
      
      <ButtonM
       
       text={"Mark Attendance"}
       startIcon={""}
       onClick={() => setIsModalOpen(true)}
     />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)} // Close modal when clicking outside
        className={"modalStyle"}
      >
        <ModalHeading text={"Mark Attendance"} />

        {/* Student Name Input */}
        <div className="mb-4">
          <label htmlFor="student-name" className="block text-sm font-medium">
            Student Name
          </label>
          <input
            type="text"
            id="student-name"
            name="studentName"
            value={attendanceDetails.studentName}
            onChange={handleInputChange}
            placeholder="Enter student name"
            className="inputClass"
          />
        </div>

        {/* Date Input */}
        <div className="mb-4">
          <label
            htmlFor="attendance-date"
            className="block text-sm font-medium"
          >
            Attendance Date
          </label>
          <input
            type="date"
            id="attendance-date"
            name="date"
            value={attendanceDetails.date}
            onChange={handleInputChange}
            className="inputClass"
          />
        </div>

        {/* Attendance Status Checkbox */}
        <div className="mb-4">
          <label
            htmlFor="isPresent"
            className="flex items-center text-sm font-medium"
          >
            <input
              type="checkbox"
              id="isPresent"
              name="isPresent"
              checked={attendanceDetails.isPresent}
              onChange={(e) =>
                setAttendanceDetails({
                  ...attendanceDetails,
                  isPresent: e.target.checked,
                })
              }
              className="mr-2"
            />
            Present
          </label>
        </div>

        <div className="flex justify-end gap-3">
        
          <ButtonM text={"Add Attendance"} onClick={handleAddAttendance} />
          <ButtonM text={"Cancle"} onClick={() => setIsModalOpen(false)} />
        </div>
      </Modal>

      {/* Display List of Attendance Records */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Attendance Records</h2>
        {attendanceRecords?.length === 0 ? (
          <p className="text-gray-500">No attendance records yet.</p>
        ) : (
          <ul className="space-y-2 h-full overflow-y-auto">
            {attendanceRecords?.map((attendance, index) => (
              <li
                key={index}
                className={`p-4 border border-gray-200 rounded-lg shadow-md transition-transform transform hover:shadow-xl hover:border-gray-400 ${
                  index % 2 === 0 ? "bg-gray-100" : ""
                }`}
              >
                <div className={`grid grid-cols-3 gap-4 items-center`}>
                  <div className="text-gray-900 font-semibold">
                    {attendance?.studentName}
                  </div>
                  <div className="text-gray-800">{attendance?.date}</div>
                  <div className="text-gray-600">
                    {attendance.isPresent ? "Present" : "Absent"}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AttendancePage;
