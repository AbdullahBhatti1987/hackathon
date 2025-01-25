import React from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

function MenuList({ array, menu }) {
  const theme = useTheme();
  const sortedArray = [
    ...array.filter((item) => item.name === "Dashboard"), 
    ...array
      .filter((item) => item.name !== "Dashboard")
      .sort((a, b) => a.name.localeCompare(b.name)), 
  ];

  return (
    <div className="scrollbar-custom">
      <ul className="flex gap-1 flex-col">
        {sortedArray.map((data) => {
          return (
            <li
              key={data.id}
              className="hover:bg-blue-100 w-full hover:text-gray-800 rounded-md transition-colors duration-200"
            >
              <NavLink
                to={data.route}
                className="flex items-center justify-center w-full px-4 py-2 text-sm rounded-sm"
                style={({ isActive }) => ({
                  backgroundColor: isActive
                    ? theme.palette.primary.main
                    : "inherit",
                  color: isActive ? "white" : "inherit",
                })}
              >
                <span className="w-1/4 flex items-center justify-center text-xl">
                  {data.icon}
                </span>
                {menu && (
                  <span className="w-2/4 truncate text-md font-medium  transition-all duration-200">
                    {data.name}
                  </span>
                )}
                {menu && (
                  <span className="w-1/4 text-right text-sm">
                    {data.length}
                  </span>
                )}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default MenuList;
