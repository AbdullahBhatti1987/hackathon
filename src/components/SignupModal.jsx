import { useState } from "react";
import axios from "axios";
import Modal from "react-modal";

function SignupModal({ isModalOpen, setIsModalOpen }) {
  const [employee, setEmployee] = useState({ cnic: "", password: "" });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value,
    });
  };

  // Reset form
  const resetForm = () => {
    setEmployee({ cnic: "", password: "" });
  };

  // Search and update logic
  const handleSearch = async () => {
    if (!employee.cnic || !employee.password) {
      alert("Please fill in both CNIC and Password fields.");
      return;
    }

    try {
      // Search for CNIC in the database
      const searchResponse = await axios.get(`/api/employees?cnic=${employee.cnic}`);
      if (searchResponse.data?.success && searchResponse.data?.employee) {
        const employeeId = searchResponse.data.employee._id;

        // Update password for the found employee
        const updateResponse = await axios.put(`/api/employees/${employeeId}`, {
          password: employee.password,
        });

        if (updateResponse.data?.success) {
          alert("Password updated successfully!");
          resetForm();
          setIsModalOpen(false);
        } else {
          alert("Failed to update the password. Please try again.");
        }
      } else {
        alert("No employee found with the provided CNIC.");
      }
    } catch (error) {
      console.error("Error during search or update:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="modalStyle"
      >
        <h2 className="text-xl font-bold mb-4">Update Password</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <div className="mb-4">
            <label htmlFor="cnic" className="block mb-2">
              CNIC Number
            </label>
            <input
              type="text"
              id="cnic"
              name="cnic"
              value={employee.cnic}
              onChange={handleInputChange}
              placeholder="Enter CNIC"
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">
              Create Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={employee.password}
              onChange={handleInputChange}
              placeholder="Enter new password"
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default SignupModal;
