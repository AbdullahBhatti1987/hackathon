import React, { useEffect } from 'react'
import { SiSkillshare } from "react-icons/si";
import { PiBuildingOfficeLight } from "react-icons/pi";
import TopBox from "../components/TopBox";
import { PiStudent } from "react-icons/pi";
import { PiChalkboardTeacher } from "react-icons/pi";

function TagsBox() {

  useEffect(()=>{
    
  },[])



  return (
    <div className="top flex gap-4">
    <TopBox
      title={"Cities"}
      icon={<PiStudent />}
      numbers={2125}
      comments={"Last Month Enrolled"}
    />

    <TopBox
      title={"Branches"}
      icon={<PiChalkboardTeacher />}
      numbers={55}
      comments={"Last Month Trainers"}
    />
    <TopBox
      title={"Departments"}
      icon={<SiSkillshare />}
      numbers={25}
      comments={"Last Month Trainers"}
    />
    <TopBox
      title={"Employees"}
      icon={<PiBuildingOfficeLight />}
      numbers={12}
      comments={"Last Month Trainers"}
    />
  </div>
  )
}

export default TagsBox