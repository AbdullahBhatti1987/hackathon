import React, { createContext, useState } from "react";

// Create TimingContext
export const TimingContext = createContext();

const TimingContextProvider = ({ children }) => {
  const [schedules, setSchedules] = useState([]);

  const addSchedule = (schedule) => {
    setSchedules((prevSchedules) => [...prevSchedules, schedule]);
  };

  const deleteSchedule = (index) => {
    setSchedules((prevSchedules) => {
      const newSchedules = [...prevSchedules];
      newSchedules.splice(index, 1);
      return newSchedules;
    });
  };

  return (
    <TimingContext.Provider value={{ schedules, setSchedules, addSchedule, deleteSchedule }}>
      {children}
    </TimingContext.Provider>
  );
};

export default TimingContextProvider;
