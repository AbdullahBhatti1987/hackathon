import * as React from "react";
import { extendTheme, styled } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import Grid from "@mui/material/Grid2";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { SiGoogleclassroom, SiQuizlet } from "react-icons/si";
import { PiChalkboardTeacher, PiGitBranchFill } from "react-icons/pi";
import { IoLogOutOutline, IoTimerOutline } from "react-icons/io5";
import { FaBook, FaCity, FaUserCircle } from "react-icons/fa";
import { BiSolidSchool } from "react-icons/bi";
import { MdBatchPrediction, MdOutlineAssignment, MdOutlineCoPresent } from "react-icons/md";
import { GiMoneyStack } from "react-icons/gi";
import { User } from "lucide-react";
import { Route, Routes } from "react-router-dom";
import City from "../pages/City";
import { Typography } from "@mui/material";
import Campus from "@/pages/Campus";
import Dashboard from "./Dashboard";
import * as path from "path";
import Batch from "@/pages/Batch";
import Course from "@/pages/Course";

const STUDENT = [
  {

  },
  {

  }
]
const TRAINER = [
  {

  },
  {

  }
]

const ADMIN = [
  {
    kind: "header",
    title: "Navigation Bar",
  },
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    kind: "divider",
  },
  {
    segment: "city",
    title: "City",
    pattern: "/city",
    icon: <FaCity />,
  },

  {
    segment: "campus",
    title: "Campus",
    pattern: "campus",
    icon: <BiSolidSchool />,
  },
  {
    segment: "/branch",
    title: "Branch",
    icon: <PiGitBranchFill />,
  },
  {
    segment: "/course",
    title: "Course",
    icon: <FaBook />,
  },
  {
    segment: "section",
    title: "Section",
    icon: <IoTimerOutline />,
  },
  {
    segment: "class",
    title: "Class",
    icon: <SiGoogleclassroom />,
  },
  {
    segment: "teacher",
    title: "Teacher",
    icon: <LiaChalkboardTeacherSolid />,
  },
  {
    segment: "user",
    title: "User",
    icon: <FaUserCircle />,
  },

  {
    segment: "batch",
    title: "Batch",
    icon: <MdBatchPrediction />,
  },
  {
    segment: "quiz",
    title: "Quiz",
    icon: <MdOutlineCoPresent />,
  },
  {
    segment: "attendance",
    title: "Attendance",
    icon: <MdOutlineCoPresent />,
  },
  {
    segment: "Fee",
    title: "Fee Detail",
    icon: <GiMoneyStack />,
  },
  {
    segment: "result",
    title: "Result",
    icon: <PiChalkboardTeacher />,
  },
  {
    segment: "assignment",
    title: "Assignment",
    icon: <MdOutlineAssignment />,
  },
  {
    kind: "header",
    title: "Analytics",
  },

  {
    segment: "reports",
    title: "Reports",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "sales",
        title: "Sales",
        icon: <DescriptionIcon />,
      },
      {
        segment: "traffic",
        title: "Traffic",
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: "integrations",
    title: "Integrations",
    icon: <LayersIcon />,
  },

  {
    segment: "logout",
    title: "Logout",
    icon: <IoLogOutOutline />,
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

const Skeleton = styled("div")(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}


export default function DashboardLayoutBasic(props) {
  const { window } = props;

  const router = useDemoRouter("/dashboard");
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVBAR}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      authentication={null} // Use null instead of empty string
      session={null} // Use null instead of empty string
    >
      <DashboardLayout>
        <PageContainer>
       
         
        </PageContainer> 
      </DashboardLayout>
    </AppProvider>
  );
}
