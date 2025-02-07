import React, {useEffect, useState } from "react";
import Modal from "react-modal";
import ModalHeading from "@/components/ModalHeading";
import ButtonM from "@/components/ButtonM";
import Filter from "@/components/Filter";
import InputWithLabel from "@/components/InputWithLabel";
import SelectWithLabel from "@/components/SelectWithLabel";
import { fetchCities } from "@/api/City";
import { addBranch, deleteBranch, fetchBranches, updateBranch } from "@/api/Branch";
import { message } from "antd";

const Branch = () => {
  const [cities, setCities] = useState([]);
  const [branches, setBranches] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [branchDetails, setBranchDetails] = useState({
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
      fetchBranches(setBranches);
      setIsLoading(false);
    }, 1000);
  }, []);

  const resetForm = () => {
    setBranchDetails({
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
    console.log("==>", value);
    setBranchDetails({
      ...branchDetails,
      [name]: value,
    });
  };

  // ======================Add Branch=====================
  const handleAddBranch = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    setEditingIndex(null);
    try {
      await addBranch(branchDetails, setBranches);
      fetchBranches(setBranches);
      resetForm();
      setIsModalOpen(false);
      setIsLoading(false);
    } catch (error) {
      console.error("Error adding branch: ", error);
    }
  };

  // ======================Update Branch=====================
  const handleEditBranch = (branch) => {
    setEditingIndex(branch._id);

    setBranchDetails({
      title: branch.title,
      address: branch.address,
      contact: branch.contact,
      email: branch.email,
      city: branch.city._id,
    });
    setIsModalOpen(true);
  };

  const handleUpdateBranch = async (e) => {
    e.preventDefault();
    await updateBranch(branchDetails, editingIndex);
    fetchBranches(setBranches);
    resetForm();
    setIsModalOpen(false);
  };

  const handleDeleteBranch = async (branch) => {
    await deleteBranch(branch, setBranches);
  };

  const handleDownload = (format) => {
    console.log(`Downloading data as ${format}`);
  };

  return (
    <div className="">
      {contextHolder}
      <div className="mx-auto w-full">
        <Filter data={branches} onDownload={handleDownload} onFilter={""} />
      </div>

      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className={"modalStyle"}>
        <ModalHeading text={editingIndex !== null ? "Update Branch" : "Add Branch"} />

        <form
          onSubmit={(e) => {
            editingIndex !== null ? handleUpdateBranch(e) : handleAddBranch(e);
          }}
        >
          <InputWithLabel
            label="Branch Name"
            id="branch-title"
            name="title"
            value={branchDetails.title}
            onChange={handleInputChange}
            placeholder="Enter branch name"
          />

          <InputWithLabel
            label="Branch Location"
            id="branch-address"
            name="address"
            value={branchDetails.address}
            onChange={handleInputChange}
            placeholder="Enter branch location"
          />

          <SelectWithLabel
            label="Branch City"
            id="branch-city"
            name="city"
            value={branchDetails.city}
            onChange={handleInputChange}
            options={cities}
            placeholder="Select Branch City"
            saveItem={"_id"}
            view={"city"}
          />

          <InputWithLabel
            label="Branch Contact"
            id="branch-contact"
            name="contact"
            value={branchDetails.contact}
            onChange={handleInputChange}
            placeholder="Enter branch contact number"
          />

          <InputWithLabel
            label="Branch Email"
            id="branch-email"
            name="email"
            value={branchDetails.email}
            onChange={handleInputChange}
            placeholder="Enter branch email"
            type="email"
          />

          {/* Form Buttons */}
          <div className="flex justify-center items-center gap-3 w-full">
            <ButtonM
              type="submit"
              text={editingIndex !== null ? "Update Branch" : "Add Branch"}
              onClick={editingIndex !== null ? handleUpdateBranch : handleAddBranch}
              className={"w-1/2"}
              disabled={isLoading}
            />
            <ButtonM text={"Cancel"} onClick={() => setIsModalOpen(false)} className={"w-1/2"} />
          </div>
        </form>
      </Modal>

      <div className="mt-8 flex flex-col h-[calc(100vh-220px)]">
        <div className="flex justify-end items-center mb-4">
          <ButtonM
            text={"Add Branch"}
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
        ) : branches.length === 0 ? (
          <div className="flex justify-center items-center h-full text-gray-500">
            No branches available in the database.
          </div>
        ) : (
          <div className="scrollbar-custom" style={{ maxHeight: `calc(100vh - 240px)` }}>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className=" py-2 border border-gray-200 truncate text-sm w-1/12">Serial No.</th>
                    <th className=" py-2 border border-gray-200 truncate text-sm w-2/12">Name</th>
                    <th className=" py-2 border border-gray-200 truncate text-sm w-3/12">Address</th>
                    <th className=" py-2 border border-gray-200 truncate text-sm w-1/12">City</th>
                    <th className=" py-2 border border-gray-200 truncate text-sm w-1/12">Contact</th>
                    <th className=" py-2 border border-gray-200 truncate text-sm w-2/12">Email</th>
                    <th className=" py-2 border border-gray-200 truncate text-sm w-2/12">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {branches?.map((branch, index) => (
                    <tr key={branch?._id} className={`border border-gray-200 ${index % 2 === 0 ? "bg-blue-100" : ""}`}>
                      <td className="py-2 px-4 border border-gray-200 text-center w-1/12 text-sm">{index + 1}</td>
                      <td className="py-2 px-4 border border-gray-200 w-2/12 truncate capitalize text-sm">
                        {branch.title}
                      </td>
                      <td
                        className="py-2 px-4 border border-gray-200 w-3/12 truncate capitalize text-sm"
                        title={branch.address}
                      >
                        {branch.address?.length > 50 ? `${branch.address.substring(0, 50)}...` : branch.address}
                      </td>
                      <td className="py-2 px-4 border border-gray-200 w-1/12 truncate capitalize text-sm">
                        {branch?.city?.city}
                      </td>

                      <td className="py-2 px-4 border border-gray-200 w-1/12 truncate text-sm">{branch.contact}</td>
                      <td className="py-2 px-4 border border-gray-200 w-2/12 truncate lowercase text-sm">
                        {branch.email}
                      </td>
                      <td className="py-2 px-4 border border-gray-200 w-2/12 text-sm">
                        <div className="flex justify-between gap-2">
                          <ButtonM text={"Edit"} variant="text" onClick={() => handleEditBranch(branch)} />
                          <ButtonM text={"Delete"} variant="text" onClick={() => handleDeleteBranch(branch)} />
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

export default Branch;
