import { AppRoutes } from "../constant/constant";
import axios from "axios";


export const fetchBatches = async (setData) => {
  try {
    const response = await axios.get(AppRoutes.getAllBatches);
    setData(response.data?.data);  // Make sure this is calling the correct setData function
  } catch (error) {
    console.error("Error fetching batches:", error);
  }
}

  export const addBatch = async (batchDetails, setBatches) => {
    try {
      const response = await axios.post(AppRoutes?.addBatch, batchDetails);
      if (response.status === 201) {
        const data = response.data.data;
        setBatches((prevBatches) => [...prevBatches, data]);
        console.log("Batch added successfully");
      }
    } catch (error) {
      console.error("Error adding batch:", error);
    }
  };

  export const deleteBatch = async (batch, fetchBatches) => {
    try {
      const deleteUrl = `${AppRoutes.deleteBatch.replace(":id", batch._id)}`;
      await axios.delete(deleteUrl);
      fetchBatches();  // Refresh the batches list after deletion
      console.log("Batch deleted successfully");
    } catch (error) {
      console.error("Error deleting batch:", error);
    }
  };


  export const updateBatch = async (batchDetails, _id) => {
    try {
      const {...updatedBatchDetails } = batchDetails;
      const { course, city } = updatedBatchDetails;
      if (course) {
        updatedBatchDetails.course = course._id || course;
      }
      if (city) {
        updatedBatchDetails.city = city._id || city;
      }
      const response = await axios.put(AppRoutes?.updateBatch.replace(":id", _id), updatedBatchDetails);
      if (response.status === 200) {
        console.log("Batch updated successfully:", response.data);
      } else {
        console.error("Error updating batch");
      }
    } catch (error) {
      console.error("Error in updateBatch API call:", error);
    }
  };

