import React, { useEffect, useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineMessage } from "react-icons/md";
import SelectOption from "./SelectTheme";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import ButtonM from "./ButtonM";

export default function Header({ fullName, email, imageUrl}) {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState("");


   useEffect(() => {
      const decodeToken = async () => {
        try {
          const token = Cookies.get("token");
          if (token) {
            const decoded = jwtDecode(token);
            setCurrentUser(decoded);
            return;
          } 
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      };
  
      decodeToken();
    }, [navigate]);


  const user = {
    imageUrl: currentUser.imageUrl, // Example image URL
    name: currentUser.fullName,
    email: currentUser.email,
  };

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
    document.body.style.backgroundColor = darkMode ? "#fff" : "#333";
    document.body.style.color = darkMode ? "#000" : "#fff";
  };

  const handleUserMenuClick = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleSignOut = async () => {
    try {
      await Cookies.remove("token");
      console.log("User has been logged out.");
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleSearch = () => {
    console.log("search Item =>", search);
  };

  return (
    <div className="flex flex-row justify-between items-center gap-1 w-full border-b border-neutral-300 px-4 h-14">
      {/* Left Section */}
      <div className="flex flex-row w-2/12">
        <h1 className="text-lg font-semibold flex text-start rounded-lg justify-center items-center h-full w-full">
          SMIT Portal
        </h1>
      </div>

      <div className="flex flex-row gap-1 w-7/12 rounded-lg justify-center items-center">
        <input
          type="search"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          id="search"
          placeholder="Search"
          className="rounded-md w-2/3 p-2 border border-neutral-300 placeholder-neutral-500"
        />
        <ButtonM
          onClick={handleSearch}
          className="rounded-md w-1/3 p-2 border border-neutral-300 bg-neutral-200 text-neutral-900 hover:bg-neutral-300"
          text={"Search"}
        />
      </div>

      {/* Right Section (Icons and User Info) */}
      <div className="flex flex-row justify-center items-center gap-2 w-2/12">
        <div className="flex justify-center items-center p-2 text-neutral-500 hover:text-neutral-700">
          <IoIosNotificationsOutline className="text-2xl" />
        </div>
        <div className="flex justify-center items-center p-2 text-neutral-500 hover:text-neutral-700">
          <MdOutlineMessage className="text-2xl" />
        </div>


        {/* User Info and Theme Toggle */}
        <div className="flex justify-center items-center p-2 text-neutral-500 hover:text-neutral-700">
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* Theme Toggle */}
            <button
              onClick={handleThemeToggle}
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                color: darkMode ? "#f5f5f5" : "#333",
              }}
            >
              {darkMode ? "🌞" : "🌙"}
            </button>

            {/* User Info Button with Image */}
            <button
              onClick={handleUserMenuClick}
              className="rounded-full p-2 bg-neutral-200 text-neutral-900 flex items-center"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                overflow: "hidden",
              }}
            >
              {currentUser?.imageUrl ? (
                <img
                  src={user.imageUrl}
                  alt="User"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <span>{user.fullName}</span> // Fallback to first letter of name
              )}
            </button>

            {/* User Menu */}
            {userMenuOpen && (
              <div
            
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50px",
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  padding: "10px",
                  zIndex: 999,
                }}
              >
                <div>
                  <p>{user?.name}</p>
                  <p style={{ color: "#666" }}>{user?.email}</p>
                </div>
                <button
                  onClick={handleSignOut}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "#ff0000",
                  }}
                >
                  <span className={"text-gray-400 font-bold border-2 p-2"}> Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
