import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import ButtonM from "@/components/ButtonM";
import Heading1 from "@/components/Heading1";
import ModalHeading from "@/components/ModalHeading";
import Filter from "@/components/Filter";

import InputWithLabel from "@/components/InputWithLabel";
import SelectWithLabel from "@/components/SelectWithLabel";
import { fetchCities } from "@/api/City";
import { fetchCampuses } from "@/api/Campus";
import { addClass, deleteClass, fetchClasses, updateClass } from "@/api/Class";

Modal.setAppElement("#root");

const Class = () => {
  const [classes, setClasses] = useState([]);
  const [campuses, setCampuses] = useState([]);
  const [filteredCampuses, setFilteredCampuses] = useState([]);
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [classDetails, setClassDetails] = useState({
    classTitle: "",
    classType: "Auditorium",
    capacity: "",
    city: "",
    campus: "",
  });

  useEffect(() => {
    fetchClasses(setClasses);
    fetchCities(setCities);
    fetchCampuses(setCampuses);
   
  }, []);

  useEffect(() => {
    if (classDetails) {
     try {
      const campusesInCity = campuses.filter((campus) => campus.city._id === classDetails.city);
      console.log("campusesInCity=>", campusesInCity)
      setFilteredCampuses(campusesInCity);
    } catch (error) {
       console.log("campusesInCity=>", campusesInCity)
      
     }
    } else {
      setFilteredCampuses([]);
    }
  }, [classDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClassDetails({
      ...classDetails,
      [name]: value,
    });
  };

  const handleAddClass = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    await addClass(classDetails, setClasses);
    fetchClasses(setClasses);
    resetForm();
    setIsModalOpen(false);
    setIsLoading(false)
  };

  const handleEditClass = (classData) => {
    setEditingIndex(classData._id);
    setClassDetails(classData);
    setIsModalOpen(true);
  };

  const handleUpdateClass = async (e) => {
    setIsLoading(true)
    
    e.preventDefault();
    try {
      await updateClass(classDetails, editingIndex);
      fetchClasses(setClasses);
      resetForm();
      setIsModalOpen(false);
    setIsLoading(false)

    } catch (error) {
      console.error("Error updating class:", error);
    }
  };

  const handleDeleteClass = async (classData) => {
    await deleteClass(classData, setClasses);
  };

  const resetForm = () => {
    setClassDetails({
      classTitle: "",
      classType: "",
      capacity: "",
      campus: "",
      city: "",
    });
    setEditingIndex(null);
    setIsModalOpen(false);
  };

  const handleDownload = (format) => {
    console.log(`Downloading data as ${format}`);
  };

  return (
    <div className="">
      {/* <Heading1 text={"Class Management"} /> */}
      <div className="mx-auto w-full mb-4">
        <Filter data={""} onFilter={""} onDownload={handleDownload} />
      </div>

      <Modal isOpen={isModalOpen} onRequestClose={resetForm} className={"modalStyle z-50"}>
        <ModalHeading text={editingIndex ? "Edit Class" : "Add Class"} />
        <form
          onSubmit={(e) => {
            editingIndex !== null ? handleUpdateClass() : handleAddClass();
          }}
        >
          <InputWithLabel
            label="Class Name"
            id="class-name"
            name="classTitle"
            value={classDetails.classTitle}
            onChange={handleInputChange}
            placeholder={"Enter Class Name"}
          />

          <SelectWithLabel
            label="Class Type"
            id="class-type"
            name="classType"
            value={classDetails.classType}
            onChange={handleInputChange}
            options={[
              { id: 1, value: "Auditorium", name: "Auditorium" },
              { id: 2, value: "Computer_Lab", name: "Computer_Lab" },
            ]}
            placeholder={"Select Class Type"}
          />

          <InputWithLabel
            label="Capacity"
            id="class-capacity"
            name="capacity"
            type="number"
            value={classDetails.capacity}
            onChange={handleInputChange}
            placeholder={"Enter Capacity"}
          />

          <SelectWithLabel
            label="Campus City"
            id="campus-city"
            name="city"
            value={classDetails.city}
            onChange={handleInputChange}
            options={cities}
            placeholder="Select City"
            view={"city"}
            saveItem={"_id"}
          />

          <SelectWithLabel
            label="Select Campus"
            id="class-campus"
            name="campus"
            value={classDetails.campus}
            onChange={handleInputChange}
            options={filteredCampuses}
            placeholder={"Select Campus"}
            saveItem={"_id"}
            view={"title"}
          />

          <div className="flex justify-center items-center gap-3 w-full">
            <ButtonM
              type="submit"
              text={editingIndex !== null ? "Update Class" : "Add Class"}
              onClick={editingIndex !== null ? handleUpdateClass : handleAddClass}
              className={"w-1/2"}
            />
            <ButtonM text={"Cancel"} onClick={() => setIsModalOpen(false)} className={"w-1/2"} />
          </div>
        </form>
      </Modal>

      <div className="mt-8">
        <div className="flex justify-end items-center mb-4">
          {/* <h2 className="text-2xl font-semibold">Class List</h2> */}
          <ButtonM text={"Add Class"} onClick={() => setIsModalOpen(true)} className={"w-[12%]"} />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-100 sticky top-0">
              <tr className="border-b">
                <th className="p-2 border border-gray-200 w-1/12">Serial No.</th>
                <th className="p-2 border border-gray-200 w-3/12">Class Title</th>
                <th className="p-2 border border-gray-200 w-2/12">Class Type</th>
                <th className="p-2 border border-gray-200 w-1/12">Capacity</th>
                <th className="p-2 border border-gray-200 w-2/12">Campus</th>
                <th className="p-2 border border-gray-200 w-1/12">City</th>
                <th className="p-2 border border-gray-200 w-2/12">Actions</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((classItem, index) => (
                <tr key={classItem._id} className={index % 2 === 0 ? "bg-blue-100" : ""}>
                  <td className="p-2 border border-gray-200 text-center">{index + 1}</td>
                  <td className="p-2 border border-gray-200">{classItem.classTitle}</td>
                  <td className="p-2 border border-gray-200 text-center">{classItem.classType}</td>
                  <td className="p-2 border border-gray-200 text-center">{classItem.capacity}</td>
                  <td className="p-2 border border-gray-200 text-center">{classItem?.campus?.title}</td>
                  <td className="p-2 border border-gray-200 text-center">{classItem?.city?.city}</td>
                  <td className="p-2 border border-gray-200 text-center">
                    <div className="flex gap-2">
                      <ButtonM text={"Edit"} variant={"text"} onClick={() => handleEditClass(classItem)} />
                      <ButtonM text={"Delete"} variant={"text"} onClick={() => handleDeleteClass(classItem)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Class;
