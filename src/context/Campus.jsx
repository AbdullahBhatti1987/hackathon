import { createContext, useEffect, useState } from "react";
import { AppRoutes } from "../constant/constant";
import axios from "axios";

export const CampusContext = createContext();

function CampusContextProvider({ children }) {
  const [campuses, setCampuses] = useState([]);

  // Update campus function
  const updateCampus = async (campusDetails, _id) => {
    try {
      const response = await axios.put(AppRoutes.updateCampus.replace(":id", _id), campusDetails);
      console.log("response=>", response);
      if (response.status === 200) {
        console.log("Campus updated successfully:", response.data);
        const updatedCampuses = campuses.map((campus) =>
          campus._id === _id ? { ...campus, ...campusDetails } : campus
        );
        setCampuses(updatedCampuses); // Update campuses list in context
      } else {
        console.error("Error updating campus");
      }
    } catch (error) {
      console.error("Error in updateCampus API call:", error);
    }
  };

  // Delete campus function
  const deleteCampus = (index) => {
    const updatedCampuses = campuses.filter((_, i) => i !== index);
    setCampuses(updatedCampuses); // Update the list after deletion
  };

  // Add campus function
  // const addCampus = async (campusDetails) => {
  //   console.log("campusDetails context=>", campusDetails);
  //   try {
  //     const response = await axios.post(AppRoutes?.addCampus, campusDetails);
  //     if (response.status === 201) {
  //       const data = response.data.data;
  //       setCampuses((prevCampuses) => [...prevCampuses, data]);
  //     }
  //   } catch (error) {
  //     console.error("Error adding campus:", error);
  //   }
  // };



  // useEffect(() => {
  //   const fetchCampuses = async () => {
  //     try {
  //       const response = await axios.get(AppRoutes.getAllCampuses);
  //       const data = response.data.data;
  //       setCampuses(data);
  //     } catch (error) {
  //       console.error("Error fetching campuses:", error);
  //       setCampuses([]);
  //     }
  //   };
  //   fetchCampuses();
  // }, []);

  return (
    <CampusContext.Provider value={{ campuses, addCampus, updateCampus, deleteCampus }}>
      {children}
    </CampusContext.Provider>
  );
}

export default CampusContextProvider;
