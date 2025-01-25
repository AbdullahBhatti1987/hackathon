import React, { useState } from "react";
import StudentRegistration from "@/pages/user/StudentRegistration";
import AdmitCard from "@/pages/user/AdmitCard";
import UserQuiz from "@/pages/user/UserQuiz";
import UserResult from "@/pages/user/UserResult";
import CourseList from "./CourseList";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      className="w-full"
    >
      {value === index && (
        <div className="bg-blue-200 w-full h-screen px-24 py-4">
          
          <div>{children} 
          


          </div>
        </div>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <div className="flex">
      <div className="lg:w-2/12 h-screen py-6 bg-gray-50 shadow-md">
        <ul className="flex flex-col border-r border-gray-300 relative">
          <li
            className={`cursor-pointer p-4 relative hover:border-r hover:border-gray-400 ${value === 0 ? "bg-gray-300 font-semibold border-r-2 border-blue-500" : ""}`}
            onClick={() => handleChange(0)}
            {...a11yProps(0)}
          >
            Courses
            {value === 0 && (
              <div className="absolute right-0 top-0 h-full border-r-2 border-blue-500 transition-all duration-300 ease-in-out"></div>
            )}
          </li>
          <li
            className={`cursor-pointer p-4 relative hover:border-r hover:border-gray-400 ${value === 1 ? "bg-gray-300 font-semibold border-r-2 border-blue-500" : ""}`}
            onClick={() => handleChange(1)}
            {...a11yProps(1)}
          >
            Registration Form
            {value === 1 && (
              <div className="absolute right-0 top-0 h-full border-r-2 border-blue-500 transition-all duration-300 ease-in-out"></div>
            )}
          </li>
          <li
            className={`cursor-pointer p-4 relative hover:border-r hover:border-gray-400 ${value === 2 ? "bg-gray-300 font-semibold border-r-2 border-blue-500" : ""}`}
            onClick={() => handleChange(2)}
            {...a11yProps(2)}
          >
            Admit Card
            {value === 2 && (
              <div className="absolute right-0 top-0 h-full border-r-2 border-blue-500 transition-all duration-300 ease-in-out"></div>
            )}
          </li>
          <li
            className={`cursor-pointer p-4 relative hover:border-r hover:border-gray-400 ${value === 3 ? "bg-gray-300 font-semibold border-r-2 border-blue-500" : ""}`}
            onClick={() => handleChange(3)}
            {...a11yProps(3)}
          >
            Quiz
            {value === 3 && (
              <div className="absolute right-0 top-0 h-full border-r-2 border-blue-500 transition-all duration-300 ease-in-out"></div>
            )}
          </li>
          <li
            className={`cursor-pointer p-4 relative hover:border-r hover:border-gray-400 ${value === 4 ? "bg-gray-300 font-semibold border-r-2 border-blue-500" : ""}`}
            onClick={() => handleChange(4)}
            {...a11yProps(4)}
          >
            Result
            {value === 3 && (
              <div className="absolute right-0 top-0 h-full border-r-2 border-blue-500 transition-all duration-300 ease-in-out"></div>
            )}
          </li>
          <li
            className={`cursor-pointer p-4 relative hover:border-r hover:border-gray-400 ${value === 5 ? "bg-gray-300 font-semibold border-r-2 border-blue-500" : ""}`}
            onClick={() => handleChange(5)}
            {...a11yProps(5)}
          >
            Login
            {value === 3 && (
              <div className="absolute right-0 top-0 h-full border-r-2 border-blue-500 transition-all duration-300 ease-in-out"></div>
            )}
          </li>
            </ul>
      </div>
      <TabPanel value={value} index={0}>
        <div className="h-full w-10/12 mx-auto flex items-center justify-start gap-8">
          <div
            className={"overflow-x-auto h-[calc(100vh-2rem)] w-full  scrollbar-custom rounded-lg shadow-xl px-4"}
          >
            <CourseList />
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <StudentRegistration />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AdmitCard />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <UserQuiz />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <UserResult />
      </TabPanel>
      <TabPanel value={value} index={5}>
        
      </TabPanel>
    </div>
  );
}
