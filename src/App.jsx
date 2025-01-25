import React, { lazy } from "react";
// import { Suspense } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { DashboardLayout } from "@toolpad/core/DashboardLayout";
// const Dashboard = lazy(() => import('./components/Dashboard'));

import Admin from "./pages/Admin";
import Dashboard from "./components/Dashboard";
// import Signup from "./pages/Signup";
import Signin from "./components/SignIn";
import Quiz from "./pages/Quiz";
import Teacher from "./pages/Teacher";
import Student from "./pages/Student";
import Result from "./pages/Result";
import Batch from "./pages/Batch";
import Course from "./pages/Course";
import Staff from "./pages/Staff";
import Section from "./pages/Section";
import Registration from "./pages/Registration";
import Class from "./pages/Class";
import Campus from "./pages/Campus";
import Reports from "./pages/Reports";
import Fee from "./pages/Fee";
import User from "./pages/User";
import Attendance from "./pages/Attendance";
import Setting from "./pages/Setting";
import Curriculam from "./pages/Curriculam";
import Assignment from "./pages/Assignment";
import Material from "./pages/Material";
import Certificate from "./pages/Certificate";
import TeacherDashboard from "./components/TeacherDashboard";
import StudentDashboard from "./components/StudentDashboard";
import StudentAssignments from "./pages/student/StudentAssignments";
import StudentResult from "./pages/student/StudentResult";
import StudentCertificates from "./pages/student/StudentCertificates";
import StudentCourse from "./pages/student/StudentCourse";
import StudentFee from "./pages/student/StudentFee";
import TeacherCurriculam from "./pages/trainer/TeacherCurriculam";
import TeacherClass from "./pages/trainer/TeacherClass";
import TeacherSession from "./pages/trainer/TeacherSession";
import TeacherAssignment from "./pages/trainer/TeacherAssignment";
import TeacherStudent from "./pages/trainer/TeacherStudent";
import TeacherResult from "./pages/trainer/TeacherResult";
import City from "./pages/City";
// import RegistrationForm from "./pages/student/RegistrationForm";
import StudentAttendance from "./pages/student/StudentAttendance";
import StudentRegistration from "./pages/user/StudentRegistration";

// const DashboardLayoutBasic = React.lazy(() => import("./components/DashboardLayoutBasic"));
// import UserDashboard from "./components/UserDashboard";
// import UserDashboardNew from "./components/UserDashboardNew";
import UserQuiz from "./pages/user/UserQuiz";
import AdmitCard from "./pages/user/AdmitCard";
import UserResult from "./pages/user/UserResult";
import SignIn from "./components/SignIn";
import VerticalTabs from "./components/UserDashboardNew";
import TrainerProfile from "./components/TrainerProfile";
import StudentProfile from "./components/StudentProfile";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />}></Route>
        {/* Admin Routes */}
        <Route path="/admin" element={<Dashboard />}>
          {/* <Suspense fallback={<div className="loader"></div>}> */}
          <Route index element={<Admin />} />
          <Route path="city" element={<City />} />
          <Route path="campus" element={<Campus />} />
          <Route path="class" element={<Class />} />
          <Route path="course" element={<Course />} />
          <Route path="trainer" element={<Teacher />} />
          <Route path="student" element={<Student />} />
          <Route path="section" element={<Section />} />
          <Route path="batch" element={<Batch />} />
          <Route path="trainer" element={<Teacher />} />
          <Route path="student" element={<Student />} />
          <Route path="registration" element={<Registration />} />
          <Route path="notification" element={<Notification />} />
          <Route path="reports" element={<Reports />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="result" element={<Result />} />
          <Route path="fee" element={<Fee />} />
          <Route path="user" element={<User />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="curriculam" element={<Curriculam />} />
          <Route path="assignments" element={<Assignment />} />
          <Route path="user" element={<Staff />} />
          <Route path="settings" element={<Setting />} />
          <Route path="city" element={<City />} />
          {/* </Suspense> */}
        </Route>
        */
        {/* Trainer Routes */}
        <Route path="trainer" element={<TeacherDashboard />}>
          <Route index element={<TrainerProfile />} />
          <Route path="curriculam" element={<TeacherCurriculam />} />
          <Route path="class" element={<TeacherClass />} />
          <Route path="session" element={<TeacherSession />} />
          <Route path="assignment" element={<Assignment />} />
          <Route path="student" element={<TeacherStudent />} />
          <Route path="result" element={<TeacherResult />} />
        </Route>
        {/* Student Routes  */}
        <Route path="student" element={<StudentDashboard />}>
        <Route index element={<StudentProfile />} />
          <Route path="course" element={<StudentCourse />} />
          <Route path="assignment" element={<StudentAssignments />} />
          <Route path="result" element={<StudentResult />} />
          <Route path="studentcertificate" element={<StudentCertificates />} />
          <Route path="studentfee" element={<StudentFee />} />
          <Route path="studentRegistration" element={<StudentRegistration />} />
          <Route path="studentattendance" element={<StudentAttendance />} />
        </Route>
        <Route path="user" element={<VerticalTabs />}>
          <Route index element={<StudentRegistration />} />
          <Route path="smit-registration" element={<StudentRegistration />} />
          <Route path="userquiz" element={<UserQuiz />} />
          <Route path="admitcard" element={<AdmitCard />} />
          <Route path="userresult" element={<UserResult />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
