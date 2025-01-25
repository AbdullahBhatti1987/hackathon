import React, { useContext, useState } from "react";
import Modal from "react-modal";
import { StaffContext } from "../context/Staff"; // Import the StaffContext
import Button from "@/components/Button";
import Heading1 from "@/components/Heading1";
import ModalHeading from "@/components/ModalHeading";



Modal.setAppElement("#root"); // Accessibility for modal

const Staff = () => {
  const { staffMembers, setStaffMembers } = useContext(StaffContext); // Using the context
  const [isModalOpen, setIsModalOpen] = useState(false); // Handle modal visibility
  const [staffDetails, setStaffDetails] = useState({
    name: "",
    email: "",
    role: "", // Role (Admin, Teacher, etc.)
    hasAccess: false, // Whether staff has access to certain rights
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStaffDetails({
      ...staffDetails,
      [name]: value,
    });
  };

  const handleAddStaff = () => {
    if (staffDetails.name && staffDetails.email && staffDetails.role) {
      // Add the new staff member to the state
      setStaffMembers((prevStaffMembers) => [
        ...prevStaffMembers,
        staffDetails,
      ]);

      // Clear form fields
      setStaffDetails({
        name: "",
        email: "",
        role: "",
        hasAccess: false,
      });

      setIsModalOpen(false); // Close modal after adding staff
    }
  };

  return (
    <div className="p-6">
     
      <Heading1 text={"Staff Management"} />
      <Button text={"Add User"} onClick={() => setIsModalOpen(true)} />

      {/* Modal to add staff */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)} // Close modal when clicking outside
        className={"modalStyle"}
      >
        <ModalHeading text={"Add Staff Member"} />
        {/* Name Input */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium">
            Staff Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={staffDetails.name}
            onChange={handleInputChange}
            placeholder="Enter staff name"
            className="inputClass"
          />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={staffDetails.email}
            onChange={handleInputChange}
            placeholder="Enter staff email"
            className="inputClass"
          />
        </div>

        {/* Role Selection */}
        <div className="mb-4">
          <label htmlFor="role" className="block text-sm font-medium">
            Role
          </label>
          <select
            id="role"
            name="role"
            value={staffDetails.role}
            onChange={handleInputChange}
            className="inputClass"
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Teacher">Teacher</option>
            <option value="Staff">Staff</option>
          </select>
        </div>

        {/* Access Rights Checkbox */}
        <div className="mb-4">
          <label
            htmlFor="hasAccess"
            className="flex items-center text-sm font-medium"
          >
            <input
              type="checkbox"
              id="hasAccess"
              name="hasAccess"
              checked={staffDetails.hasAccess}
              onChange={(e) =>
                setStaffDetails({
                  ...staffDetails,
                  hasAccess: e.target.checked,
                })
              }
              className="mr-2"
            />
            Grant Access Rights
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          
          <Button text={"Add Staff"} onClick={handleAddStaff} />
          <Button text={"Cancel"} onClick={() => setIsModalOpen(false)} />
        </div>
      </Modal>

      {/* List of added staff members */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Staff List</h2>
        {staffMembers?.length === 0 ? (
          <p className="text-gray-500">No staff added yet.</p>
        ) : (
          <ul className="space-y-2 h-full overflow-y-auto">
            {staffMembers?.map((staff, index) => (
              <li
                key={index}
                className={`p-4 border border-gray-200 rounded-lg shadow-md transition-transform transform hover:shadow-xl hover:border-gray-400 ${
                  index % 2 === 0 ? "bg-gray-100" : ""
                }`}
              >
                <div className={`grid grid-cols-3 gap-4 items-center`}>
                  <div className="text-gray-900 font-semibold">
                    {staff.name}
                  </div>
                  <div className="text-gray-800">{staff.email}</div>
                  <div className="text-gray-600">{staff.role}</div>
                  <div className="flex gap-4 text-gray-700">
                    <p className="text-sm">
                      Access:{" "}
                      <span className="font-medium">
                        {staff.hasAccess ? "Granted" : "Denied"}
                      </span>
                    </p>
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

export default Staff;
