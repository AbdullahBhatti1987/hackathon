import React from "react";

import TagsBox from "@/components/TagsBox";
import ChartBar from "../components/ChartBar";
import { ChartRound } from "@/components/ChartRound";
import { ChartRadial } from "@/components/ChartRadial";
import { ChartArea } from "@/components/ChartArea";
import { ChartLine } from "./ChartLine";
import App from "@/components/Segmented";

function Admin() {
  return (
    <div className="w-full h-full flex gap-4 flex-col overflow-auto scrollbar-custom ">
      <div className="filter w-fit ">
        <App />
      </div>
      <div className="">
        <TagsBox />
      </div>
      <div className="flex gap-4">
        <div className="w-2/3">
          <ChartBar />
        </div>
        <div className="w-1/3">
          <ChartRound />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-1/3 h-full">
          <ChartRadial />
        </div>
        <div className="w-2/3">
          <ChartArea />
        </div>
      </div>
      <div>
        <ChartLine />
      </div>
    </div>
  );
}

export default Admin;
