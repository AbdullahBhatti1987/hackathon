import React, { createContext, useEffect, useState } from "react";

// Class Definition
class UserRole {
  constructor(role = "guest", permissions = []) {
    this.role = role;
    this.permissions = permissions;
  }

  updateRole(newRole) {
    this.role = newRole;
  }

  updatePermissions(newPermissions) {
    this.permissions = newPermissions;
  }

  hasPermission(permission) {
    return this.permissions.includes(permission);
  }
}

// Context
export const UserRoleContext = createContext();

// Provider Component
function UserRoleContextProvider({ children }) {
  const [userRole, setUserRole] = useState(new UserRole());

  // Load user role from localStorage on mount
  useEffect(() => {
    const storedRole = JSON.parse(localStorage.getItem("userRole"));
    if (storedRole) {
      const { role, permissions } = storedRole;
      setUserRole(new UserRole(role, permissions));
    }
  }, []);

  // Save user role to localStorage whenever it changes
  useEffect(() => {
    if (userRole) {
      localStorage.setItem("userRole", JSON.stringify(userRole));
    }
  }, [userRole]);

  const updateRole = (role, permissions = []) => {
    const updatedRole = new UserRole(role, permissions);
    setUserRole(updatedRole);
  };

  return (
    <UserRoleContext.Provider value={{ userRole, updateRole }}>
      {children}
    </UserRoleContext.Provider>
  );
}

export default UserRoleContextProvider;
