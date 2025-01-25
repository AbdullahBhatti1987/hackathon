import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Papa from "papaparse";
import { useTheme } from "@mui/material/styles";

const Filter = ({ data, onDownload, onFilter }) => {
  const [originalData, setOriginalData] = useState(data);
  const [selectedKey1, setSelectedKey1] = useState("");
  const [selectedValue1, setSelectedValue1] = useState("");
  const [selectedKey2, setSelectedKey2] = useState("");
  const [selectedValue2, setSelectedValue2] = useState("");
  const [exportType, setExportType] = useState("");
  const theme = useTheme();

  const keys = data?.length > 0 ? Object.keys(data[0]) : [];
  const values1 = selectedKey1
    ? [...new Set(data.map((item) => item[selectedKey1]))]
    : [];
  const values2 = selectedKey2
    ? [...new Set(data.map((item) => item[selectedKey2]))]
    : [];

  useEffect(() => {
    if (selectedKey1 && selectedValue1) {
      setSelectedKey2(keys[1] || "");
    }
  }, [selectedKey1, selectedValue1, keys]);

  const handleDownloadPDF = (filteredData) => {
    const doc = new jsPDF({ orientation: "landscape" });
    const companyName = "SAYLANI Mass I.T Training";
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    doc.setFontSize(10);
    doc.setTextColor(theme.palette.primary.main);
    doc.text(companyName, 10, 5);
    doc.text(`Date: ${currentDate}`, 10, 10);
    doc.text(`Time: ${currentTime}`, 10, 15);

    const tableData = filteredData.map((item, index) => {
      return [index + 1, ...Object.values(item)];
    });

    const tableHeader = ["Serial No.", ...Object.keys(filteredData[0])];

    doc.autoTable({
      head: [tableHeader],
      body: tableData,
      startY: 20,
      theme: "grid",
      styles: {
        fontSize: 10,
        cellPadding: 2,
        overflow: "linebreak",
        halign: "center",
        valign: "middle",
      },
    });

    doc.save("filtered_data.pdf");
  };

  const handleDownloadCSV = (filteredData) => {
    const csv = Papa.unparse(filteredData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "filtered_data.csv";
    link.click();
  };

  const handleDownloadFilteredData = () => {
    let filteredData = data;

    if (selectedKey1 && selectedValue1) {
      filteredData = filteredData.filter(
        (item) => item[selectedKey1] === selectedValue1
      );
    }

    if (selectedKey2 && selectedValue2) {
      filteredData = filteredData.filter(
        (item) => item[selectedKey2] === selectedValue2
      );
    }

    if (exportType === "pdf") {
      handleDownloadPDF(filteredData);
    } else if (exportType === "csv") {
      handleDownloadCSV(filteredData);
    } else {
      alert("Please select a file format (PDF or CSV).");
    }
  };

  const handleFilter = () => {
    if (
      (!selectedKey1 || !selectedValue1) &&
      (!selectedKey2 || !selectedValue2)
    ) {
      alert("Please select at least one key-value pair for filtering.");
      return;
    }

    let filteredData = data;
    if (selectedKey1 && selectedValue1) {
      filteredData = filteredData.filter(
        (item) => item[selectedKey1] === selectedValue1
      );
    }

    if (selectedKey2 && selectedValue2) {
      filteredData = filteredData.filter(
        (item) => item[selectedKey2] === selectedValue2
      );
    }

    onFilter(filteredData);
  };

  const handleClearFilter = () => {
    setSelectedKey1("");
    setSelectedValue1("");
    setSelectedKey2("");
    setSelectedValue2("");

    onFilter(data);
  };

  return (
    <div className="w-full flex justify-between items-center gap-4 my-2">
      <div className=" flex justify-between items-center w-1/2 gap-4">
        {/* Key 1 Select */}
        <div className="flex-1 w-1/8">
          <FormControl fullWidth size="small">
            <InputLabel
              id="filter-key1-label"
              className="text-xs"
              sx={{ zIndex: 0 }}
            >
              Select Key 1
            </InputLabel>
            <Select
              labelId="filter-key1-label"
              value={selectedKey1}
              label="Select Key 1"
              onChange={(e) => {
                setSelectedKey1(e.target.value);
                setSelectedValue1("");
                setSelectedKey2("");
                setSelectedValue2("");
              }}
              className="capitalize text-xs z-0 w-full truncate"
            >
              <MenuItem value="">Select a key</MenuItem>
              {keys.map((key, idx) => (
                <MenuItem key={idx} value={key} className="capitalize text-xs">
                  {key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Value 1 Select */}
        <div className="flex-1 w-1/8">
          <FormControl fullWidth size="small">
            <InputLabel
              id="filter-value1-label"
              className="text-xs"
              sx={{ zIndex: 0 }}
            >
              Select Value 1
            </InputLabel>
            <Select
              labelId="filter-value1-label"
              value={selectedValue1}
              label="Select Value 1"
              onChange={(e) => setSelectedValue1(e.target.value)}
              disabled={!selectedKey1}
              className="capitalize text-xs z-0 w-full truncate"
            >
              <MenuItem value="">Select a value</MenuItem>
              {values1.map((value, idx) => (
                <MenuItem
                  key={idx}
                  value={value}
                  className="capitalize text-xs"
                >
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Key 2 Select */}
      
      </div>
      <div className="flex flex-1  items-center justify-between w-1/2 gap-4">
        {/* Search and Clear Buttons */}
        <div className="flex-1 w-1/2  flex items-center gap-4">
          <Button
            variant="contained"
            color="primary"
            onClick={handleFilter}
            className="w-1/2 text-xs px-2 text-nowrap"
            sx={{ height: "40px" }}
          >
            Search
          </Button>
          <Button
            variant="outlined"
            onClick={handleClearFilter}
            className="w-1/2 text-xs px-2 text-nowrap"
            sx={{ height: "40px" }}
          >
            Clear Filter
          </Button>
        </div>
        <div className=" w-1/2 flex items-center gap-4">
          <div className="flex-1 w-1/4 flex items-center space-x-2">
            <FormControl fullWidth size="small">
              <InputLabel id="export-type-label" className="text-xs">
                Export Format
              </InputLabel>
              <Select
                labelId="export-type-label"
                value={exportType}
                label="Export Format"
                onChange={(e) => setExportType(e.target.value)}
                className="capitalize text-xs"
              >
                <MenuItem value="">Select Format</MenuItem>
                <MenuItem value="pdf" className="capitalize text-xs">
                  PDF
                </MenuItem>
                <MenuItem value="csv" className="capitalize text-xs">
                  CSV
                </MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="flex-1 w-1/4 flex items-center space-x-2">
            <Button
              variant="contained"
              onClick={handleDownloadFilteredData}
              className="w-full text-xs px-2 text-nowrap"
              sx={{ height: "40px" }}
            >
              Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
