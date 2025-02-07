import { AppRoutes } from "../constant/constant";
import axios from "axios";

export const fetchEmployees = async (setData) => {
  try {
    const response = await axios.get(AppRoutes.getAllEmployees);
    console.log("Response=>", response)
    setData(response.data?.data.employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
  }
};

export const addEmployee = async (employeeDetails, setEmployees) => {
  try {
    const response = await axios.post(AppRoutes.addEmployee, employeeDetails);
    if (response.status === 201) {
      const data = response.data.data;
      console.log("Employee added successfully");
      if (setEmployees) setEmployees((prev) => [...prev, data]);
    }
  } catch (error) {
    console.error("Error adding employee:", error);
  }
};

export const updateEmployee = async (employeeDetails, _id) => {
  try {
    const { updatedBy, ...updatedEmployeeDetails } = employeeDetails;
    const response = await axios.put(AppRoutes.updateEmployee.replace(":id", _id), updatedEmployeeDetails);
    if (response.status === 200) {
      console.log("Employee updated successfully:", response.data);
    } else {
      console.error("Error updating employee");
    }
  } catch (error) {
    console.error("Error in updateEmployee API call:", error);
  }
};

export const deleteEmployee = async (employee) => {
  try {
    const deleteUrl = `${AppRoutes.deleteEmployee.replace(":id", employee._id)}`;
    await axios.delete(deleteUrl);

    console.log("Employee deleted successfully");
  } catch (error) {
    console.error("Error deleting employee:", error);
  }
};
