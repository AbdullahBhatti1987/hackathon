import { AppRoutes } from "../constant/constant";
import axios from "axios";


export const fetchCities = async (setData) => {
  try {
    const response = await axios.get(AppRoutes.getAllCities);
    console.log("cities Response=>", response?.data?.data?.cities)
    setData(response.data?.data?.cities);
  } catch (error) {
    console.error("Error fetching Cities:", error);
  }
};

export const addCity = async (cityDetails, setCities, cities) => {
  try {
    const cityExistsInList = cities.some((city) => city.city.toLowerCase() === cityDetails.city.toLowerCase());
    if (cityExistsInList) {
      console.log("City already exists in the list.");
      return;
    }
    const addResponse = await axios.post(AppRoutes.addCity, cityDetails);
    if (addResponse.status === 201) {
      const newCity = addResponse.data.data;
      setCities((prevCities) => [...prevCities, newCity]); // Update the local cities list
      console.log("City added successfully");
    }
  } catch (error) {
    console.error("Error adding city:", error.response ? error.response.data : error.message);
  }
};

export const updateCity = async (cityDetails, _id, updatedBy) => {
  try {
    const updateData = {
      city: cityDetails.city,
      country: cityDetails.country,
      $push: {
        updates: {
          updatedAt: new Date(),
          updatedBy: updatedBy || null,
        },
      },
    };
    const response = await axios.put(AppRoutes?.updateCity.replace(":id", _id), updateData);
    console.log("Response from server:", response);

    if (response.status === 200) {
      return response.data?.data; 
    } else {
      throw new Error("Unexpected response status: " + response.status);
    }
  } catch (error) {
    console.error("Error in updateCity API call:", error.response ? error.response.data : error.message);
    throw error; 
  }
};

export const deleteCity = async (city, setCities) => {
  try {
    const deleteUrl = `${AppRoutes.deleteCity.replace(":id", city._id)}`;
    const response = await axios.delete(deleteUrl);
    if (response.status === 200) {
      setCities((prevCities) => prevCities.filter((prevCity) => prevCity._id !== city._id));
      console.log("City deleted successfully");
    }
  } catch (error) {
    console.error("Error deleting city:", error.response ? error.response.data : error.message);
  }
};
