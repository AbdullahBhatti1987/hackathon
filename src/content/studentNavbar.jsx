import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { FaBook, FaCity, FaUserCircle } from "react-icons/fa";
import { BiSolidSchool } from "react-icons/bi";
import { PiChalkboardTeacher } from "react-icons/pi";
import { IoLogOutOutline, IoTimerOutline } from "react-icons/io5";
import { SiGoogleclassroom } from "react-icons/si";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { MdBatchPrediction, MdOutlineAssignment, MdOutlineCoPresent } from "react-icons/md";
import { GiMoneyStack } from "react-icons/gi";
import { BarChartIcon, LayersIcon } from "lucide-react";
import { Chip } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CallIcon from "@mui/icons-material/Call";
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';

export const student = [
  {
    kind: "header",
    title: "Navigation Bar",
  },
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardRoundedIcon />,
    pattern: "/dashboard/:query",
  },
  {
    kind: "divider",
  },
  {
    segment: "city",
    title: "Cities",
    pattern: "/city",
    icon: <FaCity />,
    action: <Chip label={7} color="default" size="small" />,
  },
  {
    segment: "campus",
    title: "Campuses",
    pattern: "campus",
    icon: <BiSolidSchool />,
    action: <Chip label={7} color="default" size="small" />,
  },
  {
    segment: "course",
    title: "Courses",
    icon: <FaBook />,
    action: <Chip label={7} color="default" size="small" />,
  },
  {
    segment: "section",
    title: "Sections",
    icon: <IoTimerOutline />,
    action: <Chip label={7} color="default" size="small" />,
  },
  {
    segment: "class",
    title: "Classes",
    icon: <SiGoogleclassroom />,
    action: <Chip label={7} color="default" size="small" />,
  },
  {
    segment: "teacher",
    title: "Teachers",
    icon: <LiaChalkboardTeacherSolid />,
    action: <Chip label={7} color="default" size="small" />,
  },
  {
    segment: "users",
    title: "Users",
    icon: <FaUserCircle />,
    pattern: "users{/:userId}*",
    action: <Chip label={10} color="default" size="small" />,
  },
  {
    segment: "batch",
    title: "Batches",
    icon: <MdBatchPrediction />,
    action: <Chip label={7} color="default" size="small" />,
  },
  {
    segment: "quiz",
    title: "Quizes",
    icon: <MdOutlineCoPresent />,
    pattern: "quiz{/:quizId}*",
    action: <Chip label={7} color="default" size="small" />,
  },
  {
    segment: "attendance",
    title: "Attendance",
    pattern: "attendance{/:attendanceId}*",
    icon: <MdOutlineCoPresent />,
    action: <Chip label={7} color="default" size="small" />,
  },
  {
    segment: "Fee",
    title: "Fee Detail",
    icon: <GiMoneyStack />,
    pattern: "fee{/:feeId}*",
    action: <Chip label={7} color="default" size="small" />,
  },
  {
    segment: "result",
    title: "Resultes",
    icon: <PiChalkboardTeacher />,
    action: <Chip label={7} color="default" size="small" />,
  },
  {
    segment: "assignment",
    title: "Assignment",
    icon: <MdOutlineAssignment />,
    action: <Chip label={7} color="default" size="small" />,
  },
  {
    kind: "header",
    title: "Analytics",
    action: <Chip label={7} color="default" size="small" />,
  },
  {
    segment: "reports",
    title: "Reports",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "sales",
        title: "Sales",
        icon: <BarChartIcon />,
        action: <Chip label={7} color="default" size="small" />,
      },
      {
        segment: "traffic",
        title: "Traffic",
        icon: <BarChartIcon />,
        action: <Chip label={7} color="default" size="small" />,
      },
    ],
    action: <Chip label={7} color="default" size="small" />,
  },
  {
    segment: "integrations",
    title: "Integrations",
    icon: <LayersIcon />,
    action: <Chip label={7} color="default" size="small" />,
  },
];
