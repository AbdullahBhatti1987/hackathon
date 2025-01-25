import React, { useContext, useEffect, useState } from "react";
import { AppRoutes } from "../constant/constant";
import axios from "axios";
import Modal from "react-modal";
// import Heading1 from "@/components/Heading1";
import ModalHeading from "@/components/ModalHeading";
import ButtonM from "@/components/ButtonM";
import Filter from "@/components/Filter";
// import { TotalCountContext } from "@/context/TotalCount";
import CustomLoader from "@/components/Loader";
import { fetchCourses, addCourse, deleteCourse, updateCourse } from "@/api/Course";

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [courseDetails, setCourseDetails] = useState({
    courseCode: "",
    title: "",
    description: "",
    duration: "",
    fees: "",
    eligibility: "",
    isActive: true,
  });

  useEffect(() => {
    const loadCourses = async () => {
      setIsLoading(true);
      await fetchCourses(setCourses);
      setIsLoading(false);
    };
    loadCourses();
  }, []);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseDetails({
      ...courseDetails,
      [name]: value,
    });
  };

  const resetForm = () => {
    setCourseDetails({
      courseCode: "",
      title: "",
      description: "",
      duration: "",
      fees: "",
      eligibility: "",
      isActive: true,
    });
  };

  // ======================Add Course=====================

  const handleAddCourse = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    await addCourse(courseDetails, setCourses);
    fetchCourses(setCourses);
    resetForm();
    setEditingIndex(null);
    setIsModalOpen(false);
    setIsLoading(false);
  };

  // ====================Update Course===========================

  const handleEditCourse = (course) => {
    setCourseDetails(course);
    setEditingIndex(course._id);
    setIsModalOpen(true);
  };

  const handleUpdateCourse = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    await updateCourse(courseDetails, editingIndex);
    resetForm();
    setIsModalOpen(false);
    fetchCourses(setCourses);
    setIsLoading(false);
  };

  const handleDeleteCourse = async (course) => {
    setIsLoading(true);
    await deleteCourse(course);
    fetchCourses(setCourses);
    setIsLoading(false);
  };

  return (
    <div className="">
      {/* <Heading1 text={"Course Management"} /> */}
      {/* <div className="mx-auto w-full">
        <Filter data={courses} onDownload={handleDownload} onFilter={""} />
      </div> */}

      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className={"modalStyle"}>
        <ModalHeading text={editingIndex !== null ? "Update Course" : "Add Course"} />
        <form
          onSubmit={(e) => {
            editingIndex !== null ? handleUpdateCourse() : handleAddCourse();
          }}
        >
          {/* Form Inputs */}
          <div className="mb-4 flex gap-4 justify-between items-center">
            <label htmlFor="course-code" className="block text-sm font-medium w-1/4">
              Course Code
            </label>
            <input
              type="text"
              id="course-code"
              name="courseCode"
              value={courseDetails.courseCode}
              onChange={handleInputChange}
              placeholder="Enter course code"
              className="inputClass w-3/4"
            />
          </div>

          <div className="mb-4 flex gap-4 justify-between items-center">
            <label htmlFor="course-title" className="block text-sm font-medium w-1/4">
              Course Title
            </label>
            <input
              type="text"
              id="course-title"
              name="title"
              value={courseDetails.title}
              onChange={handleInputChange}
              placeholder="Enter course title"
              className="inputClass w-3/4"
            />
          </div>

          <div className="mb-4 flex gap-4 justify-between items-center">
            <label htmlFor="course-description" className="block text-sm font-medium w-1/4">
              Course Description
            </label>
            <textarea
              id="course-description"
              name="description"
              value={courseDetails.description}
              onChange={handleInputChange}
              placeholder="Enter course description"
              className="inputClass w-3/4"
            />
          </div>

          <div className="mb-4 flex gap-4 justify-between items-center">
            <label htmlFor="course-duration" className="block text-sm font-medium w-1/4">
              Course Duration
            </label>
            <input
              type="text"
              id="course-duration"
              name="duration"
              value={courseDetails.duration}
              onChange={handleInputChange}
              placeholder="Enter course duration"
              className="inputClass w-3/4"
            />
          </div>

          <div className="mb-4 flex gap-4 justify-between items-center">
            <label htmlFor="course-fees" className="block text-sm font-medium w-1/4">
              Course Fees
            </label>
            <input
              type="number"
              id="course-fees"
              name="fees"
              value={courseDetails.fees}
              onChange={handleInputChange}
              placeholder="Enter course fees"
              className="inputClass w-3/4"
            />
          </div>

          <div className="mb-4 flex gap-4 justify-between items-center">
            <label htmlFor="course-eligibility" className="block text-sm font-medium w-1/4">
              Course Eligibility
            </label>
            <input
              type="text"
              id="course-eligibility"
              name="eligibility"
              value={courseDetails.eligibility}
              onChange={handleInputChange}
              placeholder="Enter course eligibility"
              className="inputClass w-3/4"
            />
          </div>

          <div className="flex justify-center items-center gap-3 w-full">
            <ButtonM
              type="submit"
              text={editingIndex !== null ? "Update Course" : "Add Course"}
              onClick={editingIndex !== null ? handleUpdateCourse : handleAddCourse}
              className={"w-1/2"}
            />
            <ButtonM text={"Cancel"} onClick={() => setIsModalOpen(false)} className={"w-1/2"} />
          </div>
        </form>
      </Modal>

      <div className="mt-8 flex flex-col h-[calc(100vh-220px)]">
        <div className="flex justify-end items-center mb-4">
          {/* <h2 className="text-2xl font-semibold">Courses List</h2> */}
          <ButtonM text={"Add Course"} onClick={() => setIsModalOpen(true)} className={"w-[12%]"} />
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="loader"></div> {/* Replace with your actual loader */}
          </div>
        ) : courses.length === 0 ? (
          <div className="flex justify-center items-center h-full text-gray-500">
            No courses available in the database.
          </div>
        ) : (
          <div className="scrollbar-custom" style={{ maxHeight: `calc(100vh - 240px)` }}>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 border border-gray-200 text-sm">Serial No.</th>
                    <th className="py-2 border border-gray-200 text-sm">Course Code</th>
                    <th className="py-2 border border-gray-200 text-sm">Title</th>
                    <th className="py-2 border border-gray-200 text-sm">Duration</th>
                    <th className="py-2 border border-gray-200 text-sm">Course Descriotions</th>
                    <th className="py-2 border border-gray-200 text-sm">Fees</th>
                    <th className="py-2 border border-gray-200 text-sm">Eligibility</th>
                    <th className="py-2 border border-gray-200 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course, index) => (
                    <tr key={course._id} className={`border border-gray-200 ${index % 2 === 0 ? "bg-blue-100" : ""}`}>
                      <td className="py-2 px-4 border border-gray-200 text-center text-sm">{index + 1}</td>
                      <td className="py-2 px-4 border border-gray-200 text-sm">{course.courseCode}</td>
                      <td className="py-2 px-4 border border-gray-200 text-sm">{course.title}</td>
                      <td className="py-2 px-4 border border-gray-200 text-sm">{course.duration}</td>
                      <td className="py-2 px-4 border border-gray-200 text-sm">
                        {course.description.length > 40 ? `${course.description.slice(0, 40)}...` : course.description}
                      </td>
                      <td className="py-2 px-4 border border-gray-200 text-sm">{course.fees}</td>
                      <td className="py-2 px-4 border border-gray-200 text-sm">{course.eligibility}</td>
                      <td className="py-2 px-4 border border-gray-200 text-sm">
                        <div className="flex justify-between gap-2">
                          <ButtonM text={"Edit"} variant="text" onClick={() => handleEditCourse(course)} />
                          <ButtonM text={"Delete"} variant="text" onClick={() => handleDeleteCourse(course)} />
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

export default Course;
