import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";
import Dashboard from "./components/Dashboard";
import Department from "./pages/Department";
import Branch from "./pages/Branch";
import City from "./pages/City";
import SignIn from "./components/SignIn";

function App() {
  return (
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <Routes>
        <Route path="/" element={<SignIn />}></Route>

        <Route path="/admin" element={<Dashboard />}>
          <Route index element={<Admin />} />
          <Route path="city" element={<City />} />
          <Route path="branch" element={<Branch />} />
          <Route path="department" element={<Department />} />
          {/* <Route path="seeker" element={<Seeker />} /> */}
        </Route>

        {/* <Route path="receptionst" element={<Receiptionist />}>
        </Route> */}

        {/* <Route path="staff" element={<Staff />}>
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
