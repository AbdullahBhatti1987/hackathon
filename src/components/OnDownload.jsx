
import React, { useState} from "react";
import Filter from "./Filter";

const OnDownload = ({filteredData}) => {
   
  
    const handleFilterChange = (value, selectedFilter) => {
      // Apply your filter logic here and update filteredData
    };
  
    const handleDownload = (format) => {
      if (format === "pdf") {
        // Logic to download as PDF
        console.log("Downloading as PDF");
      } else if (format === "excel") {
        // Logic to download as Excel
        console.log("Downloading as Excel");
      }
    };
  
    return (
      <div>
        <Filter data={filteredData} onFilterChange={handleFilterChange} onDownload={handleDownload} />
        
      </div>
    );
  };
  export default OnDownload;