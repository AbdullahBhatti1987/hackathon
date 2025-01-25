import React, { useContext, useEffect, useState } from "react";
import { AppRoutes } from "../constant/constant";
import axios from "axios";
import Modal from "react-modal";
import Heading1 from "@/components/Heading1";
import ModalHeading from "@/components/ModalHeading";
import ButtonM from "@/components/ButtonM";
import Filter from "@/components/Filter";
import { fetchCourses } from "@/api/Course.jsx";
import { fetchCities } from "@/api/City.jsx";
import InputWithLabel from "@/components/InputWithLabel";
import SelectWithLabel from "@/components/SelectWithLabel";
import TextAreaWithLabel from "@/components/TextAreaWithLabel";
import DateInputWithLabel from "@/components/DateInputWithLabel";
import { fetchBatches, addBatch, deleteBatch, updateBatch } from "../api/Batch.jsx";
import CustomLoader from "@/components/Loader";
import { fetchClasses } from "@/api/Class";
import { message } from "antd";

const Batch = () => {
  const [batches, setBatches] = useState([]);
  const [courses, setCourses] = useState([]);
  const [cities, setCities] = useState([]);
  const [classes, setClasses] = useState([]);
  const [section, setSection] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [batchDetails, setBatchDetails] = useState({
    batchNo: "",
    startDate: "",
    gender: "Male",
    city: "",
    course: "",
    description: "",
  });

  useEffect(() => {
    const loadBatches = async () => {
      setIsLoading(true);
      await fetchCourses(setCourses);
      await fetchCities(setCities);
      await fetchBatches(setBatches);
      await fetchClasses(setClasses);
      setIsLoading(false);
    };
    loadBatches();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBatchDetails((prevDetails) => ({
      ...prevDetails,
      [name]: name === "city" || name === "course" ? value : value,
    }));

    setBatchDetails({
      ...batchDetails,
      [name]: value,
    });
  };

  const resetForm = () => {
    setBatchDetails({ batchNo: "", startDate: "", gender: "Male", city: "", course: "", description: "" });
  };

  // ======================Add Batch=====================
  const handleAddBatch = async (e) => {
    resetForm();
    setEditingIndex(null);
    e.preventDefault();
    newBatch(batchDetails);
    resetForm();
    setIsModalOpen(false);
    fetchBatches(setBatches);
    messageApi.success("Batch added successfully");
  };

  const newBatch = (batchDetails) => {
    addBatch(batchDetails, setBatches);
  };

  // ======================Update Batch=====================
  const handleEditBatch = (batch) => {
    setEditingIndex(batch._id); // Ensure _id is set correctly
    setBatchDetails({
      batchNo: batch.batchNo || "",
      startDate: batch.startDate ? new Date(batch.startDate).toISOString().split("T")[0] : "",
      gender: batch.gender || "",
      city: batch.city._id || "",
      course: batch.course._id || "",
      description: batch.description || "",
    });
    setIsModalOpen(true);
  };

  const handleUpdateBatch = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const existingBatches = batches.filter((batch) => batch.city === batchDetails.city && batch._id !== editingIndex);
    if (existingBatches.some((batch) => batch.batchNo === batchDetails.batchNo)) {
      alert(`Batch number "${batchDetails.batchNo}" already exists in the selected city.`);
      return;
    }
    await updateBatch(batchDetails, editingIndex);
    fetchBatches(setBatches);
    resetForm();
    setIsModalOpen(false);
    setIsLoading(true);
    messageApi.success("Batch edited successfully");
  };

  const handleDelete = (batch) => {
    setIsLoading(true);
    deleteBatch(batch, fetchBatches);
    setIsLoading(false);
    messageApi.success("Batch delete successfully");
  };

  const handleDownload = (format) => {
    console.log(`Downloading data as ${format}`);
  };

  return (
    <div className="">
      {/* <Heading1 text={"Batch Management"} /> */}
      {contextHolder}
      <div className="mx-auto w-full">
        <Filter data={batches} onDownload={handleDownload} onFilter={""} />
      </div>

      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className={"modalStyle"}>
        <ModalHeading text={editingIndex !== null ? "Update Batch" : "Add Batch"} />

        <form
          onSubmit={(e) => {
            editingIndex !== null ? handleUpdateBatch(e) : handleAddBatch(e);
          }}
        >
          <SelectWithLabel
            label="City"
            id="batch-city"
            name="city"
            value={batchDetails.city}
            onChange={handleInputChange}
            options={cities}
            placeholder="Select City"
            saveItem={"_id"}
            view={"city"}
          />

          <SelectWithLabel
            label="Course"
            id="batch-course"
            name="course"
            value={batchDetails.course}
            onChange={handleInputChange}
            options={courses}
            placeholder={"Select Course"}
            saveItem={"_id"}
            view={"title"}
          />
          <InputWithLabel
            label="Batch Number"
            id="batch-no"
            name="batchNo"
            value={batchDetails.batchNo}
            onChange={handleInputChange}
            placeholder="Enter batch number"
          />
          <DateInputWithLabel
            label="Start Date"
            id="start-date"
            name="startDate"
            value={batchDetails.startDate}
            onChange={handleInputChange}
          />
          <SelectWithLabel
            label="Select Gender"
            id="gender"
            name="gender"
            value={batchDetails.gender}
            onChange={handleInputChange}
            placeholder="Select Gender"
            options={[
              { _id: 0, value: "Male", label: "Male" },
              { _id: 1, value: "Female", label: "Female" },
              { _id: 2, value: "Both", label: "Both" },
            ]}
            view={"label"}
          />

          <TextAreaWithLabel
            label="Description"
            id="batch-description"
            name="description"
            value={batchDetails.description}
            onChange={handleInputChange}
            placeholder="Enter batch description"
          />

          {/* Form Buttons */}
          <div className="flex justify-center items-center gap-3 w-full">
            <ButtonM
              type="submit"
              text={editingIndex !== null ? "Update Batch" : "Add Batch"}
              onClick={editingIndex !== null ? handleUpdateBatch : handleAddBatch}
              className={"w-1/2"}
            />
            <ButtonM text={"Cancel"} onClick={() => setIsModalOpen(false)} className={"w-1/2"} />
          </div>
        </form>
      </Modal>

      <div className="mt-8 flex flex-col h-[calc(100vh-220px)]">
        <div className="flex justify-end items-center mb-4">
          {/* <h2 className="text-2xl font-semibold">Batches List</h2> */}
          <ButtonM
            text={"Add Batch"}
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
        ) : batches.length === 0 ? (
          <div className="flex justify-center items-center h-full text-gray-500">
            No batches available in the database.
          </div>
        ) : (
          <div className="scrollbar-custom" style={{ maxHeight: `calc(100vh - 240px)` }}>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className=" py-2 border border-gray-200 truncate text-sm">Serial No.</th>
                    <th className=" py-2 border border-gray-200 truncate text-sm">Batch No.</th>
                    <th className=" py-2 border border-gray-200 truncate text-sm text-center">Start Date</th>
                    <th className=" py-2 border border-gray-200 truncate text-sm text-center">City</th>
                    <th className=" py-2 border border-gray-200 truncate text-sm text-center">Course</th>
                    <th className=" py-2 border border-gray-200 truncate text-sm text-center">Description</th>
                    <th className=" py-2 border border-gray-200 truncate text-sm text-center">Gender</th>
                    <th className=" py-2 border border-gray-200 truncate text-sm text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {batches?.map((batch, index) => (
                    <tr key={batch._id} className={`border border-gray-200 ${index % 2 === 0 ? "bg-blue-100" : ""}`}>
                      <td className="py-2 px-4 border border-gray-200 text-center w-1/12 text-sm">{index + 1}</td>
                      <td className="py-2 px-4 border border-gray-200 w-1/12 truncate capitalize text-sm">
                        {batch.batchNo}
                      </td>
                      <td className="py-2 px-4 border border-gray-200 w-2/12 truncate text-sm text-center">
                        {batch.startDate}
                        {/* {new Intl.DateTimeFormat(undefined, { day: "numeric", month: "long", year: "numeric" }).format(
                          new Date(batch.startDate)
                        )} */}
                      </td>
                      <td className="py-2 px-4 border border-gray-200 w-2/12 truncate text-sm  text-center">
                        {batch.city ? batch?.city.city : "N/A"}
                      </td>
                      <td className="py-2 px-4 border border-gray-200 w-2/12 truncate text-sm  text-center">
                        {batch.course ? batch.course.title : "N/A"}
                      </td>
                      <td className="py-2 px-4 border border-gray-200 w-2/12 truncate text-sm">
                        {batch.description?.length > 30 ? `${batch.description.slice(0, 30)}...` : batch.description}
                      </td>

                      <td className="py-2 px-4 border border-gray-200 w-2/12 truncate text-sm text-center">
                        {batch.gender}
                      </td>
                      <td className="py-2 px-4 border border-gray-200 w-2/12 text-sm">
                        <div className="flex justify-between gap-2">
                          <ButtonM text={"Edit"} variant="text" onClick={() => handleEditBatch(batch)} />
                          <ButtonM text={"Delete"} variant="text" onClick={() => handleDelete(batch)} />
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

export default Batch;
