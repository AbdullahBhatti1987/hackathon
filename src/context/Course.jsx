import { AppRoutes } from "@/constant/constant";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CourseContext = createContext();

function CourseContextProvider({ children }) {
  const [courses, setCourses] = useState([]);

  // Fetch all courses from the API when the component mounts
  useEffect(() => {
    axios
      .get(AppRoutes.getAllCourses)
      .then((response) => {
        setCourses(response?.data?.data || []); // Update state with courses
      })
      .catch((error) => {
        console.error("Failed to fetch courses:", error.message);
      });
  }, []);

  // Function to add a new course
  const addCourse = async (course) => {
    try {
      const response = await axios.post(AppRoutes.addCourse, course);
      setCourses((prevCourses) => [...prevCourses, response.data.course]);
      console.log("Course added successfully:", response?.data?.data);
    } catch (error) {
      console.error("Failed to add course:", error.message);
    }
  };

  // Function to update a course
  const updateCourse = async (updatedCourse, id) => {
    try {
      const response = await axios.put(
        AppRoutes.updateCourse.replace(":id", id),
        updatedCourse
      );
      console.log("response", response);
      
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course._id === updatedCourse._id ? response.data.course : course
        )
      );

    } catch (error) {
      console.error("Failed to update course:", error.message);
    }
  };

  // Function to delete a course
  const deleteCourse = async (id) => {
    try {
      await axios.delete(AppRoutes.deleteCourse.replace(":id", id));
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course._id !== id)
      );
      console.log("Course deleted successfully");
    } catch (error) {
      console.error("Failed to delete course:", error.message);
    }
  };

  return (
    <CourseContext.Provider
      value={{ courses, setCourses, addCourse, updateCourse, deleteCourse }}
    >
      {children}
    </CourseContext.Provider>
  );
}

export default CourseContextProvider;
