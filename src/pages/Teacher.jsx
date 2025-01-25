import React, { useContext, useState } from "react";
import Modal from "react-modal";
import { TeacherContext } from "../context/Teacher";
import Heading1 from "@/components/Heading1";
import ModalHeading from "@/components/ModalHeading";
import ButtonM from "@/components/ButtonM";

Modal.setAppElement("#root");

const Teacher = () => {
  const { teachers, setTeachers } = useContext(TeacherContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teacherDetails, setTeacherDetails] = useState({
    name: "",
    email: "",
    phone: "",
    hireDate: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeacherDetails({
      ...teacherDetails,
      [name]: value,
    });
  };

  const handleAddTeacher = () => {
    if (
      teacherDetails.name &&
      teacherDetails.email &&
      teacherDetails.phone &&
      teacherDetails.hireDate
    ) {
      const updatedTeachers = editingIndex !== null
        ? teachers.map((teacher, index) =>
            index === editingIndex ? teacherDetails : teacher
          )
        : [...teachers, teacherDetails];

      setTeachers(updatedTeachers);
      setTeacherDetails({
        name: "",
        email: "",
        phone: "",
        hireDate: "",
      });
      setIsModalOpen(false);
      setEditingIndex(null);
    }
  };

  const handleEditTeacher = (index) => {
    setTeacherDetails(teachers[index]);
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const handleDeleteTeacher = (index) => {
    const updatedTeachers = teachers.filter((_, i) => i !== index);
    setTeachers(updatedTeachers);
  };

  return (
    <div className="p-6">
      <Heading1 text={"Teacher Management"} />
      <ButtonM text={"Add Teacher"} onClick={() => setIsModalOpen(true)} />

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className={"modalStyle"}
      >
        <ModalHeading
          text={editingIndex !== null ? "Update Teacher" : "Add Teacher"}
        />
        <div className="mb-4">
          <label htmlFor="teacher-name" className="block text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            id="teacher-name"
            name="name"
            value={teacherDetails.name}
            onChange={handleInputChange}
            placeholder="Enter teacher name"
            className="inputClass"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="teacher-email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="teacher-email"
            name="email"
            value={teacherDetails.email}
            onChange={handleInputChange}
            placeholder="Enter teacher email"
            className="inputClass"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="teacher-phone" className="block text-sm font-medium">
            Phone
          </label>
          <input
            type="text"
            id="teacher-phone"
            name="phone"
            value={teacherDetails.phone}
            onChange={handleInputChange}
            placeholder="Enter teacher phone"
            className="inputClass"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="teacher-hireDate" className="block text-sm font-medium">
            Hire Date
          </label>
          <input
            type="date"
            id="teacher-hireDate"
            name="hireDate"
            value={teacherDetails.hireDate}
            onChange={handleInputChange}
            className="inputClass"
          />
        </div>

        <div className="flex justify-end gap-3">
          <ButtonM
            text={editingIndex !== null ? "Update Teacher" : "Add Teacher"}
            onClick={handleAddTeacher}
          />
          <ButtonM text={"Cancel"} onClick={() => setIsModalOpen(false)} />
        </div>
      </Modal>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Teacher List</h2>
        {teachers?.length === 0 ? (
          <p className="text-gray-500">No teachers added yet.</p>
        ) : (
          <ul className="space-y-2 h-full overflow-y-auto">
            {teachers.map((teacher, index) => (
              <li
                key={index}
                className={`p-4 border border-gray-200 rounded-lg shadow-md transition-transform transform hover:shadow-xl hover:border-gray-400 ${
                  index % 2 === 0 ? "bg-blue-100" : ""
                }`}
              >
                <div className="flex items-center justify-between space-x-4 text-sm">
                  <div className="w-1/6 truncate font-semibold">{teacher.name}</div>
                  <div className="w-1/6 truncate">{teacher.email}</div>
                  <div className="w-1/6 truncate">{teacher.phone}</div>
                  <div className="w-1/6 truncate">{teacher.hireDate}</div>
                  <div className="flex gap-2">
                    <ButtonM
                      text={"Edit"}
                      variant="text"
                      onClick={() => handleEditTeacher(index)}
                    />
                    <ButtonM
                      text={"Delete"}
                      variant="text"
                      onClick={() => handleDeleteTeacher(index)}
                    />
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

export default Teacher;
