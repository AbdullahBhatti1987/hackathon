import React, { useContext, useEffect, useState } from "react";
import { AppRoutes } from "../constant/constant";
import axios from "axios";
import Modal from "react-modal";
import Heading1 from "@/components/Heading1";
import ModalHeading from "@/components/ModalHeading";
import ButtonM from "@/components/ButtonM";
import Filter from "@/components/Filter";
import CustomLoader from "@/components/Loader";
import InputWithLabel from "@/components/InputWithLabel";
import SelectWithLabel from "@/components/SelectWithLabel";
import { fetchCities } from "@/api/City";
import { addCampus, deleteCampus, fetchCampuses, updateCampus } from "@/api/Campus";
import { message } from "antd";

const Campus = () => {
  const [cities, setCities] = useState([]);
  const [campuses, setCampuses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
    const [messageApi, contextHolder] = message.useMessage();
  const [campusDetails, setCampusDetails] = useState({
    title: "",
    address: "",
    contact: "",
    email: "",
    city: "",
  });

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      fetchCities(setCities);
      fetchCampuses(setCampuses);
      setIsLoading(false);
    }, 1000);
  }, []);


  const resetForm = () => {
    setCampusDetails({
      title: "",
      address: "",
      contact: "",
      email: "",
      city: "",
    });
    setEditingIndex(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("==>",value)
    setCampusDetails({
      ...campusDetails,
      [name]: value,
    });
  };

  // ======================Add Campus=====================
  const handleAddCampus = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    setEditingIndex(null);
    try {
      await addCampus(campusDetails, setCampuses);
      fetchCampuses(setCampuses);
      resetForm();
      setIsModalOpen(false);
      setIsLoading(false);
    } catch (error) {
      console.error("Error adding campus: ", error);
    }
  };

  // ======================Update Campus=====================
  const handleEditCampus = (campus) => {
    setEditingIndex(campus._id);

    setCampusDetails({
      title: campus.title,
      address: campus.address,
      contact: campus.contact,
      email: campus.email,
      city: campus.city._id,
    });
    setIsModalOpen(true);
  };

  const handleUpdateCampus = async (e) => {
    e.preventDefault();
    await updateCampus(campusDetails, editingIndex);
    fetchCampuses(setCampuses);
    resetForm();
    setIsModalOpen(false);
  };

  const handleDeleteCampus = async (campus) => {
    await deleteCampus(campus, setCampuses);
  };

  const handleDownload = (format) => {
    console.log(`Downloading data as ${format}`);
  };

  return (
    <div className="">
      {/* <Heading1 text={"Campus Management"} /> */}
      {contextHolder}
      <div className="mx-auto w-full">
        <Filter data={campuses} onDownload={handleDownload} onFilter={""} />
      </div>

      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className={"modalStyle"}>
        <ModalHeading text={editingIndex !== null ? "Update Campus" : "Add Campus"} />

        <form
          onSubmit={(e) => {
            editingIndex !== null ? handleUpdateCampus(e) : handleAddCampus(e);
          }}
        >
          <InputWithLabel
            label="Campus Name"
            id="campus-title"
            name="title"
            value={campusDetails.title}
            onChange={handleInputChange}
            placeholder="Enter campus name"
          />

          <InputWithLabel
            label="Campus Location"
            id="campus-address"
            name="address"
            value={campusDetails.address}
            onChange={handleInputChange}
            placeholder="Enter campus location"
          />

          <SelectWithLabel
            label="Campus City"
            id="campus-city"
            name="city"
            value={campusDetails.city}
            onChange={handleInputChange}
            options={cities}
            placeholder="Select Campus City"
            saveItem={"_id"}
            view={"city"}
          />

          <InputWithLabel
            label="Campus Contact"
            id="campus-contact"
            name="contact"
            value={campusDetails.contact}
            onChange={handleInputChange}
            placeholder="Enter campus contact number"
          />

          <InputWithLabel
            label="Campus Email"
            id="campus-email"
            name="email"
            value={campusDetails.email}
            onChange={handleInputChange}
            placeholder="Enter campus email"
            type="email"
          />

          {/* Form Buttons */}
          <div className="flex justify-center items-center gap-3 w-full">
            <ButtonM
              type="submit"
              text={editingIndex !== null ? "Update Campus" : "Add Campus"}
              onClick={editingIndex !== null ? handleUpdateCampus : handleAddCampus}
              className={"w-1/2"}
              disabled={isLoading}
            />
            <ButtonM text={"Cancel"} onClick={() => setIsModalOpen(false)} className={"w-1/2"} />
          </div>
        </form>
      </Modal>

      <div className="mt-8 flex flex-col h-[calc(100vh-220px)]">
        <div className="flex justify-end items-center mb-4">
          {/* <h2 className="text-2xl font-semibold">Campuses List</h2> */}
          <ButtonM
            text={"Add Campus"}
            onClick={() => {
              setEditingIndex(null);
              resetForm();
              setIsModalOpen(true);
            }}
           
            className={"w-[12%]"}
          />
        </div>
        {isLoading ? (
          
            <div className="loader"></div> 
        
        ) : campuses.length === 0 ? (
          <div className="flex justify-center items-center h-full text-gray-500">
            No campuses available in the database.
          </div>
        ) : (
          <div className="scrollbar-custom" style={{ maxHeight: `calc(100vh - 240px)` }}>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className=" py-2 border border-gray-200 truncate text-sm">Serial No.</th>
                    <th className=" py-2 border border-gray-200 truncate text-sm">Name</th>
                    <th className=" py-2 border border-gray-200 truncate text-sm">Address</th>
                    <th className=" py-2 border border-gray-200 truncate text-sm">City</th>
                    <th className=" py-2 border border-gray-200 truncate text-sm">Contact</th>
                    <th className=" py-2 border border-gray-200 truncate text-sm">Email</th>
                    <th className=" py-2 border border-gray-200 truncate text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {campuses?.map((campus, index) => (
                    <tr key={campus?._id} className={`border border-gray-200 ${index % 2 === 0 ? "bg-blue-100" : ""}`}>
                      <td className="py-2 px-4 border border-gray-200 text-center w-1/12 text-sm">{index + 1}</td>
                      <td className="py-2 px-4 border border-gray-200 w-1/12 truncate capitalize text-sm">
                        {campus.title}
                      </td>
                      <td
                        className="py-2 px-4 border border-gray-200 w-3/12 truncate capitalize text-sm"
                        title={campus.address}
                      >
                        {campus.address?.length > 50 ? `${campus.address.substring(0, 50)}...` : campus.address}
                      </td>
                      <td className="py-2 px-4 border border-gray-200 w-1/12 truncate capitalize text-sm">
                        {campus?.city?.city}
                      </td>

                      <td className="py-2 px-4 border border-gray-200 w-1/12 truncate text-sm">{campus.contact}</td>
                      <td className="py-2 px-4 border border-gray-200 w-2/12 truncate lowercase text-sm">
                        {campus.email}
                      </td>
                      <td className="py-2 px-4 border border-gray-200 w-2/12 text-sm">
                        <div className="flex justify-between gap-2">
                          <ButtonM text={"Edit"} variant="text" onClick={() => handleEditCampus(campus)} />
                          <ButtonM text={"Delete"} variant="text" onClick={() => handleDeleteCampus(campus)} />
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

export default Campus;
