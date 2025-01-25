import React, { Profiler, useContext, useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import { IoIosNotificationsOutline, IoIosSearch, IoIosGitBranch } from "react-icons/io";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { SiGoogleclassroom, SiCoursera } from "react-icons/si";
import { HiOutlineBars3 } from "react-icons/hi2";
import { IoCalendarNumberOutline, IoPeopleSharp, IoTimerOutline, IoSettingsOutline } from "react-icons/io5";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import { MdOutlineQuiz, MdOutlineMessage, MdOutlineAssignmentInd } from "react-icons/md";
import {
  PiGitBranch,
  PiStudent,
  PiChalkboardTeacher,
  PiSquaresFour,
  PiUser,
  PiCalendar,
  PiClipboard,
  PiPen,
  PiBell,
  PiClipboardText,
  PiCertificateLight,
} from "react-icons/pi";

import { IoLogOutOutline } from "react-icons/io5";
import MenuList from "./MenuList";

import SelectOption from "./SelectTheme";
import { NavLink } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import ButtonM from "./ButtonM";
import axios from "axios";
import Header from "./HeaderToogle";
// import { TotalCountContext } from "@/context/TotalCount";


const TeacherDashboard = () => {


  const [search, setSearch] = useState("");
  const [menu, setMenu] = useState(true);
  //  const { totalCount } = useContext(TotalCountContext);

  const theme = useTheme();




  const teacherArray = [
    { id: 1, name: "Dashboard", route: "/trainer", icon: <PiSquaresFour /> },
    { id: 2, name: "Curriculum", route: "/trainer/curriculam", icon: <PiUser /> },
    { id: 3, name: "Class", route: "/trainer/class", icon: <PiCalendar /> },
    { id: 4, name: "Session", route: "/trainer/Session", icon: <PiClipboard /> },
    { id: 5, name: "Assignment", route: "/trainer/assignment", icon: <PiPen /> },
    { id: 6, name: "Student", route: "/trainer/student", icon: <PiBell /> },
    // { id: 7, name: "Notification", route: "/teacher/notification", icon: <PiBell /> },
    { id: 8, name: "Result", route: "/trainer/result", icon: <PiBell /> },
    { id: 9, name: "Settings", route: "/trainer/settings", icon: <IoSettingsOutline /> },
  ];
  


  const HandleSearch = () => {
    console.log("search Item=>", search);
    setSearch("");
  };
  const HandleMenu = () => {
    setMenu(menu ? false : true);
  };

  return (
    <div className="w-full h-screen p-2 overflow-hidden">
      <div className="h-full w-full flex gap-1 flex-row rounded-md">
        <div className={`h-full ${menu ? "w-2/12" : "w-1/12"} left flex flex-col justify-start items-center`}>
          <div className="flex  gap-4 w-full px-7 py-3 border-b-2 h-14">
            {/* <button onClick={HandleMenu} className="justify-self-start text-2xl">
              <HiOutlineBars3 />
            </button> */}
            {menu && (
              <h1 className="text-lg font-semibold flex text-center rounded-lg items-center h-full w-full">Teacher</h1>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full h-full overflow-y-auto justify-start scrollbar-hide">
            <MenuList array={teacherArray} menu={menu} />
          </div>

          <div className="w-full py-2">
            <ul className="flex flex-col space-y-2">
              <li className="hover:bg-gray-300 hover:text-gray-600 rounded-md transition-colors duration-200">
                <NavLink
                  to={"/admin/settings"}
                  className="flex items-center px-4 py-2 text-sm rounded-sm"
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? theme.palette.primary.main : "inherit",
                    color: isActive ? "white" : "inherit",
                  })}
                >
                  <span className="w-1/4 flex items-center justify-center text-xl">
                    <IoSettingsOutline />
                  </span>
                  {menu && (
                    <span className="w-2/4 truncate text-md font-medium transition-colors duration-200">Settings</span>
                  )}
                </NavLink>
              </li>
              <li className="hover:bg-gray-300 hover:text-gray-600 rounded-md transition-colors duration-200">
                <NavLink
                  to={"/"}
                  className="flex items-center px-4 py-2 text-sm rounded-sm"
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? theme.palette.primary.main : "inherit",
                    color: isActive ? "white" : "inherit",
                  })}
                >
                  <span className="w-1/4 flex items-center justify-center text-xl">
                    <IoLogOutOutline />
                  </span>
                  {menu && (
                    <span className="w-2/4 truncate text-md font-medium transition-colors duration-200">Logout</span>
                  )}
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className={`h-full ${menu ? "w-10/12" : "w-11/12"} flex flex-col gap-1 bg-white text-neutral-900 `}>
          <div className="flex flex-row justify-between gap-1 w-full border-b border-neutral-300 px-4 h-14">
            {/* <div className="flex flex-row w-2/12">
              <h1 className="text-lg font-semibold flex text-start rounded-lg justify-center items-center h-full w-full">
                SMIT Portal
              </h1>
            </div>
            <div className="flex flex-row gap-1 w-7/12 rounded-lg justify-center items-center">
              <input
                type="search"
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                id="search"
                placeholder="Search"
                className="rounded-md w-2/3 p-2 border border-neutral-300 placeholder-neutral-500"
              />
              <ButtonM
                onClick={HandleSearch}
                className="rounded-md w-1/3 p-2 border border-neutral-300 bg-neutral-200 text-neutral-900 hover:bg-neutral-300"
                text={"Search"}
              />
            </div>
            <div className="flex flex-row justify-center items-center gap-2 w-2/12">
              <div className="flex justify-center items-center p-2 text-neutral-500 hover:text-neutral-700">
                <IoIosNotificationsOutline className="text-2xl" />
              </div>
              <div className="flex justify-center items-center p-2 text-neutral-500 hover:text-neutral-700">
                <MdOutlineMessage className="text-2xl" />
              </div>
              <div className="flex justify-center items-center p-2 text-neutral-500 hover:text-neutral-700">
                <SelectOption className="text-2xl" />
              </div>
            </div> */}
             <Header />
          </div>
          <div className="h-full overflow-hidden">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
