import { AppRoutes } from "../constant/constant";
import axios from "axios";

export const fetchBranches = async (setData) => {
  try {
    const response = await axios.get(AppRoutes.getAllBranches);
    setData(response.data?.data.branches);
  } catch (error) {
    console.error("Error fetching Branches:", error);
  }
};

export const addBranch = async (branchDetails, setData) => {
  try {
    const response = await axios.post(AppRoutes?.addBranch, branchDetails);
    if (response.status === 201) {
      const data = response.data.data;
      setData((prevBranches) => [...prevBranches, data]);
      console.log("Branch added successfully");
    }
  } catch (error) {
    if (error.response && error.response.status === 409) {
      console.error("Branch already exists:", error.response.data.message);
    } else {
      console.log("Error adding branch:", error);
    }
  }
};

export const updateBranch = async (branchDetails, _id) => {
  console.log("branchDetails==>", branchDetails);
  try {
    const updatedBranchData = {
      title: branchDetails.title,  
      address: branchDetails.address,  
      contact: branchDetails.contact, 
      email: branchDetails.email, 
      city: branchDetails.city,  

      $push: {
        updates: {
          updatedAt: new Date(),
          updatedBy: branchDetails.updatedBy || "System", 
          reason: branchDetails.reason || null, 
        },
      },
    };

    const response = await axios.put(AppRoutes?.updateBranch.replace(":id", _id), updatedBranchData);

    if (response.status === 200) {
      console.log("Branch updated successfully:", response.data);
      return response.data?.data;
    } else {
      throw new Error("Unexpected response status: " + response.status);
    }
  } catch (error) {
    console.error("Error updating branch:", error);
    throw error;
  }
};

export const deleteBranch = async (branch, setBranches) => {
  try {
    const deleteUrl = `${AppRoutes.deleteBranch.replace(":id", branch._id)}`;
    const response = await axios.delete(deleteUrl);
    if (response.status === 200) {
      setBranches((prevBranches) => prevBranches.filter((prevBranch) => prevBranch._id !== branch._id));
      console.log("Branch deleted successfully");
    }
  } catch (error) {
    console.error("Error deleting branch:", error);
  }
};

export const getCities = async (setData) => {
  try {
    const response = await axios.get(AppRoutes.getAllCities);
    setData(response.data?.data);
  } catch (error) {
    console.error("Error fetching Cities:", error);
  }
};
