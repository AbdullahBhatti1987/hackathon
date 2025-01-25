import React from "react";

export default function CourseCard({ imageUrl, onClick }) {
  return (
    <div
      onClick={onClick}
      className=" rounded-lg shadow-lg relative transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer bg-white"
    >
      {/* Image Section */}
      <div className="relative w-full ">
        <img
          src={imageUrl}
          alt="Course"
          className="w-full object-cover rounded-t-lg"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-30"></div>
      </div>

      {/* Content Section */}
      <div className="p-4 bg-transparent backdrop-blur-md rounded-b-lg">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          Course Title
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Dive into the details of this comprehensive course and enhance your skills.
        </p>
      </div>

      {/* Button Section */}
      <div className="absolute bottom-4 right-4">
        {/* <button
          onClick={onClick}
          className="px-6 py-2 rounded-full bg-blue-600 text-white font-semibold text-sm shadow-md hover:bg-blue-700 transition-transform duration-300 hover:scale-110"
        >
          Apply Now
        </button> */}
      </div>
    </div>
  );
}
