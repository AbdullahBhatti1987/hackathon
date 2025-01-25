import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import Heading1 from "@/components/Heading1";
import ButtonM from "@/components/ButtonM";
import ModalHeading from "@/components/ModalHeading";
import { AppRoutes } from "@/constant/constant";
import Filter from "@/components/Filter";
import CustomLoader from "@/components/Loader";
import { TextField } from "@mui/material";

Modal.setAppElement("#root");

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [totalUsers, setTotalUsers] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10); // Number of users per page
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    cnic: "",
    gender: "",
    role: "",
    address: "",
    bio: "",
    city: "",
    country: "",
    course: "",
    createdAt: "",
    dob: "",
    education: "",
    fatherName: "",
    imageUrl: "",
  });

  const [editIndex, setEditIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get(AppRoutes.getAllUsers);
      console.log("response=>", response);
      const users = response.data?.data;
      setTotalUsers(users.length);
      setUsers(users);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };


  // Filter users based on the search term
  const filteredUsers = users?.filter((user) =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  // Handle add or update user
  const handleAddOrUpdateUser = async () => {
    try {
      if (editIndex !== null) {
        // Update user
        const userId = users[editIndex]._id;
        const updateUrl = `${AppRoutes.updateUser.replace(":id", userId)}`;

        const payload = {
          fullName: userDetails.fullName,
          email: userDetails.email,
          phone: userDetails.phone,
          cnic: userDetails.cnic,
          gender: userDetails.gender || "Male",
          role: userDetails.role,
        };

        if (userDetails.password) {
          payload.password = userDetails.password; // Only include password if editing
        }

        await axios.put(updateUrl, payload);
      } else {
        // Add new user
        await axios.post(AppRoutes.register, userDetails);
      }

      // Reset state and close modal
      fetchUsers();
      setUserDetails({
        fullName: "",
        email: "",
        password: "",
        phone: "",
        cnic: "",
        gender: "Male",
        role: "user",
      });
      setEditIndex(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving user:", error.message);
    }
  };

  // Open edit modal
  const handleEditUser = (index) => {
    const userToEdit = users[index];
    setUserDetails({ ...userToEdit, password: "" }); // Don't show password when editing
    setEditIndex(index);
    setIsModalOpen(true);
  };

  // Handle delete user
  const confirmDeleteUser = async () => {
    try {
      const userId = users[deleteIndex]._id;
      const deleteUrl = `${AppRoutes.deleteUser.replace(":id", userId)}`;
      await axios.delete(deleteUrl);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }

    setIsDeleteModalOpen(false);
    setDeleteIndex(null);
  };

  return (
    <div className="">
      {/* <Heading1 text="User Management" /> */}
      <div className="flex justify-between items-center mb-4">
        <ButtonM text="Add User" onClick={() => setIsModalOpen(true)} />
        <TextField
        id="outlined-basic"
        label="Search User"
        variant="outlined"
        margin="none"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
        {/* <p>{totalUsers}</p> */}
      </div>


      <div className="overflow-x-auto">
        {filteredUsers?.length > 0 ? ( 
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-100 sticky top-0">
            <tr className="border-b">
              <th className="p-2 border border-gray-200  text-xs truncate">Serial No.</th>
              <th className="p-2 border border-gray-200  text-xs truncate">Roll No.</th>
              <th className="p-2 border border-gray-200  text-xs truncate">Full Name</th>
              <th className="p-2 border border-gray-200  text-xs truncate">Father Name</th>
              <th className="p-2 border border-gray-200  text-xs truncate">Email</th>
              <th className="p-2 border border-gray-200  text-xs truncate">Phone</th>
              <th className="p-2 border border-gray-200  text-xs truncate">Gender</th>
              <th className="p-2 border border-gray-200  text-xs truncate">Address</th>
              <th className="p-2 border border-gray-200  text-xs truncate">City</th>
              <th className="p-2 border border-gray-200  text-xs truncate">Course</th>
              <th className="p-2 border border-gray-200  text-xs truncate">Education</th>
              <th className="p-2 border border-gray-200  text-xs truncate">Role</th>
              <th className="p-2 border border-gray-200  text-xs truncate">Date of Birth</th>
              <th className="p-2 border border-gray-200  text-xs truncate">Father's Name</th>
              <th className="p-2 border border-gray-200  text-xs truncate">Image</th>
              <th className="p-2 border border-gray-200  text-xs truncate">Actions</th>
            </tr>
          </thead>
          <tbody className="scrollbar-custom">
            {filteredUsers?.map((user, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-blue-100" : ""}>
                <td className="px-2 border border-gray-200 text-xs text-center">{index + 1}</td>
                <td className="px-2 border border-gray-200 text-xs truncate">{user?.rollNo}</td>
                <td className="px-2 border border-gray-200 text-xs truncate">{user?.fullName}</td>
                <td className="px-2 border border-gray-200 text-xs truncate">{user?.fatherName}</td>
                <td className="px-2 border border-gray-200 text-xs truncate">{user?.email}</td>
                <td className="px-2 border border-gray-200 text-xs truncate">{user?.phone}</td>
                <td className="px-2 border border-gray-200 text-xs truncate">{user?.gender}</td>
                <td className="px-2 border border-gray-200 text-xs truncate">{user?.address}</td>
                <td className="px-2 border border-gray-200 text-xs truncate">{user?.city?.name || user.city}</td>
                <td className="px-2 border border-gray-200 text-xs truncate">{user?.course}</td>
                <td className="px-2 border border-gray-200 text-xs truncate">{user?.education}</td>
                <td className="px-2 border border-gray-200 text-xs truncate">{user?.role}</td>
                <td className="px-2 border border-gray-200 text-xs truncate">{new Date(user.dob).toLocaleDateString('en-GB')}</td>
                <td className="px-2 border border-gray-200 text-xs truncate">{user?.fatherName}</td>
                <td className="px-2 border border-gray-200 text-xs"><img src={user?.imageUrl} className="rounded-full" alt={user.imageUrl} /></td>
                <td className="px-2 border border-gray-200 text-xs">
                  <div className="flex gap-2 ">
                    <ButtonM text="Edit" className={"text-xs"} variant="text" onClick={() => handleEditUser(index)} />
                    <ButtonM
                      className={"text-xs"}
                      text="Delete"
                      variant="text"
                      onClick={() => {
                        setDeleteIndex(index);
                        setIsDeleteModalOpen(true);
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        ): (
          <div className="mx-auto text-2xl flex justify-center">User not found</div>
        )}
      </div>


      {/* Add/Edit User Modal */}
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className="modalStyle">
        <ModalHeading text={editIndex !== null ? "Edit User" : "Add User"} />
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={userDetails.fullName}
              onChange={handleInputChange}
              className="inputClass"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={userDetails.email}
              onChange={handleInputChange}
              className="inputClass"
            />
          </div>
          {editIndex === null && (
            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={userDetails.password}
                onChange={handleInputChange}
                className="inputClass"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={userDetails.phone}
              onChange={handleInputChange}
              className="inputClass"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">CNIC</label>
            <input
              type="text"
              name="cnic"
              value={userDetails.cnic}
              onChange={handleInputChange}
              className="inputClass"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Gender</label>
            <select name="gender" value={userDetails.gender} onChange={handleInputChange} className="inputClass">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Role</label>
            <select name="role" value={userDetails.role} onChange={handleInputChange} className="inputClass">
              <option value="user">User</option>
              <option value="student">Student</option>
              <option value="trainer">Trainer</option>
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
            </select>
          </div>
          <div className="flex justify-end gap-3">
            <ButtonM text={editIndex !== null ? "Update User" : "Add User"} onClick={handleAddOrUpdateUser} />
            <ButtonM text="Cancel" onClick={() => setIsModalOpen(false)} className="bg-gray-300" />
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onRequestClose={() => setIsDeleteModalOpen(false)} className="modalStyle">
        <div>
          <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
          <p>Are you sure you want to delete this user?</p>
          <div className="flex justify-end gap-4 mt-4">
            <ButtonM text="Cancel" onClick={() => setIsDeleteModalOpen(false)} className="bg-gray-300" />
            <ButtonM text="Delete" onClick={confirmDeleteUser} className="bg-red-500 text-white" />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserManagement;
