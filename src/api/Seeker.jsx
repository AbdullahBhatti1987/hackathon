import { AppRoutes } from "../constant/constant";
import axios from "axios";

// Fetch Seekers
export const fetchSeekers = async (setData) => {
  try {
    const response = await axios.get(AppRoutes.getAllSeekers);
    setData(response.data?.data);
  } catch (error) {
    console.error("Error fetching Seekers:", error);
  }
};

// Add Seeker
export const addSeeker = async (seekerDetails, setData) => {
  try {
    const response = await axios.post(AppRoutes?.addSeeker, seekerDetails);
    if (response.status === 201) {
      const data = response.data.data;
      setData((prevSeekers) => [...prevSeekers, data]);
      console.log("Seeker added successfully");
    }
  } catch (error) {
    if (error.response && error.response.status === 409) {
      console.error("Seeker already exists:", error.response.data.message);
    } else {
      console.log("Error adding seeker:", error);
    }
  }
};

// Update Seeker
export const updateSeeker = async (seekerDetails, _id) => {
  try {
    const updatedSeekerData = {
      fullName: seekerDetails.fullName,
      mobileNo: seekerDetails.mobileNo,
      cnic: seekerDetails.cnic,
      gender: seekerDetails.gender,
      address: seekerDetails.address,
      city: seekerDetails.city,
      branch: seekerDetails.branch,
      department: seekerDetails.department,

      $push: {
        updates: {
          updatedAt: new Date(),
          updatedBy: seekerDetails.updatedBy || "System",
          reason: seekerDetails.reason || null,
        },
      },
    };

    const response = await axios.put(AppRoutes?.updateSeeker.replace(":id", _id), updatedSeekerData);

    if (response.status === 200) {
      console.log("Seeker updated successfully:", response.data);
      return response.data?.data;
    } else {
      throw new Error("Unexpected response status: " + response.status);
    }
  } catch (error) {
    console.error("Error updating seeker:", error);
    throw error;
  }
};

// Delete Seeker
export const deleteSeeker = async (seeker, setSeekers) => {
  try {
    const deleteUrl = `${AppRoutes.deleteSeeker.replace(":id", seeker._id)}`;
    const response = await axios.delete(deleteUrl);
    if (response.status === 200) {
      setSeekers((prevSeekers) => prevSeekers.filter((prevSeeker) => prevSeeker._id !== seeker._id));
      console.log("Seeker deleted successfully");
    }
  } catch (error) {
    console.error("Error deleting seeker:", error);
  }
};

// Fetch Cities for Seekers (if needed)
export const getCities = async (setData) => {
  try {
    const response = await axios.get(AppRoutes.getAllCities);
    setData(response.data?.data);
  } catch (error) {
    console.error("Error fetching Cities:", error);
  }
};
