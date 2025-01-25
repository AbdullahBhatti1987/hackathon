import { createContext, useState } from "react";

export const TotalCountContext = createContext();

function TotalCountContextProvider({ children }) {
  const [totalCount, setTotalCount] = useState({
    campuseCount: "",
    courseCount: "",
    classCount: "",
    sessionCount: "",
    batchCount: "",
    teacherCount: "",
    studentCount: "",
    userCount: "",
  });


  return (
    <TotalCountContext.Provider
      value={{ setTotalCount, totalCount }}
    >
      {children}
    </TotalCountContext.Provider>
  );
}

export default TotalCountContextProvider;
