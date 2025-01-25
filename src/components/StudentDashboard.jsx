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
import { FaChalkboardTeacher } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import MenuList from "./MenuList";
import { ClassContext } from "../context/Class";
import { TeacherContext } from "../context/Teacher";
import { StudentContext } from "../context/Student";
import { TimingContext } from "../context/Session";
import { RegistrationContext } from "../context/Registration";
import { QuizContext } from "../context/Quiz";
import { ResultContext } from "../context/Result";
import { CurriculumContext } from "../context/Curriculums";
import { AssignmentContext } from "../context/Assignment";
import { AttendanceContext } from "../context/Attendance";
import { SettingsContext } from "../context/Setting";
import { UserContext } from "../context/User";
import SelectOption from "./SelectTheme";
import { NavLink } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import ButtonM from "./ButtonM";
import axios from "axios";
import { TotalCountContext } from "@/context/TotalCount";
import { PiWallet } from "react-icons/pi";
import Header from "./HeaderToogle";

const StudentDashboard = () => {
  const [search, setSearch] = useState("");
  const [menu, setMenu] = useState(true);
  const { totalCount } = useContext(TotalCountContext);

  const theme = useTheme();

  const studentArray = [
    { id: 1, name: "Dashboard", route: "/student", icon: <PiSquaresFour /> },
    { id: 2, name: "Courses", route: "/student/course", icon: <PiChalkboardTeacher /> },
    { id: 3, name: "Assignments", route: "/student/assignment", icon: <PiClipboard /> },
    { id: 4, name: "Results", route: "/student/result", icon: <PiClipboardText /> },
    // { id: 5, name: "Notifications", route: "/student/notification", icon: <IoIosNotificationsOutline /> },
    { id: 6, name: "Certificate", route: "/student/certificate", icon: <PiClipboardText /> },
    { id: 7, name: "Settings", route: "/student/settings", icon: <IoSettingsOutline /> },
    { id: 8, name: "Fee", route: "/student/fee", icon: <PiWallet /> },
    { id: 9, name: "Registration", route: "/student/studentRegistration", icon: <PiWallet /> },
    // { id: 9, name: "Attendance", route: "/student/attendance", icon: <PiCalendar /> },
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
            <button onClick={HandleMenu} className="justify-self-start text-2xl">
              <HiOutlineBars3 />
            </button>
            {menu && (
              <h1 className="text-lg font-semibold flex text-start rounded-lg items-center h-full w-full">Student</h1>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full h-full overflow-y-auto justify-start scrollbar-hide">
            <MenuList array={studentArray} menu={menu} />
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
          <div className="h-full overflow-hidden bg-green-400">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
