import { AppRoutes } from "../constant/constant";
import axios from "axios";

export const fetchDepartments = async (setData) => {
  try {
    const response = await axios.get(AppRoutes.getAllDepartments);
    setData(response.data?.data.departments);
  } catch (error) {
    console.error("Error fetching departments:", error);
  }
};

export const addDepartment = async (departmentDetails, setDepartments) => {
  try {
    const response = await axios.post(AppRoutes.addDepartment, departmentDetails);
    if (response.status === 201) {
      const data = response.data.data;
      setDepartments((prevDepartments) => [...prevDepartments, data]);
      console.log("Department added successfully");
    }
  } catch (error) {
    console.error("Error adding department:", error);
  }
};

export const updateDepartment = async (departmentDetails, _id) => {
  try {
    const updateData = {
      departmentName: departmentDetails.departmentName,
      departmentHead: departmentDetails.departmentHead,
      facultyCount: departmentDetails.facultyCount,
      updatedAt: new Date(),
      updatedBy: departmentDetails.updatedBy || null,
    };

    const response = await axios.put(AppRoutes.updateDepartment.replace(":id", _id), updateData);

    if (response.status === 200) {
      console.log("Department updated successfully:", response.data);
      return response.data?.data; // Return the updated department data
    } else {
      throw new Error("Unexpected response status: " + response.status);
    }
  } catch (error) {
    console.error("Error updating department:", error);
    throw error; // Re-throw the error to be handled in the calling function
  }
};

export const deleteDepartment = async (departmentData, setDepartments) => {
  try {
    const deleteUrl = `${AppRoutes.deleteDepartment.replace(":id", departmentData._id)}`;
    const response = await axios.delete(deleteUrl);
    if (response.status === 200) {
      setDepartments((prevDepartments) => prevDepartments.filter((prevDepartment) => prevDepartment._id !== departmentData._id));
      console.log("Department deleted successfully");
    }
  } catch (error) {
    console.error("Error deleting department:", error);
  }
};
