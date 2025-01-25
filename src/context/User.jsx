// src/context/UserContext.js
import React, { createContext, useState, useContext } from 'react';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  // Function to add a new user
  const addUser = (user) => {
    setUsers((prevUsers) => [...prevUsers, { id: Date.now(), ...user }]);
  };

  return (
    <UserContext.Provider value={{ users, addUser, setUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
