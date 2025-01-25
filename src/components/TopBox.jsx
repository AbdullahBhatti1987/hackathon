import React from "react";

function TopBox({ title, icon, numbers, comments }) {
  return (
    <div className="box border-2 flex flex-row gap-4 justify-between items-center rounded-xl w-1/4 p-4 px-8 shadow-sm hover:shadow-black hover:shadow-md active:shadow-sm">
      <div className="flex flex-col gap-3 justify-between items-start">
        <h1 className="text-2xl font-semibold">{numbers}</h1>
        <h6 className="text-md">{title}</h6>
        {/* <span className="text-sm text-gray-500">{comments}</span> */}
      </div>
      <div className="bg-gray-300 text-black rounded-full p-4">
        <h6 className="text-4xl">{icon}</h6>
      </div>
    </div>
  );
}

export default TopBox;
