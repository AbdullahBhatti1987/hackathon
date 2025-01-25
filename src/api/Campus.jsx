import { AppRoutes } from "../constant/constant";
import axios from "axios";

export const fetchCampuses = async (setData) => {
  try {
    const response = await axios.get(AppRoutes.getAllCampuses);
    setData(response.data?.data);
  } catch (error) {
    console.error("Error fetching Campuses:", error);
  }
};

export const addCampus = async (campusDetails, setData) => {
  try {
    const response = await axios.post(AppRoutes?.addCampus, campusDetails);
    if (response.status === 201) {
      const data = response.data.data;
      setData((prevCampuses) => [...prevCampuses, data]);
      console.log("Campus added successfully");
    }
  } catch (error) {
    if (error.response && error.response.status === 409) {
      console.error("Campus already exists:", error.response.data.message);
    } else {
      console.log("Error adding campus:", error);
    }
  }
};

export const updateCampus = async (campusDetails, _id) => {
  console.log("campusDetails==>", campusDetails); // Data should be correct here.
  try {
    const updatedCampusData = {
      title: campusDetails.title,  // Send the title.
      address: campusDetails.address,  // Include address if needed.
      contact: campusDetails.contact,  // Include contact info if needed.
      email: campusDetails.email,  // Include email if needed.
      city: campusDetails.city,  // Use city._id for MongoDB ObjectId.

      $push: {
        updates: {
          updatedAt: new Date(),
          updatedBy: campusDetails.updatedBy || "System",  // Ensure updatedBy is never null
          reason: campusDetails.reason || null,  // Optional field for reason
        },
      },
    };

    const response = await axios.put(AppRoutes?.updateCampus.replace(":id", _id), updatedCampusData);

    if (response.status === 200) {
      console.log("Campus updated successfully:", response.data);
      return response.data?.data;
    } else {
      throw new Error("Unexpected response status: " + response.status);
    }
  } catch (error) {
    console.error("Error updating campus:", error);
    throw error;
  }
};


export const deleteCampus = async (campus, setCampuses) => {
  try {
    const deleteUrl = `${AppRoutes.deleteCampus.replace(":id", campus._id)}`;
    const response = await axios.delete(deleteUrl);
    if (response.status === 200) {
      setCampuses((prevCampuses) => prevCampuses.filter((prevCampus) => prevCampus._id !== campus._id));
      console.log("Campus deleted successfully");
    }
  } catch (error) {
    console.error("Error deleting campus:", error);
  }
};



export const getCities = async (setData) => {
  try {
    const response = await axios.get(AppRoutes.getAllCities);
    setData(response.data?.data);
  } catch (error) {
    console.error("Error fetching Campuses:", error);
  }
};