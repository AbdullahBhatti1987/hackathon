import React, { useEffect, useState } from "react";
import Heading1 from "@/components/Heading1";
import SelectWithLabel from "@/components/SelectWithLabel";
import { fetchCities } from "@/api/City";
import { fetchCourses } from "@/api/Course";
import InputWithLabel from "@/components/InputWithLabel";
import axios from "axios";
import { AppRoutes } from "@/constant/constant";
import ButtonM from "@/components/ButtonM";
import DatePickerValue from "../student/DatePicker";
import { message } from "antd";

const StudentRegistration = () => {
  const [error, setError] = useState(false);
  const [cities, setCities] = useState([]);
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const [studentDetails, setStudentDetails] = useState({
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
    // imageUrl: "",
  });

  const formreset = () => {
    setStudentDetails({
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
    // if (imageUrl && imageUrl.current) {
    //   imageUrl.current.value = "";
    // }
  };

  const educationLevels = [
    { id: 1, value: "Middle", label: "Middle" },
    { id: 2, value: "Matric", label: "Matric" },
    { id: 3, value: "Intermediate", label: "Intermediate" },
    { id: 4, value: "Undergraduate", label: "Undergraduate" },
    { id: 5, value: "Graduate", label: "Graduate" },
    { id: 6, value: "Masters", label: "Masters" },
    { id: 7, value: "PhD", label: "PhD" },
    { id: 8, value: "Other", label: "Other" },
  ];

  const computerProficiencyLevels = [
    { id: 0, value: "None", label: "None" },
    { id: 1, value: "Beginner", label: "Beginner" },
    { id: 2, value: "Intermediate", label: "Intermediate" },
    { id: 3, value: "Advanced", label: "Advanced" },
  ];

  const handleInputChange = (e) => {
    const isEvent = e && e.target; // Check if it's a standard event
    const name = isEvent ? e.target.name : e.name; // Support custom event structure
    const value = isEvent ? e.target.value : e.value; // Support custom event structure

    if (name) {
      setStudentDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    if (!studentDetails.fullName || !studentDetails.email || !studentDetails.mobileNo) {
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

      setStudentDetails({
        ...studentDetails,
        imageUrl: file,
      });

      return;
    } else {
      console.log("No image file received.");
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
        formreset();
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

      // Set the filtered batches based on the selected course
      setBatches(filteredBatches);

      // If no batches are available for the selected course, show an console.log
      if (filteredBatches.length === 0) {
        console.log("No batches available for the selected course.");
      }
    } catch (error) {
      console.error("Error fetching batches:", error);
    }
  };

  useEffect(() => {
    fetchCities(setCities);
    fetchCourses(setCourses);
  }, []);

  return (
    <div className="h-full w-10/12 mx-auto flex items-center justify-start gap-8 bg-blue-300">
      <div
        className={`overflow-y-auto h-[calc(100vh-2rem)] ${!error ? "w-full" : "w-8/12"}  scrollbar-custom rounded-lg shadow-xl`}
      >
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6 ">
          <Heading1
            text={"Registration form - SMIT"}
            className={"text-3xl font-semibold text-center  bg-blue-100 p-2 py-6 rounded-md"}
          />

          {contextHolder}
          {isLoading && <div className="loader"></div>}
          <form className="" onSubmit={handleSubmitUserData}>
            <div className="flex space-x-6">
              <SelectWithLabel
                label="Select City"
                id="city"
                name="city"
                value={studentDetails.city}
                onChange={handleInputChange}
                options={cities}
                placeholder="Select City"
                className="w-1/2 px-4 py-2 rounded-md border border-gray-300 shadow-md focus:ring-2 focus:ring-indigo-500 bg-blue-100"
                saveItem={"_id"}
                view="city"
              />
              <SelectWithLabel
                label="Select Course"
                id="course"
                name="course"
                value={studentDetails.course}
                onChange={(e) => {
                  handleInputChange(e), handleCourseChange(e);
                }}
                options={courses}
                placeholder="Select Course"
                className="w-1/2 px-4 py-2 rounded-md border border-gray-300 shadow-md focus:ring-2 focus:ring-indigo-500 bg-blue-100"
                saveItem={"_id"}
              />
            </div>

            <div className="flex space-x-6">
              <SelectWithLabel
                label="Select Batch"
                id="batch"
                name="batchNo"
                value={studentDetails.batchNo}
                onChange={handleInputChange}
                options={batches}
                placeholder="Select Batch"
                className="w-1/2 px-4 py-2 rounded-md border border-gray-300 shadow-md focus:ring-2 focus:ring-indigo-500 bg-blue-100"
                view={"batchNo"}
                saveItem={"_id"}
              />

              <SelectWithLabel
                label="Computer Proficiency"
                id="computer-proficiency"
                name="proficiency"
                value={studentDetails.proficiency}
                onChange={handleInputChange}
                options={computerProficiencyLevels}
                placeholder="Select Proficiency Level"
                className="w-1/2 px-4 py-2 rounded-md border border-gray-300 shadow-md focus:ring-2 focus:ring-indigo-500 bg-blue-100"
                view={"label"}
                saveItem={"value"}
              />
            </div>

            {/* Student and Father Name */}
            <div className="flex space-x-6">
              <InputWithLabel
                label="Full Name"
                id="student-name"
                name="fullName"
                value={studentDetails.fullName}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className="w-1/2 px-4 py-2 rounded-md border border-gray-300 shadow-md focus:ring-2 focus:ring-indigo-500 bg-blue-100"
                saveItem={"value"}
              />
              <InputWithLabel
                label="Father Name"
                id="father-name"
                name="fatherName"
                value={studentDetails.fatherName}
                onChange={handleInputChange}
                placeholder="Enter your father's name"
                className="w-1/2 px-4 py-2 rounded-md border border-gray-300 shadow-md focus:ring-2 focus:ring-indigo-500 bg-blue-100"
                saveItem={"value"}
              />
            </div>

            {/* Email and Phone Number */}
            <div className="flex space-x-6">
              <InputWithLabel
                label="Email"
                id="email"
                name="email"
                value={studentDetails.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                type="email"
                className="w-1/2 px-4 py-2 rounded-md border border-gray-300 shadow-md focus:ring-2 focus:ring-indigo-500 bg-blue-100"
                saveItem={"value"}
              />
              <InputWithLabel
                label="Mobile Number"
                id="mobile-number"
                name="mobileNo"
                value={studentDetails.mobileNo}
                onChange={handleInputChange}
                placeholder="Enter your mobile number"
                type="tel"
                pattern="[0-9]*"
                className="w-1/2 px-4 py-2 rounded-md border border-gray-300 shadow-md focus:ring-2 focus:ring-indigo-500 bg-blue-100"
                saveItem={"value"}
              />
            </div>

            <div className="flex space-x-6 ">
              <InputWithLabel
                label="CNIC"
                id="cnic"
                name="cnic"
                value={studentDetails.cnic}
                onChange={handleInputChange}
                placeholder="Enter your Cnic or Father's Cnic"
                pattern="[0-9]*"
                className="w-1/2 px-4 py-2 rounded-md border border-gray-300 shadow-md focus:ring-2 focus:ring-indigo-500 bg-blue-100"
                saveItem={"value"}
              />

              <SelectWithLabel
                label="Select Gender"
                id="gender"
                name="gender"
                value={studentDetails.gender}
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
                value={studentDetails.dob}
                onChange={(date) => handleInputChange({ name: "dob", value: date })}
                className="w-1/2 px-4 py-2 rounded-md border border-gray-300 shadow-md focus:ring-2 focus:ring-indigo-500 bg-blue-100"
              />

              <InputWithLabel
                label="Address"
                id="address"
                name="address"
                value={studentDetails.address}
                onChange={handleInputChange}
                placeholder="Enter your address"
                className="w-1/2 px-4 py-2 rounded-md border border-gray-300 shadow-md focus:ring-2 focus:ring-indigo-500 bg-blue-100"
                saveItem={"value"}
              />
            </div>

            <div className="flex space-x-6">
              <SelectWithLabel
                label="Education"
                id="education"
                name="education"
                value={studentDetails.education}
                onChange={handleInputChange}
                options={educationLevels}
                placeholder="Select Last Qualification"
                className="w-1/2 px-4 py-2 rounded-md border border-gray-300 shadow-md focus:ring-2 focus:ring-indigo-500 bg-blue-100"
                view={"label"}
                saveItem={"value"}
              />

              <SelectWithLabel
                label="Have laptop?"
                id="have-Laptop"
                name="haveLaptop"
                value={studentDetails.haveLaptop}
                onChange={handleInputChange}
                placeholder="Do you have a laptop?"
                className="w-1/2 px-4 py-2 rounded-md border border-gray-300 shadow-md focus:ring-2 focus:ring-indigo-500 bg-blue-100"
                options={[
                  { id: 0, value: "Yes", label: "Yes" },
                  { id: 1, value: "No", label: "No" },
                ]}
                view={"label"}
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
            {studentDetails.photo && (
              <div className="mt-4">
                <span className="text-xs text-gray-500">Preview:</span>
                <img
                  src={studentDetails.imageUrl}
                  alt="Uploaded preview"
                  className="w-32 h-32 border border-gray-300 rounded-md object-cover"
                />
              </div>
            )}

            <div className="mt-6">
              <ul className="flex flex-col gap-0 text-sm text-gray-700 space-y-3 list-decimal list-inside">
                <li>
                  I hereby, solemnly declare that the data and facts mentioned herein are true and correct to the best
                  of my knowledge.
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
                  onClick={formreset}
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
        </div>
      </div>
    </div>
  );
};

export default StudentRegistration;

// {error && (
//   <div className="overflow-y-auto h-[calc(100vh-6rem)] flex-1 bg-white w-4/12  scrollbar-custom rounded-lg shadow-xl">
//     <div className="bg-white rounded-lg shadow-lg h-full p-6 sm:p-8 lg:p-10 space-y-6 ">
//       <Heading1
//         text={"Verify Details"}
//         className={"text-3xl w-full font-semibold text-center bg-blue-100 p-2 rounded-md"}
//       />
//       <ul className="flex flex-col gap-2">
//         <li className="flex gap-4 ">
//           <span className="font-bold text-sm w-1/3">Select City:</span>
//           <span className={"w-2/3 text-sm"}>

//             {cities.find((city) => city._id === studentDetails.city)?.name || "Not Selected"}
//           </span>
//         </li>
//         <li className="flex gap-4 ">
//           <span className="font-bold text-sm w-1/3">Course:</span>
//           <span className={"w-2/3 text-sm"}>

//             {courses.find((course) => course._id === studentDetails.course)?.title || "Not Selected"}
//           </span>
//         </li>
//         <li className="flex gap-4 ">
//           <span className="font-bold text-sm w-1/3">Batch No:</span>
//           <span className={"w-2/3 text-sm"}>

//             {batches.find((batch) => batch._id === studentDetails.batchNo)?.batchNo || "Not Selected"}
//           </span>
//         </li>
//         <li className="flex gap-4 ">
//           <span className="font-bold text-sm w-1/3">Proficiency:</span>
//           <span className={"w-2/3 text-sm"}>{studentDetails.proficiency}</span>
//         </li>
//         <li className="flex gap-4 ">
//           <span className="font-bold text-sm w-1/3">Full Name:</span>
//           <span className={"w-2/3 text-sm"}>{studentDetails.fullName}</span>
//         </li>
//         <li className="flex gap-4 ">
//           <span className="font-bold text-sm w-1/3 truncate">Father's Name:</span>
//           <span className={"w-2/3 text-sm"}>{studentDetails.fatherName}</span>
//         </li>
//         <li className="flex gap-4 ">
//           <span className="font-bold text-sm w-1/3">Email:</span>
//           <span className={"w-2/3 text-sm"}>{studentDetails.email}</span>
//         </li>
//         <li className="flex gap-4 ">
//           <span className="font-bold text-sm w-1/3">Mobile No:</span>
//           <span className={"w-2/3 text-sm"}>{studentDetails.mobileNo}</span>
//         </li>
//         <li className="flex gap-4 ">
//           <span className="font-bold text-sm w-1/3">CNIC:</span>
//           <span className={"w-2/3 text-sm"}>{studentDetails.cnic}</span>
//         </li>
//         <li className="flex gap-4 ">
//           <span className="font-bold text-sm w-1/3">Gender:</span>
//           <span className={"w-2/3 text-sm"}>{studentDetails.gender}</span>
//         </li>
//         <li className="flex gap-4 ">
//           <span className="font-bold text-sm w-1/3">Date of Birth:</span>
//           <span className={"w-2/3 text-sm"}>{studentDetails.dob}</span>
//         </li>
//         <li className="flex gap-4 ">
//           <span className="font-bold text-sm w-1/3">Address:</span>
//           <span className={"w-2/3 text-sm"}>{studentDetails.address}</span>
//         </li>
//         <li className="flex gap-4 ">
//           <span className="font-bold text-sm w-1/3">Education:</span>
//           <span className={"w-2/3 text-sm"}>{studentDetails.education}</span>
//         </li>
//         <li className="flex gap-4 ">
//           <span className="font-bold text-sm w-1/3">Have Laptop:</span>
//           <span className={"w-2/3 text-sm"}>{studentDetails.haveLaptop}</span>
//         </li>
//         <li className="flex gap-4 ">
//           <span className="font-bold text-sm w-1/3">Picture:</span>
//           {image ? (
//             <img
//               src={image}
//               alt="Uploaded"
//               className="w-36 h-36 object-cover border-4 border-gray-400 bg-blue-100 shadow-md rounded-xl"
//             />
//           ) : (
//             "+ Upload"
//           )}
//         </li>
//       </ul>
//     </div>
//   </div>
// )}
