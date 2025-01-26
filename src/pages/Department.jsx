import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import ButtonM from "@/components/ButtonM";
import Heading1 from "@/components/Heading1";
import ModalHeading from "@/components/ModalHeading";
import Filter from "@/components/Filter";

import InputWithLabel from "@/components/InputWithLabel";
import SelectWithLabel from "@/components/SelectWithLabel";
import { fetchCities } from "@/api/City";
import { fetchBranches } from "@/api/Branch";
import { addDepartment, deleteDepartment, fetchDepartments, updateDepartment } from "@/api/Department";

Modal.setAppElement("#root");

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [branches, setBranches] = useState([]);
  const [filteredBranches, setFilteredBranches] = useState([]);
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [departmentDetails, setDepartmentDetails] = useState({
    title: "",
    email: "",
    contact: "",
    city: "",
    branch: "",
    department: "",
  });

  useEffect(() => {
    fetchDepartments(setDepartments);
    console.log("departments=>", departments)
    fetchCities(setCities);
    fetchBranches(setBranches);
  }, []);

  useEffect(() => {
    if (departmentDetails) {
      try {
        const branchesInCity = branches.filter((branch) => branch.city._id === departmentDetails.city);
        console.log("branchesInCity=>", branchesInCity);
        setFilteredBranches(branchesInCity);
      } catch (error) {
        console.log("branchesInCity=>", branchesInCity);
      }
    } else {
      setFilteredBranches([]);
    }
  }, [departmentDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDepartmentDetails({
      ...departmentDetails,
      [name]: value,
    });
  };

  const handleAddDepartment = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    await addDepartment(departmentDetails, setDepartments);
    fetchDepartments(setDepartments);
    resetForm();
    setIsModalOpen(false);
    setIsLoading(false);
  };

  const handleEditDepartment = (departmentData) => {
    setEditingIndex(departmentData._id);
    setDepartmentDetails(departmentData);
    setIsModalOpen(true);
  };

  const handleUpdateDepartment = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      await updateDepartment(departmentDetails, editingIndex);
      fetchDepartments(setDepartments);
      resetForm();
      setIsModalOpen(false);
      setIsLoading(false);
    } catch (error) {
      console.error("Error updating department:", error);
    }
  };

  const handleDeleteDepartment = async (departmentData) => {
    await deleteDepartment(departmentData, setDepartments);
  };

  const resetForm = () => {
    setDepartmentDetails({
      departmentName: "",
      departmentHead: "",
      facultyCount: "",
      branch: "",
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
      <div className="mx-auto w-full mb-4">
        <Filter data={""} onFilter={""} onDownload={handleDownload} />
      </div>

      <Modal isOpen={isModalOpen} onRequestClose={resetForm} className={"modalStyle z-50"}>
        <ModalHeading text={editingIndex ? "Edit Department" : "Add Department"} />
        <form
          onSubmit={(e) => {
            editingIndex !== null ? handleUpdateDepartment() : handleAddDepartment();
          }}
        >
          <InputWithLabel
            label="Department Name"
            id="department-name"
            name="departmentName"
            value={departmentDetails.departmentName}
            onChange={handleInputChange}
            placeholder={"Enter Department Name"}
          />

          <InputWithLabel
            label="Department Head"
            id="department-head"
            name="departmentHead"
            value={departmentDetails.departmentHead}
            onChange={handleInputChange}
            placeholder={"Enter Department Head Name"}
          />

          <InputWithLabel
            label="Faculty Count"
            id="faculty-count"
            name="facultyCount"
            type="number"
            value={departmentDetails.facultyCount}
            onChange={handleInputChange}
            placeholder={"Enter Faculty Count"}
          />

          <SelectWithLabel
            label="Branch City"
            id="branch-city"
            name="city"
            value={departmentDetails.city}
            onChange={handleInputChange}
            options={cities}
            placeholder="Select City"
            view={"city"}
            saveItem={"_id"}
          />

          <SelectWithLabel
            label="Select Branch"
            id="department-branch"
            name="branch"
            value={departmentDetails.branch}
            onChange={handleInputChange}
            options={filteredBranches}
            placeholder={"Select Branch"}
            saveItem={"_id"}
            view={"title"}
          />

          <div className="flex justify-center items-center gap-3 w-full">
            <ButtonM
              type="submit"
              text={editingIndex !== null ? "Update Department" : "Add Department"}
              onClick={editingIndex !== null ? handleUpdateDepartment : handleAddDepartment}
              className={"w-1/2"}
            />
            <ButtonM text={"Cancel"} onClick={() => setIsModalOpen(false)} className={"w-1/2"} />
          </div>
        </form>
      </Modal>

      <div className="mt-8">
        <div className="flex justify-end items-center mb-4">
          <ButtonM text={"Add Department"} onClick={() => setIsModalOpen(true)} className={"w-[12%]"} />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-100 sticky top-0">
              <tr className="border-b">
                <th className="p-2 border border-gray-200 w-1/12">Serial No.</th>
                <th className="p-2 border border-gray-200 w-3/12">Title</th>
                <th className="p-2 border border-gray-200 w-3/12">Email</th>
                <th className="p-2 border border-gray-200 w-1/12">Contact No.</th>
                <th className="p-2 border border-gray-200 w-2/12">Branch</th>
                <th className="p-2 border border-gray-200 w-1/12">City</th>
                <th className="p-2 border border-gray-200 w-2/12">Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((department, index) => (
                <tr key={department._id} className={index % 2 === 0 ? "bg-blue-100" : ""}>
                  <td className="p-2 border border-gray-200 text-center">{index + 1}</td>
                  <td className="p-2 border border-gray-200">{department.title}</td>
                  <td className="p-2 border border-gray-200 text-start">{department.email}</td>
                  <td className="p-2 border border-gray-200 text-start">{department.facultyCount}</td>
                  <td className="p-2 border border-gray-200 text-start">{department?.branch?.title}</td>
                  <td className="p-2 border border-gray-200 text-center">{department?.city?.city}</td>
                  <td className="p-2 border border-gray-200 text-center">
                    <div className="flex gap-2">
                      <ButtonM text={"Edit"} variant={"text"} onClick={() => handleEditDepartment(department)} />
                      <ButtonM text={"Delete"} variant={"text"} onClick={() => handleDeleteDepartment(department)} />
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

export default Department;
