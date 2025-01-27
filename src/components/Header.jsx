import React, { useEffect, useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import { MdMessage } from "react-icons/md";
import SelectOption from "./SelectTheme";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import ButtonM from "./ButtonM";
import Toggle from "./Toogle";

export default function Header({ fullName, email, imageUrl }) {
  const navigate = useNavigate();
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



  const handleUserMenuClick = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleSearch = () => {
    console.log("search Item =>", search);
  };

  return (
    <div className="flex flex-row justify-between items-center gap-1 w-full border-b border-neutral-300 px-4 h-14">
      {/* Left Section */}
      <div className="flex flex-row w-2/12">
        <h1 className="text-lg font-semibold flex text-start rounded-lg justify-center items-center h-full w-full">
          Saylani Portal
        </h1>
      </div>

      <div className="flex flex-row gap-3 w-7/12 rounded-lg justify-center items-center">
        <input
          type="search"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          id="search"
          placeholder="Search"
          className="rounded-md w-2/3 p-2 border border-neutral-300 placeholder-neutral-500 shadow-md"
        />
        <ButtonM
          onClick={handleSearch}
          className="rounded-md w-1/3 h-10 border border-neutral-300 bg-neutral-200 text-neutral-900 hover:bg-neutral-300"
          text={"Search"}
        />
      </div>

      {/* Right Section (Icons and User Info) */}
      <div className="flex justify-center items-center gap-2 w-3/12 h-fulloverflow-hidden">

        <div className="text-neutral-500 hover:text-neutral-700">
          <IoIosNotifications className="text-2xl" />
        </div>
        <div className=" text-neutral-500 hover:text-neutral-700">
          <MdMessage  className="text-2xl" />
        </div>
       
        <Toggle />
        <button
          onClick={handleUserMenuClick}
          className="rounded-full bg-neutral-200 text-neutral-900 flex items-center w-10 h-10 overflow-hidden"
        >
          {currentUser?.imageUrl ? (
            <img
              src={currentUser.imageUrl}
              alt="User"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <span className="w-full h-full justify-center items-center flex text-2xl">
              {currentUser?.fullName?.[0]?.toUpperCase()}
            </span>
          )}
        </button>

        {userMenuOpen && (
          <div className="absolute top-16 right-10 blur-xs bg-blue-300 rounded-2;g padding-4 z-50"

          >
            <div>
              <p>{user?.name}</p>
              <p style={{ color: "#666" }}>{user?.email}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
