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
import { FaChalkboardTeacher } from "react-icons/fa";



const adminArray = [
  {
    id: 1,
    name: "Dashboard",
    route: "/admin",
    icon: <PiSquaresFour />,
    length: "Dashboard"?.length,
  },
  {
    id: 2,
    name: "Batch",
    route: "/admin/batch",
    icon: <PiChalkboardTeacher />,
    length: 0,
  },
  {
    id: 3,
    name: "Course",
    route: "/admin/course",
    icon: <SiGoogleclassroom />,
    length: totalCount.courseCount,
  },
  {
    id: 4,
    name: "Teacher",
    route: "/admin/teacher",
    icon: <LiaChalkboardTeacherSolid />,
    length: teachers?.length,
  },
  {
    id: 5,
    name: "Student",
    route: "/admin/student",
    icon: <PiStudent />,
    length: students?.length,
  },
  {
    id: 6,
    name: "Class",
    route: "/admin/class",
    icon: <PiChalkboardTeacher />,
    length: classes?.length,
  },
  {
    id: 7,
    name: "Section",
    route: "/admin/section",
    icon: <IoTimerOutline />,
    length: 0,
  },
  {
    id: 8,
    name: "Registration",
    route: "/admin/registration",
    icon: <IoIosSearch />,
    length: registration?.length,
  },
  {
    id: 9,
    name: "Campus",
    route: "/admin/campus",
    icon: <SiCoursera />,
    length: totalCount.campuseCount,
  },
  {
    id: 12,
    name: "Reports",
    route: "/admin/reports",
    icon: <MdOutlineMessage />,
    length: "Reports".length,
  },
  {
    id: 13,
    name: "Quiz",
    route: "/admin/quiz",
    icon: <MdOutlineQuiz />,
    length: quiz?.length,
  },
  {
    id: 14,
    name: "Results",
    route: "/admin/result",
    icon: <PiCertificateLight />,
    length: results?.length,
  },
  {
    id: 15,
    name: "Fee",
    route: "/admin/fee",
    icon: <HiOutlineCurrencyDollar />,
    length: "Fee".length,
  },

  {
    id: 17,
    name: "Attendance",
    route: "/admin/attendance",
    icon: <IoIosGitBranch />,
    length: attendance?.length,
  },
  {
    id: 18,
    name: "Curriculum",
    route: "/admin/curriculam",
    icon: <PiChalkboardTeacher />,
    length: curriculums?.length,
  },
  {
    id: 19,
    name: "Assignments",
    route: "/admin/assignments",
    icon: <MdOutlineAssignmentInd />,
    length: assignments?.length,
  },
  {
    id: 20,
    name: "Users",
    route: "/admin/user",
    icon: <IoPeopleSharp />,
    length: users?.length,
  },
  {
    id: 21,
    name: "City",
    route: "/admin/city",
    icon: <IoPeopleSharp />,
    length: 0,
  },
];

const staffArray = [
  { id: 1, name: "Dashboard", route: "/dashboard", icon: <PiSquaresFour /> },
  { id: 2, name: "Profile", route: "/profile", icon: <PiUser /> },
  {
    id: 3,
    name: "Courses",
    route: "/courses",
    icon: <FaChalkboardTeacher />,
  },
  {
    id: 4,
    name: "Assignments",
    route: "/assignments",
    icon: <PiClipboard />,
  },
  { id: 5, name: "Results", route: "/result", icon: <PiClipboardText /> },
  {
    id: 6,
    name: "Notifications",
    route: "/notifications",
    icon: <IoIosNotificationsOutline />,
  },
];

export default [adminArray, staffArray];
