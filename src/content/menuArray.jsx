import { IoIosNotificationsOutline, IoIosSearch, IoIosGitBranch } from "react-icons/io";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { SiGoogleclassroom, SiCoursera } from "react-icons/si";

import { IoPeopleSharp, IoTimerOutline } from "react-icons/io5";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import { MdOutlineQuiz, MdOutlineMessage, MdOutlineAssignmentInd } from "react-icons/md";
import {
  PiStudent,
  PiChalkboardTeacher,
  PiSquaresFour,
  PiUser,
  PiClipboard,
  PiClipboardText,
  PiCertificateLight,
} from "react-icons/pi";
import { FaChalkboardTeacher, FaCity, FaUserCircle } from "react-icons/fa";

export const adminArray = [
  {
    id: 1,
    name: "Dashboard",
    route: "/admin",
    icon: <PiSquaresFour />,
  },
  {
    id: 21,
    name: "Cities",
    route: "/admin/city",
    icon: <FaCity />,
  },
  {
    id: 9,
    name: "Branches",
    route: "/admin/branch",
    icon: <SiCoursera />,
    // length: totalCount.campuseCount,
  },
  {
    id: 7,
    name: "Departments",
    route: "/admin/department",
    icon: <IoTimerOutline />,
  },

  {
    id: 4,
    name: "Employees",
    route: "/admin/employee",
    icon: <PiStudent />,
  },

  {
    id: 12,
    name: "Reports",
    route: "/admin/reports",
    icon: <MdOutlineMessage />,
  },

  {
    id: 20,
    name: "Seekers",
    route: "/admin/seeker",
    icon: <FaUserCircle />,
  },
];

export const staffArray = [
  { id: 1, name: "Dashboard", route: "/dashboard", icon: <PiSquaresFour /> },
  { id: 2, name: "Profile", route: "/profile", icon: <PiUser /> },
  {
    id: 3,
    name: "Seekers",
    route: "/",
    icon: <FaChalkboardTeacher />,
  },
  {
    id: 4,
    name: "Reports",
    route: "/",
    icon: <PiClipboard />,
  },

];
export const receptionistArray = [
  { id: 1, name: "Dashboard", route: "/dashboard", icon: <PiSquaresFour /> },
  { id: 2, name: "Profile", route: "/profile", icon: <PiUser /> },
  {
    id: 3,
    name: "Seekers",
    route: "/",
    icon: <FaChalkboardTeacher />,
  },
  {
    id: 4,
    name: "Reports",
    route: "/",
    icon: <PiClipboard />,
  },

];



