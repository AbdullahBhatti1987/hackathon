import axios from "axios";
import { AppRoutes } from "../constant/constant"; // Adjust the path as per your project structure

// Fetch all assignments
export const fetchAssignments = async (setData) => {
  try {
    const response = await axios.get(AppRoutes.getAllAssignments);
    console.log("response", response?.data?.data);
    setData(response.data?.data); // Update state with fetched assignments
    console.log("Assignments fetched successfully");
  } catch (error) {
    console.error("Error fetching assignments:", error);
  }
};

// Fetch a single assignment
export const fetchSingleAssignment = async (assignmentId, setData) => {
  try {
    const response = await axios.get(
      AppRoutes.getSingleAssignments.replace(":id", assignmentId)
    );
    setData(response.data?.data); // Update state with single assignment details
    console.log("Single assignment fetched successfully");
  } catch (error) {
    console.error("Error fetching single assignment:", error);
  }
};

// Add a new assignment
export const addAssignment = async (assignmentDetails, setAssignments) => {
  try {
    const response = await axios.post(AppRoutes.addAssignment, assignmentDetails);
    if (response.status === 201) {
      const newAssignment = response.data?.data;
      setAssignments((prevAssignments) => [...prevAssignments, newAssignment]);
      console.log("Assignment added successfully");
    }
  } catch (error) {
    console.error("Error adding assignment:", error);
  }
};

// Update an assignment
export const updateAssignment = async (assignmentId, updatedDetails, setAssignments) => {
  try {
    const response = await axios.put(
      AppRoutes.updateAssignment.replace(":id", assignmentId),
      updatedDetails
    );
    if (response.status === 200) {
      const updatedAssignment = response.data;
      setAssignments((prevAssignments) =>
        prevAssignments.map((assignment) =>
          assignment._id === assignmentId ? updatedAssignment : assignment
        )
      );
      console.log("Assignment updated successfully");
    }
  } catch (error) {
    console.error("Error updating assignment:", error);
  }
};

// Delete an assignment
export const deleteAssignment = async (assignmentId, fetchAssignments) => {
  try {
    const response = await axios.delete(
      AppRoutes.deleteAssignment.replace(":id", assignmentId)
    );
    if (response.status === 200) {
      fetchAssignments(); // Refresh assignments after deletion
      console.log("Assignment deleted successfully");
    }
  } catch (error) {
    console.error("Error deleting assignment:", error);
  }
};
