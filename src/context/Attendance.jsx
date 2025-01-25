import { createContext, useState, useEffect } from "react";

// Create context
export const AttendanceContext = createContext();

function AttendanceContextProvider({ children }) {
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  // Load attendance data from localStorage when the component mounts
  useEffect(() => {
    const storedAttendance = JSON.parse(localStorage.getItem("attendanceRecords"));
    if (storedAttendance) {
      setAttendanceRecords(storedAttendance);
    }
  }, []);

  // Save attendance data to localStorage whenever the attendance state changes
  useEffect(() => {
    if (attendanceRecords.length > 0) {
      localStorage.setItem("attendanceRecords", JSON.stringify(attendanceRecords));
    }
  }, [attendanceRecords]);

  return (
    <AttendanceContext.Provider value={{ attendanceRecords, setAttendanceRecords }}>
      {children}
    </AttendanceContext.Provider>
  );
}

export default AttendanceContextProvider;
