import React, { useEffect, useState } from "react";
import { AppRoutes } from "../constant/constant";
import axios from "axios";
import Modal from "react-modal";
import Heading1 from "@/components/Heading1";
import ModalHeading from "@/components/ModalHeading";
import ButtonM from "@/components/ButtonM";
import Filter from "@/components/Filter";
import { message } from "antd";
import InputWithLabel from "@/components/InputWithLabel";
import { addCity, deleteCity, fetchCities, updateCity } from "@/api/City.jsx";
import "../App.css";

const City = () => {
  const [cities, setCities] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [cityDetails, setCityDetails] = useState({
    city: "",
    country: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setCityDetails({
      ...cityDetails,
      [name]: value,
    });
  };

  const resetForm = () => {
    setCityDetails({ city: "", country: "" });
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      fetchCities(setCities);
      setIsLoading(false);
    }, 1000);
  }, []);

  // ====================== Update City =====================
  const handleEditCity = (city) => {
    setIsLoading(true);
    setEditingIndex(city._id);
    setCityDetails({
      city: city.city || "",
      country: city.country || "",
    });
    setIsModalOpen(true);
    setIsLoading(false);
  };

  const handleUpdateCity = async (e) => {
    e.preventDefault();
    console.log("Updating city with details:", cityDetails);
    setIsLoading(true);
    try {
      const updatedCity = await updateCity(cityDetails, editingIndex, "admin");
      setCities((prevCities) => prevCities.map((city) => (city._id === editingIndex ? updatedCity : city)));
      // fetchCities(setCities)

      resetForm();
      setIsModalOpen(false);
      setIsLoading(false);
    } catch (error) {
      console.error("Error updating city:", error);
    }
  };

  // ====================== Add City =====================
  const handleAddCity = async (e) => {
    setEditingIndex(null);
    e.preventDefault();
    try {
      await newCity(cityDetails);
      messageApi.success("City Added successfully!");
    } catch (error) {
      messageApi.error("error");
    }
    resetForm();
    setIsModalOpen(false);
  };

  const newCity = async (e) => {
    await addCity(cityDetails, setCities, cities);
  };

  // ====================== Delete City =====================
  const handleDeleteCity = async (city) => {
    messageApi.success("City Deleted successfully!");
    await deleteCity(city, setCities);
  };

  return (
    <div className="">
      {/* <Heading1 text={"City Management"} /> */}
      {contextHolder}
      <div className="mx-auto w-full">
        <Filter data={cities} onDownload={() => console.log("Downloading data")} onFilter={""} />
      </div>

      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className={"modalStyle"}>
        <ModalHeading text={editingIndex !== null ? "Update City" : "Add City"} />

        <form
          onSubmit={(e) => {
            editingIndex !== null ? handleUpdateCity(e) : handleAddCity(e);
          }}
        >
          <InputWithLabel
            label="City Name"
            id="city-name"
            name="city"
            value={cityDetails.city}
            onChange={handleInputChange}
            placeholder="Enter city name"
          />
          <InputWithLabel
            label="City Country"
            id="city-country"
            name="country"
            value={cityDetails.country}
            onChange={handleInputChange}
            placeholder="Enter city country"
          />

          {/* Form Buttons */}
          <div className="flex justify-center items-center gap-3 w-full my-4">
            <ButtonM type="submit" text={editingIndex !== null ? "Update City" : "Add City"} className={"w-1/2"} />
            <ButtonM text={"Cancel"} onClick={() => setIsModalOpen(false)} className={"w-1/2 hover:text-white"} />
          </div>
        </form>
      </Modal>

      <div className="mt-8 flex flex-col h-[calc(100vh-220px)]">
        <div className="flex justify-end items-center mb-4">
          {/* <h2 className="text-2xl font-semibold">Cities List</h2> */}
          <ButtonM
            text={"Add City"}
            onClick={() => {
              setEditingIndex(null);
              setIsModalOpen(true);
            }}
            className={"w-[12%]"}
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="loader"></div> {/* Replace with your actual loader */}
          </div>
        ) : cities.length === 0 ? (
          <div className="flex justify-center items-center h-full text-gray-500">
            No cities available in the database.
          </div>
        ) : (
          <div className="scrollbar-custom" style={{ maxHeight: `calc(100vh - 240px)` }}>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 border border-gray-200 text-sm">Serial No.</th>
                    <th className="py-2 border border-gray-200 text-sm">Name</th>
                    <th className="py-2 border border-gray-200 text-sm">Country</th>
                    <th className="py-2 border border-gray-200 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cities.map((city, index) => (
                    <tr key={city._id} className={`border border-gray-200 ${index % 2 === 0 ? "bg-blue-100" : ""}`}>
                      <td className="py-2 px-4 border border-gray-200 text-center w-2/12 text-sm">{index + 1}</td>
                      <td className="py-2 px-4 border border-gray-200 w-4/12 text-sm capitalize">{city.city}</td>
                      <td className="py-2 px-4 border border-gray-200 w-4/12 text-sm capitalize">{city.country}</td>
                      <td className="py-2 px-4 border border-gray-200 w-2/12 text-sm">
                        <div className="flex justify-between gap-2">
                          <ButtonM text={"Edit"} variant="text" onClick={() => handleEditCity(city)} />
                          <ButtonM text={"Delete"} variant="text" onClick={() => handleDeleteCity(city)} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default City;
