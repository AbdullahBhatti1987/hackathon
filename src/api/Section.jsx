import { AppRoutes } from "../constant/constant";
import axios from "axios";

export const addSection = async (sectionDetails, setData) => {
  try {
    const response = await axios.post(AppRoutes?.addSection, sectionDetails);
    if (response.status === 201) {
      setData((prevSections) => [...prevSections, response.data.data]);
      fetchSections();
    }
  } catch (error) {
    console.error("Error adding section:", error);
  }
};

export const fetchSections = async (setData) => {
  try {
    const response = await axios.get(AppRoutes.getAllSections);
    console.log("response", response)
    setData(response.data?.data);
  } catch (error) {
    console.error("Error fetching sections:", error);
  }
};

export const updateSection = async (sectionDetails, _id) => {
  try {
    const updateData = {
      ...sectionDetails,
      updatedAt: new Date(),
      updatedBy: sectionDetails.updatedBy || null,
    };
    const response = await axios.put(AppRoutes.updateSection.replace(":id", _id), updateData);
    if (response.status === 200) {
      console.log("Section updated successfully:", response.data);
      return response.data?.data;
    } else {
      throw new Error("Unexpected response status: " + response.status);
    }
  } catch (error) {
    console.error("Error updating section:", error);
    throw error;
  }
};

export const deleteSection = async (section) => {
  try {
    const deleteUrl = `${AppRoutes.deleteSection.replace(":id", section._id)}`;
    await axios.delete(deleteUrl);

    console.log("Section deleted successfully");
  } catch (error) {
    console.error("Error deleting section:", error);
  }
};

const handleDownload = (format) => {
  console.log(`Downloading data as ${format}`);
};
