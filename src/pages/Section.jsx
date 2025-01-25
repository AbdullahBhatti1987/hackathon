import React, { useEffect, useState } from "react";
import { AppRoutes } from "../constant/constant";
import axios from "axios";
import Modal from "react-modal";
import Heading1 from "@/components/Heading1";
import ModalHeading from "@/components/ModalHeading";
import ButtonM from "@/components/ButtonM";
import Filter from "@/components/Filter";
import CustomLoader from "@/components/Loader";
import { addSection, deleteSection, fetchSections, updateSection } from "@/api/Section.jsx";
import SelectDays from "@/components/SelectDays";
import { fetchCities } from "@/api/City.jsx";
import { fetchCourses } from "@/api/Course.jsx";
import SelectWithLabel from "@/components/SelectWithLabel";

const Section = () => {
  const [sections, setSections] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [sectionDetails, setSectionDetails] = useState({
    days: [],
    startTime: "",
    duration: "",
    city: "",
    campus: "",
    class: "",
    course: "",
    batchNo: "",
    trainer: "",
  });

  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCampus, setSelectedCampus] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [campuses, setCampuses] = useState([]);
  const [classes, setClasses] = useState([]);
  const [cities, setCities] = useState([]);
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    const getSections = async () => {
      await fetchSections(setSections);
      await fetchCities(setCities);
      await fetchCourses(setCourses);
    };
    getSections();
  }, []);

  const fetchCampuses = async (cityId) => {
    console.log("cityId=>", cityId)
    try {
      if (cities) {
        const response = await axios.get(AppRoutes.getAllCampuses);
        setCampuses(response.data?.data.filter((campus) => campus.city._id === cityId));
      }
      return;
    } catch (error) {
      console.error("Error fetching campuses:", error);
    }
  };

  const fetchClasses = async (campusId) => {
    console.log("campusId=>", campusId)
    try {
      const response = await axios.get(AppRoutes.getAllClasses);
      console.log("response=>", response)
      setClasses(response.data?.data?.filter((classItem) => classItem.campus._id === campusId));
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const fetchBatches = async (courseId) => {
    try {
      const response = await axios.get(AppRoutes.getAllBatches);

      setBatches(response.data?.data.filter((batch) => batch.course._id === courseId));
    } catch (error) {
      console.error("Error fetching batches:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setSectionDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  const handleCityChange = async (e) => {
    const cityId = e.target.value;
    setSelectedCity(cityId);
    setSectionDetails((prevDetails) => ({
      ...prevDetails,
      city: cityId,
    }));
    setSelectedCampus("");
    setSelectedClass("");
    setSelectedCourse("");
    setBatches([]);
    await fetchCampuses(cityId);
  };

  const handleCampusChange = (e) => {
    const campusId = e.target.value;
    setSelectedCampus(campusId);
    setSectionDetails((prevDetails) => ({
      ...prevDetails,
      campus: campusId, // Update campus in sectionDetails
    }));
    setSelectedClass("");
    setSelectedCourse("");
    setBatches([]);
    fetchClasses(campusId);
  };







  const handleCourseChange = async (e) => {
    const courseId = e.target.value;
    setSelectedCourse(courseId);
    setBatches([]);
    await fetchBatches(courseId);
    setSectionDetails({
      ...sectionDetails,
      course: courseId,
    });
    // try {
    //   const response = await axios.get(AppRoutes.getAllUsers);
    //   console.log("users=>>", response)
    // } catch (error) {
      
    // }
    await fetchTrainers(courseId);
  };
  const fetchTrainers = async (courseId) => {
    try {
      // const response = await axios.get(AppRoutes.getAllUsers);
      // const users = response.data?.data;
      const response = await axios.get(AppRoutes.getAllUsers, {
        params: { role: "trainer" }
      });
      const filterRole = response.data?.data;
      console.log("filterRole=>>", filterRole)
      // const filterRole = users.filter((user) => user.role.includes("trainer"));
      const findTrainers = filterRole.filter((trainer) => trainer.course === courseId);
      console.log("findTrainers=>>", findTrainers)
      setTrainers(findTrainers);
    } catch (error) {
      console.error("Error fetching trainers:", error);
    }
  };

  // ======================Add Section=====================

  const handleAddSection = async (e) => {
    resetForm();
    e.preventDefault();

    const sectionData = { ...sectionDetails, days: selectedDays };
    console.log("sectionData=>", sectionData)
    for (const key in sectionData) {
      if (!sectionData[key]) {
        console.log(`${key} is missing or empty.`);
      }
    }
    await addSection(sectionData, setSections);
    resetForm();
    setEditingIndex(null);
    fetchSections(setSections);
    setIsModalOpen(false);
  };

  const resetForm = () => {
    setSectionDetails({
      days: [],
      startTime: "",
      duration: "",
      city: "",
      campus: "",
      class: "",
      course: "",
      batchNo: "",
      trainer: "",
    });
    setSelectedDays([]);
  };

  // ====================Update Section===========================

  const handleEditSection = (section) => {
    setSectionDetails({
      ...section,
      days: section.days || [],
    });
    setEditingIndex(section._id);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (isModalOpen && editingIndex !== null) {
      setSelectedDays(sectionDetails.days);
      setSelectedCity(sectionDetails.city);
      setSelectedCampus(sectionDetails.campus);
      setSelectedClass(sectionDetails.class);
      setSelectedCourse(sectionDetails.course);
    }
  }, [isModalOpen, editingIndex, sectionDetails.days]);

  const handleUpdateSection = async (e) => {
    e.preventDefault();

    const sectionData = { ...sectionDetails, days: selectedDays };
    updateSection(sectionData, editingIndex);
    resetForm();
    setIsModalOpen(false);
    fetchSections(setSections);
  };

  const handleDeleteSection = async (section) => {
    deleteSection(section);
  };

  const handleDownload = (format) => {
    console.log(`Downloading data as ${format}`);
  };

  return (
    <div className="">
      {/* <Heading1 text={"Section Management"} /> */}
      <div className="mx-auto w-full">
        <Filter data={sections} onDownload={handleDownload} onFilter={""} />
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className={"modalStyle scrollbar-custom"}
      >
        <ModalHeading text={editingIndex !== null ? "Update Section" : "Add Section"} />
        <form onSubmit={(e) => (editingIndex !== null ? handleUpdateSection(e) : handleAddSection(e))}>
          <div className="App">
            <h1>Select Days</h1>
            <div>
              <SelectDays selectedDays={selectedDays} setSelectedDays={setSelectedDays} />
            </div>
          </div>

          {/* Start Time Input */}
          <div className="mb-4 flex gap-4 justify-between items-center">
            <label htmlFor="class-start-time" className="block text-sm font-medium w-1/4">
              Start Time
            </label>
            <input
              type="time"
              id="class-start-time"
              name="startTime"
              value={sectionDetails.startTime || ""}
              onChange={handleInputChange}
              className="inputClass"
            />
          </div>

          <SelectWithLabel
            label="Duration"
            id="class-duration"
            name="duration"
            value={sectionDetails.duration}
            onChange={handleInputChange}
            options={[
              { id: 1, value: "1_hour", name: "1 Hour" },
              { id: 2, value: "2_hours", name: "2 Hours" },
              { id: 3, value: "3_hours", name: "3 Hours" },
            ]}
            placeholder="Select Duration"
            className="w-full capitalize"
            saveItem={'value'}
            view="name"
          />

          <SelectWithLabel
            label="City"
            id="section-city"
            name="city"
            value={selectedCity}
            onChange={handleCityChange}
            options={cities}
            placeholder="Select City"
            className="w-full capitalize"
            saveItem={'_id'}
            view="city"
          />

          <SelectWithLabel
            label="Campus"
            id="section-campus"
            name="campus"
            value={selectedCampus}
            onChange={handleCampusChange}
            options={campuses}
            placeholder="Select Campus"
            className="w-full capitalize"
            saveItem={'_id'}
            view="title"
          />

          <SelectWithLabel
            label="Class"
            id="section-class"
            name="class"
            value={sectionDetails.class}
            onChange={handleInputChange}
            options={classes}
            placeholder="Select class"
            className="w-full capitalize"
            saveItem={'_id'}
            view="classTitle"
          />

          <SelectWithLabel
            label="Course"
            id="section-course"
            name="course"
            value={sectionDetails.course}
            onChange={handleCourseChange}
            options={courses}
            placeholder="Select course"
            className="w-full capitalize"
            saveItem={'_id'}
            view="title"
          />

          <SelectWithLabel
            label="batchNo"
            id="section-batch"
            name="batchNo"
            value={sectionDetails.batchNo}
            onChange={handleInputChange}
            options={batches}
            placeholder="Select batch"
            className="w-full capitalize"
            saveItem={'_id'}
            view="batchNo"
          />

          <SelectWithLabel
            label="Trainer"
            id="section-trainer"
            name="trainer"
            value={sectionDetails.trainer}
            onChange={handleInputChange}
            options={trainers}
            placeholder="Select trainer"
            className="w-full capitalize"
            saveItem={'_id'}
            view="fullName"
          /> 

          <div className="flex justify-center items-center gap-3 w-full">
            <ButtonM
              type="submit"
              text={editingIndex !== null ? "Update Section" : "Add Section"}
              onClick={editingIndex !== null ? handleUpdateSection : handleAddSection}
              className={"w-1/2"}
            />
            <ButtonM text={"Cancel"} onClick={() => setIsModalOpen(false)} className={"w-1/2"} />
          </div>
        </form>
      </Modal>

      <div className="mt-8 flex flex-col h-[calc(100vh-220px)]">
        <div className="flex justify-end items-center mb-4">
          {/* <h2 className="text-2xl font-semibold">Sections List</h2> */}
          <ButtonM text={"Add Section"} onClick={() => setIsModalOpen(true)}
             className={"w-[12%]"}
          />
        </div>
        {isLoading ? (
          
          <div className="loader"></div> 
      
      ) : sections.length === 0 ? (
        <div className="flex justify-center items-center h-full text-gray-500">
          No Sections available in the database.
        </div>
      ) : (
          <div className="scrollbar-custom" style={{ maxHeight: `calc(100vh - 240px)` }}>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 border border-gray-200 text-sm w-1/12">Serial No.</th>
                    <th className="py-2 border border-gray-200 text-sm w-1/12">Days</th>
                    <th className="py-2 border border-gray-200 text-sm w-1/12">Start Time</th>
                    <th className="py-2 border border-gray-200 text-sm w-1/12">Duration</th>
                    <th className="py-2 border border-gray-200 text-sm w-2/12">Course</th>
                    <th className="py-2 border border-gray-200 text-sm w-1/12">Batch</th>
                    <th className="py-2 border border-gray-200 text-sm w-2/12">Trainer</th>
                    <th className="py-2 border border-gray-200 text-sm w-1/12">Campus</th>
                    <th className="py-2 border border-gray-200 text-sm w-1/12">City</th>
                    <th className="py-2 border border-gray-200 text-sm w-1/12">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(
                    sections?.map((section, index) => (
                      <tr
                        key={section._id}
                        className={`border border-gray-200 ${index % 2 === 0 ? "bg-blue-100" : ""}`}
                      >
                        <td className="py-2 px-4 border border-gray-200 text-center text-sm w-1/12">{index + 1}</td>
                        <td className="py-2 px-4 border border-gray-200 text-sm w-1/12 truncate">{section?.days.join(", ")}</td>
                        <td className="py-2 px-4 border border-gray-200 text-sm w-1/12 ">
                          {new Date(`1970-01-01T${section.startTime}:00`).toLocaleString("en-US", {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          })}
                        </td>

                        <td className="py-2 px-4 border border-gray-200 text-sm w-1/12">{section?.duration}</td>
                        <td className="py-2 px-4 border border-gray-200 text-sm w-2/12">{section?.course?.title}</td>
                        <td className="py-2 px-4 border border-gray-200 text-sm w-1/12">{batches.find((batch)=>batch._id === section.batchNo)}</td>
                        <td className="py-2 px-4 border border-gray-200 text-sm w-2/12">{section?.trainer}</td>
                        <td className="py-2 px-4 border border-gray-200 text-sm w-1/12 truncate">{section?.campus?.title}</td>
                        <td className="py-2 px-4 border border-gray-200 text-sm w-1/12">{section?.city?.city}</td>
                        <td className="py-2 px-4 border border-gray-200 text-sm w-1/12">
                          <div className="flex justify-between gap-2">
                            <ButtonM text={"Edit"} variant="text" onClick={() => handleEditSection(section)} />
                            <ButtonM text={"Delete"} variant="text" onClick={() => handleDeleteSection(section)} />
                          </div>
                        </td>
                      </tr>
                    ))
                 
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Section;
