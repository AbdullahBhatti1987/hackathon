import React from "react";
import { PiClipboardText } from "react-icons/pi";
import { BiDotsVerticalRounded } from "react-icons/bi";

function AssignmentCard({title, date,  onClickBox , onClickLink , }) {
  return (
    <div
      className="flex justify-between items-center gap-4 w-full h-24 px-6 border rounded-2xl shadow-md m-2 hover:shadow-lg active:shadow-sm"
      onClick={onClickBox}
    >
      <div className="rounded-full bg-blue-500 w-12 h-12 flex justify-center items-center shadow-md">
        <PiClipboardText className="text-white text-2xl" />
      </div>
      <div className="flex flex-col justify-center items-start flex-1 truncate">
        <h3 className="font-semibold text-gray-400 text-md overflow-hidden text-ellipsis whitespace-nowrap">
            {title}
        </h3>
        <p className="text-gray-400 text-sm font-semibold">{date}</p>
      </div>
      <div className="w-12 h-12 flex justify-center items-center">
        <button className="p-0 bg-transparent hover:bg-transparent flex justify-center items-center" onClick={onClickLink}>
          <BiDotsVerticalRounded className="text-4xl text-gray-400 hover:text-gray-600" />
        </button>
      </div>
    </div>
  );
}

export default AssignmentCard;
