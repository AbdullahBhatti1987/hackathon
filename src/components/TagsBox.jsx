import React from 'react'
import { SiSkillshare } from "react-icons/si";
import { PiBuildingOfficeLight } from "react-icons/pi";
import TopBox from "../components/TopBox";
import { PiStudent } from "react-icons/pi";
import { PiChalkboardTeacher } from "react-icons/pi";

function TagsBox() {
  return (
    <div className="top flex gap-4">
    <TopBox
      title={"Students"}
      icon={<PiStudent />}
      numbers={2125}
      comments={"Last Month Enrolled"}
    />

    <TopBox
      title={"Teachers"}
      icon={<PiChalkboardTeacher />}
      numbers={55}
      comments={"Last Month Trainers"}
    />
    <TopBox
      title={"Courses"}
      icon={<SiSkillshare />}
      numbers={25}
      comments={"Last Month Trainers"}
    />
    <TopBox
      title={"Branches"}
      icon={<PiBuildingOfficeLight />}
      numbers={12}
      comments={"Last Month Trainers"}
    />
  </div>
  )
}

export default TagsBox