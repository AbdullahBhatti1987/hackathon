import React from 'react';

const SelectDays = ({ selectedDays, setSelectedDays }) => {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const handleDayChange = (e, day) => {
    e.preventDefault();

    setSelectedDays((prevDays) => {
      if (prevDays.includes(day)) {
        return prevDays.filter((selectedDay) => selectedDay !== day);
      }
      if (prevDays.length >= 3) {
        console.log("Only a maximum of 3 days are allowed in 1 section");
        return prevDays;
      }

      return [...prevDays, day];
    });
  };

  return (
    <div className="mb-4 flex items-center justify-start w-full space-x-2">
      <label className="text-sm font-medium w-full sm:w-1/4 mb-2 sm:mb-0">Select Days</label>
      <div className="flex flex-wrap gap-2 w-full">
        {daysOfWeek.map((day, index) => (
          <button
            key={index}
            value={day}
            onClick={(e) => handleDayChange(e, day)} // Call handleDayChange on button click
            className={`flex-1 sm:flex-none h-10 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 focus:outline-none
              ${selectedDays.includes(day) ? "bg-primary text-black ring-1 ring-primary" : "bg-gray-300 text-black hover:bg-gray-400"}`}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectDays;
