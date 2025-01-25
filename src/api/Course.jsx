import { AppRoutes } from "../constant/constant";
import axios from "axios";


export const fetchCourses = async (setData) => {
    try {
      const response = await axios.get(AppRoutes.getAllCourses);
      setData(response.data?.data);      
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

 export const addCourse = async (courseDetails, setCourses) => {
    try {
      const response = await axios.post(AppRoutes?.addCourse, courseDetails);
      if (response.status === 201) {
        const data = response.data.data;
        // setCourses((prevCourses) => [...prevCourses, data]);
        // setTimeout(() => {
        //   // fetchCourses();
        // }, 1000);
        console.log("Course added successfully");
      }
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };


  export const updateCourse = async (courseDetails, _id) => {
    try {
      const { updatedBy, ...updatedCourseDetails } = courseDetails;
      const response = await axios.put(AppRoutes?.updateCourse.replace(":id", _id), updatedCourseDetails);
      if (response.status === 200) {
        console.log("Course updated successfully:", response.data);
      } else {
        console.error("Error updating course");
      }
    } catch (error) {
      console.error("Error in updateCourse API call:", error);
    }
  };

  export const deleteCourse = async (course) => {
    try {
      const deleteUrl = `${AppRoutes.deleteCourse.replace(":id", course._id)}`;
      await axios.delete(deleteUrl);

        // fetchCourses();
      console.log("Course deleted successfully");
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };