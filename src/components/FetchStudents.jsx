import React from 'react'
import { useState } from "react";

import { useEffect } from "react";
import axios, { isCancel } from "axios";
import StudentlistView from "./StudentlistView";

function FetchStudents() {
    const [students, setStudents] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState(false);
    const [defaultAPI, setDefaultAPI] = useState("/student");
  
    useEffect(() => {
      (async () => {
        try {
          setLoading(true);
          setError(false);
          // console.log(defaultAPI);
          const response = await axios.get(defaultAPI);
          setTimeout(() => {
            // console.log(response);
            setStudents(response.data);
            setLoading(false);
          }, 1000);
        } catch (error) {
          setError(true);
          setLoading(false);
        }
      })();
    }, [defaultAPI]);
  
    useEffect(() => {
      if (!search) {
        setDefaultAPI("/student");
      }
    }, [search]);
  
    const HandleSearch = (e) => {
      console.log("search=>", search);
      setDefaultAPI("/student?search=" + search);
    };
  
    if (error) {
      return <h1>Something went wrong</h1>;
    }

    return (
        <>
          <div className="flex justify-center items-center w-full flex-col bg-gray-700 gap-5">
        
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className={"bg-white shadow-md border rounded-full p-2 px-4"}
            />
            <button
              onClick={HandleSearch}
              className="bg-white shadow-md border rounded-full p-2 px-4"
            >
              Search
            </button>
            <h1 className="text-6xl font-bold text-white">
              Chai aur code in react
            </h1>
            {loading ? (
              <h2>Loading...</h2>
            ) : (
              <div className="p-6 bg-gray-100 w-full">
                <StudentlistView array={students} />
              </div>
            )}
          </div>
        </>
      );
    }

export default FetchStudents