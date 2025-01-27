import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import ButtonM from "@/components/ButtonM";
import ModalHeading from "@/components/ModalHeading";
import InputWithLabel from "@/components/InputWithLabel";
import SelectWithLabel from "@/components/SelectWithLabel";
import Filter from "@/components/Filter";

import { fetchCities } from "@/api/City";
import { fetchBranches } from "@/api/Branch";
import { fetchDepartments } from "@/api/Department";
import { fetchSeekers, addSeeker, updateSeeker, deleteSeeker } from "@/api/Seeker";

Modal.setAppElement("#root");

const Seekers = () => {
  const [seekers, setSeekers] = useState([]);
  const [cities, setCities] = useState([]);
  const [branches, setBranches] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filteredBranches, setFilteredBranches] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [seekerDetails, setSeekerDetails] = useState({
    fullName: "",
    mobileNo: "",
    cnic: "",
    gender: "",
    address: "",
    city: "",
    branch: "",
    department: "",
  });

  useEffect(() => {
    try {
        fetchCities(setCities);
        fetchBranches(setBranches);
        fetchDepartments(setDepartments);
        fetchSeekers(setSeekers);
        console.log("Seekers", seekers)
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  useEffect(() => {
    if (seekerDetails.city) {
      const branchesInCity = branches.filter((branch) => branch.city._id === seekerDetails.city);
      setFilteredBranches(branchesInCity);
    } else {
      setFilteredBranches([]);
    }
  }, [seekerDetails.city, branches]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSeekerDetails({
      ...seekerDetails,
      [name]: value,
    });
  };

  const resetForm = () => {
    setSeekerDetails({
      fullName: "",
      mobileNo: "",
      cnic: "",
      gender: "",
      address: "",
      city: "",
      branch: "",
      department: "",
    });
    setEditingIndex(null);
    setIsModalOpen(false);
  };

  const handleAddSeeker = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await addSeeker(seekerDetails, setSeekers);
    fetchSeekers(setSeekers);
    resetForm();
    setIsLoading(false);
  };

  const handleEditSeeker = (seeker) => {
    setEditingIndex(seeker._id);
    setSeekerDetails(seeker);
    setIsModalOpen(true);
  };

  const handleUpdateSeeker = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await updateSeeker(seekerDetails, editingIndex);
    fetchSeekers(setSeekers);
    resetForm();
    setIsLoading(false);
  };

  const handleDeleteSeeker = async (seeker) => {
    await deleteSeeker(seeker, setSeekers);
  };

  const handleDownload = (format) => {
    console.log(`Downloading Seekers data as ${format}`);
  };

  return (
    <div>
      <div className="mx-auto w-full mb-4">
        <Filter data={seekers} onFilter={""} onDownload={handleDownload} />
      </div>

      <Modal isOpen={isModalOpen} onRequestClose={resetForm} className={"modalStyle"}>
        <ModalHeading text={editingIndex ? "Edit Seeker" : "Add Seeker"} />
        <form
          onSubmit={(e) => {
            editingIndex !== null ? handleUpdateSeeker(e) : handleAddSeeker(e);
          }}
        >
          <InputWithLabel
            label="Full Name"
            id="full-name"
            name="fullName"
            value={seekerDetails.fullName}
            onChange={handleInputChange}
            placeholder={"Enter Full Name"}
          />
          <InputWithLabel
            label="Mobile No"
            id="mobile-no"
            name="mobileNo"
            value={seekerDetails.mobileNo}
            onChange={handleInputChange}
            placeholder={"Enter Mobile No"}
          />
          <InputWithLabel
            label="CNIC"
            id="cnic"
            name="cnic"
            value={seekerDetails.cnic}
            onChange={handleInputChange}
            placeholder={"Enter CNIC"}
          />
          <SelectWithLabel
            label="Gender"
            id="gender"
            name="gender"
            value={seekerDetails.gender}
            onChange={handleInputChange}
            options={[
              { _id: "Male", title: "Male" },
              { _id: "Female", title: "Female" },
            ]}
            placeholder={"Select Gender"}
          />
          <InputWithLabel
            label="Address"
            id="address"
            name="address"
            value={seekerDetails.address}
            onChange={handleInputChange}
            placeholder={"Enter Address"}
          />
          <SelectWithLabel
            label="City"
            id="city"
            name="city"
            value={seekerDetails.city}
            onChange={handleInputChange}
            options={cities}
            placeholder={"Select City"}
            saveItem={"_id"}
            view={"city"}
          />
          <SelectWithLabel
            label="Branch"
            id="branch"
            name="branch"
            value={seekerDetails.branch}
            onChange={handleInputChange}
            options={filteredBranches}
            placeholder={"Select Branch"}
            saveItem={"_id"}
            view={"title"}
          />
          <SelectWithLabel
            label="Department"
            id="department"
            name="department"
            value={seekerDetails.department}
            onChange={handleInputChange}
            options={departments}
            placeholder={"Select Department"}
            saveItem={"_id"}
            view={"title"}
          />
          <div className="flex justify-center items-center gap-3 w-full">
            <ButtonM type="submit" text={editingIndex !== null ? "Update Seeker" : "Add Seeker"} className={"w-1/2"} />
            <ButtonM text={"Cancel"} onClick={resetForm} className={"w-1/2"} />
          </div>
        </form>
      </Modal>

      <div className="mt-8">
        <div className="flex justify-end items-center mb-4">
          <ButtonM text={"Add Seeker"} onClick={() => setIsModalOpen(true)} className={"w-[12%]"} />
        </div>
        {isLoading ? (
          <div className="loader"></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-gray-100 sticky top-0">
                <tr className="border-b">
                  <th className="p-2 border border-gray-200 w-1/12">Serial No.</th>
                  <th className="p-2 border border-gray-200 w-2/12">Full Name</th>
                  <th className="p-2 border border-gray-200 w-1/12">Mobile No</th>
                  <th className="p-2 border border-gray-200 w-2/12">CNIC</th>
                  <th className="p-2 border border-gray-200 w-1/12">Gender</th>
                  <th className="p-2 border border-gray-200 w-2/12">Branch</th>
                  <th className="p-2 border border-gray-200 w-1/12">City</th>
                  <th className="p-2 border border-gray-200 w-2/12">Actions</th>
                </tr>
              </thead>
              <tbody>
                {seekers?.map((seeker, index) => (
                  <tr key={seeker._id} className={index % 2 === 0 ? "bg-blue-100" : ""}>
                    <td className="p-2 border border-gray-200 text-center w-1/12">{index + 1}</td>
                    <td className="p-2 border border-gray-200 w-2/12">{seeker.fullName}</td>
                    <td className="p-2 border border-gray-200 text-center w-1/12">{seeker.mobileNo}</td>
                    <td className="p-2 border border-gray-200 text-center w-2/12">{seeker.cnic}</td>
                    <td className="p-2 border border-gray-200 text-center w-1/12">{seeker.gender}</td>
                    <td className="p-2 border border-gray-200 text-center w-2/12">{seeker.branch?.title}</td>
                    <td className="p-2 border border-gray-200 text-center w-1/12">{seeker.city?.city}</td>
                    <td className="p-2 border border-gray-200 w-2/12 text-center">
                      <div className="flex gap-2 justify-around">
                        <ButtonM text={"Edit"} variant={"text"} onClick={() => handleEditSeeker(seeker)} />
                        <ButtonM text={"Delete"} variant={"text"} onClick={() => handleDeleteSeeker(seeker)} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Seekers;
