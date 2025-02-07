import React, { useEffect, useState } from "react";
import { SiSkillshare } from "react-icons/si";
import { PiBuildingOfficeLight } from "react-icons/pi";
import TopBox from "../components/TopBox";
import { PiStudent } from "react-icons/pi";
import { PiChalkboardTeacher } from "react-icons/pi";
import axios from "axios";
import { AppRoutes } from "@/constant/constant";

function TagsBox() {
  const [cities, setCities] = useState();
  const [branches, setBranches] = useState();
  const [departments, setDepartments] = useState();
  const [employees, setEmployees] = useState();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(`${AppRoutes.getAllCities}?total`);
        setCities(response.data?.data?.totalcities);
      } catch (error) {
        console.error("Error fetching Cities:", error);
      }
    };
    const fetchBranches = async () => {
      try {
        const response = await axios.get(`${AppRoutes.getAllBranches}?total`);
        setBranches(response.data?.data?.totalbranches);
      } catch (error) {
        console.error("Error fetching Cities:", error);
      }
    };
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(`${AppRoutes.getAllDepartments}?total`);
        setDepartments(response.data?.data?.totaldepartments);
      } catch (error) {
        console.error("Error fetching Cities:", error);
      }
    };

    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${AppRoutes.getAllEmployees}?total`);
        setEmployees(response.data?.data?.totalemployees);
      } catch (error) {
        console.error("Error fetching Cities:", error);
      }
    };
    fetchCities();
    fetchBranches();
    fetchDepartments();
    fetchEmployees();
  }, []);

  return (
    <div className="top flex gap-4">
      <TopBox title={"Cities"} icon={<PiStudent />} numbers={cities} comments={"Last Month Enrolled"} />
      <TopBox title={"Branches"} icon={<PiChalkboardTeacher />} numbers={branches} comments={"Last Month Trainers"} />
      <TopBox title={"Departments"} icon={<SiSkillshare />} numbers={departments} comments={"Last Month Trainers"} />
      <TopBox
        title={"Employees"}
        icon={<PiBuildingOfficeLight />}
        numbers={employees}
        comments={"Last Month Trainers"}
      />
    </div>
  );
}

export default TagsBox;
