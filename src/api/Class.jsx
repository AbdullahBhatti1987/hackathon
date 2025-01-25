import { AppRoutes } from "../constant/constant";
import axios from "axios";

export const fetchClasses = async (setData) => {
  try {
    const response = await axios.get(AppRoutes.getAllClasses);
    setData(response.data?.data);
  } catch (error) {
    console.error("Error fetching classes:", error);
  }
};

export const addClass = async (classDetails, setClasses) => {
  try {
    const response = await axios.post(AppRoutes.addClass, classDetails);
    if (response.status === 201) {
      const data = response.data.data;
      setClasses((prevClasses) => [...prevClasses, data]);
      console.log("Class added successfully");
    }
  } catch (error) {
    console.error("Error adding class:", error);
  }
};

export const updateClass = async (classDetails, _id) => {
  try {
    const updateData = {
      ClassTitle: classDetails.classTitle,
      classType: classDetails.classType,
      capacity: classDetails.capacity,
      city: classDetails.city,
      campus: classDetails.campus,
      updatedAt: new Date(),
      updatedBy: classDetails.updatedBy || null,
    };
 
    const response = await axios.put(AppRoutes.updateClass.replace(":id", _id), updateData);

    if (response.status === 200) {
      console.log("Class updated successfully:", response.data);
      return response.data?.data; // Return the updated class data
    } else {
      throw new Error("Unexpected response status: " + response.status);
    }
  } catch (error) {
    console.error("Error updating class:", error);
    throw error; // Re-throw the error to be handled in the calling function
  }
};



export const deleteClass = async (classData, setClasses) => {
  try {
    const deleteUrl = `${AppRoutes.deleteClass.replace(":id", classData._id)}`;
    const response = await axios.delete(deleteUrl);
    if (response.status === 200) {
      setClasses((prevClasses) => prevClasses.filter((prevClass) => prevClass._id !== classData._id));
      console.log("Class deleted successfully");
    }
  } catch (error) {
    console.error("Error deleting class:", error);
  }
};
