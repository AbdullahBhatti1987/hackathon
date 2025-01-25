import { createContext, useState, useEffect } from "react";

// Create context
export const StaffContext = createContext();

function StaffContextProvider({ children }) {
  const [staffMembers, setStaffMembers] = useState([]);

  // Load staff data from localStorage when the component mounts
  useEffect(() => {
    const storedStaff = JSON.parse(localStorage.getItem("staffMembers"));
    if (storedStaff) {
      setStaffMembers(storedStaff);
    }
  }, []);

  // Save staff data to localStorage whenever the staff state changes
  useEffect(() => {
    if (staffMembers.length > 0) {
      localStorage.setItem("staffMembers", JSON.stringify(staffMembers));
    }
  }, [staffMembers]);

  return (
    <StaffContext.Provider value={{ staffMembers, setStaffMembers }}>
      {children}
    </StaffContext.Provider>
  );
}

export default StaffContextProvider;
