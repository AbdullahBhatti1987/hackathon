import React, { useEffect, useState } from "react";
import Modal from "react-modal";

import Button from "@/components/Button";
import Heading1 from "@/components/Heading1";
import ModalHeading from "@/components/ModalHeading";
import Filter from "@/components/Filter";
import { message } from "antd";
import SelectWithLabel from "@/components/SelectWithLabel";
import InputWithLabel from "@/components/InputWithLabel";
import DatePickerValue from "./student/DatePicker";
import { fetchCities } from "@/api/City";
import { fetchBranches } from "@/api/Branch";
import { fetchEmployees } from "@/api/Employees";
import ButtonM from "@/components/ButtonM";
import { fetchDepartments } from "@/api/Department";

const Employee = () => {
  const [error, setError] = useState(false);
  const [editingIndex , setEditingIndex ] = useState("");
  const [employees, setEmployees] = useState([]);
  const [cities, setCities] = useState([]);
  const [branches, setBranches] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [isModalOpen , setIsModalOpen ] = useState(false);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const [employeeDetails, setemployeeDetails] = useState({
    city: "",
    brach: "",
    department: "",
    fullName: "",
    fatherName: "",
    email: "",
    mobileNo: "",
    cnic: "",
    gender: "",
    dob: "",
    address: "",
    // imageUrl: "",
  });

  const resetForm = () => {
    setemployeeDetails({
      city: "",
      course: "",
      batchNo: "",
      proficiency: "",
      fullName: "",
      fatherName: "",
      email: "",
      mobileNo: "",
      cnic: "",
      gender: "",
      dob: "",
      address: "",
      education: "",
      haveLaptop: "",
      imageUrl: "",
    });
    setImage(null);
    if (imageUrl && imageUrl.current) {
      imageUrl.current.value = "";
    }
  };


  const handleInputChange = (e) => {
    const isEvent = e && e.target; // Check if it's a standard event
    const name = isEvent ? e.target.name : e.name; // Support custom event structure
    const value = isEvent ? e.target.value : e.value; // Support custom event structure

    if (name) {
      setemployeeDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    if (!employeeDetails.fullName || !employeeDetails.email || !employeeDetails.mobileNo) {
      console.log("Please fill out all required fields.");
      return false;
    }
    return true;
  };
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }

    if (file) {
      const fileType = file.type;
      if (!fileType.startsWith("image/")) {
        return console.log("Only image files are allowed!");
      }

      if (file.size > 1024 * 1024) {
        // 1MB in bytes
        return console.log("File size exceeds 1MB!");
      }

      setemployeeDetails({
        ...employeeDetails,
        imageUrl: file,
      });

      return;
    } else {
      console.log("No image file received.");
    }
  };

  const handleAddEmployee = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (!validateForm()) return;
    const formData = {
      ...employeeDetails,
    };

    try {
      const response = await axios.post(AppRoutes.addUser, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {
        // console.log("User added successfully:", response.data);

        console.log("User registered successfully!");

        messageApi.success("User registered successfully!");
        resetForm();
        setIsLoading(false);

        messageApi.success("Download your Admit Card!");

        return;
      } else {
        console.log("Error submitting registration");
        setIsLoading(false);
      }
    } catch (formError) {
      messageApi.error(formError.response?.data?.message);
      console.error("Error during user registration:", formError.response?.data || formError.message);
      setIsLoading(false);
    }
  };

  const handleCourseChange = (e) => {
    const selectedCourseId = e.target.value;
    fetchBatches(selectedCourseId);
  };

  const fetchBatches = async (courseId) => {
    try {
      const response = await axios.get(AppRoutes.getAllBatches); // Get all batches
      const filteredBatches = response.data?.data.filter((batch) => batch.course._id === courseId);

      setBatches(filteredBatches);

      if (filteredBatches.length === 0) {
        console.log("No batches available for the selected course.");
      }
    } catch (error) {
      console.error("Error fetching batches:", error);
    }
  };

  const handleSubmitUserData = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (!validateForm()) return;
    const formData = {
      ...studentDetails,
    };

    try {
      const response = await axios.post(AppRoutes.addUser, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {
        // console.log("User added successfully:", response.data);

        console.log("User registered successfully!");

        messageApi.success("User registered successfully!");
        resetForm();
        setIsLoading(false);

        messageApi.success("Download your Admit Card!");

        return;
      } else {
        console.log("Error submitting registration");
        setIsLoading(false);
      }
    } catch (formError) {
      messageApi.error(formError.response?.data?.message);
      console.error("Error during user registration:", formError.response?.data || formError.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees(setEmployees);
    fetchCities(setCities);
    fetchBranches(setBranches);
    fetchDepartments(setDepartments);
  }, []);

  const handleDownload = () => {

  }



  return (
    <div>
      <div className="mx-auto w-full mb-4">
        <Filter data={employees} onFilter={""} onDownload={handleDownload} />
      </div>

      <Modal isOpen={isModalOpen} onRequestClose={resetForm} className={"modalStyle"}>
        <ModalHeading text={editingIndex ? "Edit employee" : "Add employee"} />
        {contextHolder}
        {isLoading && <div className="loader"></div>}
        <form className="" onSubmit={handleAddEmployee}>
          <div className="flex space-x-6">
            <SelectWithLabel
              label="Select City"
              id="city"
              name="city"
              value={employeeDetails.city}
              onChange={handleInputChange}
              options={cities}
              placeholder="Select City"
              className="w-1/2 px-4 py-2 rounded-md border border-gray-300 shadow-md focus:ring-2 focus:ring-indigo-500 bg-blue-100"
              saveItem={"_id"}
              view="city"
            />
            <SelectWithLabel
              label="Select Branch"
              id="branch"
              name="branch"
              value={employeeDetails.branch}
              onChange={(e) => {
                handleInputChange(e), handleCourseChange(e);
              }}
              options={branches}
              placeholder="Select Branch"
              className="w-1/2 px-4 py-2 rounded-md border border-gray-300 shadow-md focus:ring-2 focus:ring-indigo-500 bg-blue-100"
              saveItem={"_id"}
            />
          </div>

          <div className="flex space-x-6">
            <SelectWithLabel
              label="Select Department"
              id="department"
              name="department"
              value={employeeDetails.department}
              onChange={handleInputChange}
              options={departments}
              placeholder="Select Department"
              className="w-1/2 px-4 py-2 rounded-md border border-gray-300 shadow-md focus:ring-2 focus:ring-indigo-500 bg-blue-100"
              view={"department"}
              saveItem={"_id"}
            />
            <InputWithLabel
              label="Full Name"
              id="student-name"
              name="fullName"
              value={employeeDetails.fullName}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="w-1/2 px-4 py-2 rounded-md border border-gray-300 shadow-md focus:ring-2 focus:ring-indigo-500 bg-blue-100"
              saveItem={"value"}
            />
          </div>

          {/* Student and Father Name */}
          <div className="flex space-x-6">
            <InputWithLabel
              label="Father Name"
              id="father-name"
              name="fatherName"
              value={employeeDetails.fatherName}
              onChange={handleInputChange}
              placeholder="Enter your father's name"
              className="w-1/2 px-4 py-2 rounded-md border border-gray-300 shadow-md focus:ring-2 focus:ring-indigo-500 bg-blue-100"
              saveItem={"value"}
            />
            <InputWithLabel
              label="Email"
              id="email"
              name="email"
              value={employeeDetails.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              type="email"
              className="w-1/2 px-4 py-2 rounded-md border border-gray-300 shadow-md focus:ring-2 focus:ring-indigo-500 bg-blue-100"
              saveItem={"value"}
            />
          </div>

          {/* Email and Phone Number */}
          <div className="flex space-x-6">
            <InputWithLabel
              label="Mobile Number"
              id="mobile-number"
              name="mobileNo"
              value={employeeDetails.mobileNo}
              onChange={handleInputChange}
              placeholder="Enter your mobile number"
              type="tel"
              pattern="[0-9]*"
              className="w-1/2 px-4 py-2 rounded-md border border-gray-300 shadow-md focus:ring-2 focus:ring-indigo-500 bg-blue-100"
              saveItem={"value"}
            />
            <InputWithLabel
              label="CNIC"
              id="cnic"
              name="cnic"
              value={employeeDetails.cnic}
              onChange={handleInputChange}
              placeholder="Enter your Cnic or Father's Cnic"
              pattern="[0-9]*"
              className="w-1/2 px-4 py-2 rounded-md border border-gray-300 shadow-md focus:ring-2 focus:ring-indigo-500 bg-blue-100"
              saveItem={"value"}
            />
          </div>

          <div className="flex space-x-6 ">
            <SelectWithLabel
              label="Select Gender"
              id="gender"
              name="gender"
              value={employeeDetails.gender}
              onChange={handleInputChange}
              placeholder="Select Gender"
              className="w-1/2 px-4 py-2 rounded-md border border-gray-300 shadow-md focus:ring-2 focus:ring-indigo-500 bg-blue-100"
              options={[
                { id: 0, value: "Male", label: "Male" },
                { id: 1, value: "Female", label: "Female" },
              ]}
              view={"label"}
              saveItem={"value"}
            />
          </div>

          <div className="flex space-x-6">
            <DatePickerValue
              label="Date of Birth"
              id="dob"
              name="dob"
              value={employeeDetails.dob}
              onChange={(date) => handleInputChange({ name: "dob", value: date })}
              className="w-1/2 px-4 py-2 rounded-md border border-gray-300 shadow-md focus:ring-2 focus:ring-indigo-500 bg-blue-100"
            />

            <InputWithLabel
              label="Address"
              id="address"
              name="address"
              value={employeeDetails.address}
              onChange={handleInputChange}
              placeholder="Enter your address"
              className="w-1/2 px-4 py-2 rounded-md border border-gray-300 shadow-md focus:ring-2 focus:ring-indigo-500 bg-blue-100"
              saveItem={"value"}
            />
          </div>


          <div className="flex items-start space-x-6">
            {/* Upload Section */}
            <div className="flex flex-col items-start">
              <label htmlFor="photo-upload" className="block text-sm font-medium text-blue-600 mb-2">
                Picture
              </label>
              <label
                htmlFor="photo-upload"
                className="w-32 h-32 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-500 text-sm cursor-pointer rounded-lg"
              >
                {image ? (
                  <img src={image} alt="Uploaded" className="w-full h-full object-cover rounded-lg" />
                ) : (
                  "+ Upload"
                )}
              </label>
              <input
                type="file"
                id="photo-upload"
                name="imageUrl"
                accept=".jpg, .jpeg, .png"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>

            <div className="text-gray-700 text-sm space-y-1 flex flex-col">
              <label className="block text-sm font-medium text-white mb-2">Note:</label>
              <span>With white or blue background</span>
              <span>File size must be less than 1MB</span>
              <span>File type: jpg, jpeg, png</span>
              <span>Upload your recent passport size picture</span>
              <span>Your face should be clearly visible without any glasses</span>
            </div>
          </div>
          {employeeDetails.photo && (
            <div className="mt-4">
              <span className="text-xs text-gray-500">Preview:</span>
              <img
                src={employeeDetails.imageUrl}
                alt="Uploaded preview"
                className="w-32 h-32 border border-gray-300 rounded-md object-cover"
              />
            </div>
          )}

          <div className="mt-6">
            <ul className="flex flex-col gap-0 text-sm text-gray-700 space-y-3 list-decimal list-inside">
              <li>
                I hereby, solemnly declare that the data and facts mentioned herein are true and correct to the best of
                my knowledge.
              </li>
              <li>Further, I will abide by all the established and future regulations and policies of SWIT.</li>
              <li>
                I hereby accept the responsibilities of good conduct and guarantee that I will not be involved in any
                other activity, political or ethical, but learning during my stay in the program.
              </li>
              <li>Defiance will render my admission canceled at any point in time.</li>
              <li>Upon completion of the course, I will complete the required project by SWIT.</li>
              <li>It's mandatory for female students to wear abaya/hijab in the class.</li>
            </ul>
          </div>

          <div className="flex justify-end gap-4">
            <div className="mt-6 flex justify-end space-x-4">
              <ButtonM
                type="reset"
                text="Reset"
                onClick={resetForm}
                className=" w-36 text-white px-6 py-2 rounded-md shadow-md"
              />
              <ButtonM
                type="submit"
                text={isLoading ? "Submitting..." : "Submit"}
                onClick={handleSubmitUserData}
                className={`w-36 text-white px-6 py-2 rounded-md shadow-md ${isLoading && "bg-gray-300"}`}
                disabled={isLoading}
              />
            </div>
          </div>
        </form>
      </Modal>

      {/* List of added employee members */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">employee List</h2>
        {isLoading ? <div className="loader"></div> :
        employees?.length === 0 ? (
          <p className="text-gray-500">No employee added yet.</p>
        ) : (
          <ul className="space-y-2 h-full overflow-y-auto">
            {employees?.map((employee, index) => (
              <li
                key={index}
                className={`p-4 border border-gray-200 rounded-lg shadow-md transition-transform transform hover:shadow-xl hover:border-gray-400 ${
                  index % 2 === 0 ? "bg-gray-100" : ""
                }`}
              >
                <div className={`grid grid-cols-3 gap-4 items-center`}>
                  <div className="text-gray-900 font-semibold">{employee.name}</div>
                  <div className="text-gray-800">{employee.email}</div>
                  <div className="text-gray-600">{employee.role}</div>
                  <div className="flex gap-4 text-gray-700">
                    <p className="text-sm">
                      Access: <span className="font-medium">{employee.hasAccess ? "Granted" : "Denied"}</span>
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Employee;
