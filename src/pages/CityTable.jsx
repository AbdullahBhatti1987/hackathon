import React, { useEffect, useMemo, useState } from "react";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { useTheme } from "@mui/material";
// import { Box, Button, createTheme } from '@mui/material';
// import FileDownloadIcon from '@mui/icons-material/FileDownload';
// import { mkConfig, generateCsv, download } from 'export-to-csv';
// import { jsPDF } from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import RefreshIcon from '@mui/icons-material/Refresh';
import Skeleton from "@mui/material/Skeleton";
import axios from "axios";
import { AppRoutes } from "@/constant/constant";

const data = [
  {
    name: { firstName: "Ali", lastName: "Khan" },
    address: "123 M.A. Jinnah Road",
    city: "Karachi",
    state: "Sindh",
  },

  {
    name: { firstName: "Sara", lastName: "Ahmed" },
    address: "456 Shahrah-e-Faisal",
    city: "Karachi",
    state: "Sindh",
  },
  {
    name: { firstName: "Omar", lastName: "Raza" },
    address: "789 Defence Housing Society",
    city: "Lahore",
    state: "Punjab",
  },
  {
    name: { firstName: "Ayesha", lastName: "Shah" },
    address: "101 Mall Road",
    city: "Lahore",
    state: "Punjab",
  },
  {
    name: { firstName: "Zain", lastName: "Iqbal" },
    address: "202 F-10 Markaz",
    city: "Islamabad",
    state: "Islamabad Capital Territory",
  },
  {
    name: { firstName: "Fatima", lastName: "Javed" },
    address: "303 Blue Area",
    city: "Islamabad",
    state: "Islamabad Capital Territory",
  },
  {
    name: { firstName: "Tariq", lastName: "Mehmood" },
    address: "404 Jinnah Avenue",
    city: "Rawalpindi",
    state: "Punjab",
  },
  {
    name: { firstName: "Madiha", lastName: "Akhtar" },
    address: "505 Saddar",
    city: "Rawalpindi",
    state: "Punjab",
  },
  {
    name: { firstName: "Bilal", lastName: "Khan" },
    address: "606 M. T. Khan Road",
    city: "Karachi",
    state: "Sindh",
  },
  {
    name: { firstName: "Nida", lastName: "Rashid" },
    address: "707 Korangi",
    city: "Karachi",
    state: "Sindh",
  },
  {
    name: { firstName: "Hassan", lastName: "Ali" },
    address: "808 Bagh-e-Jinnah",
    city: "Lahore",
    state: "Punjab",
  },
  {
    name: { firstName: "Sana", lastName: "Khalid" },
    address: "909 Faisal Town",
    city: "Lahore",
    state: "Punjab",
  },
  {
    name: { firstName: "Muneeb", lastName: "Khan" },
    address: "1010 Gulshan-e-Iqbal",
    city: "Karachi",
    state: "Sindh",
  },
  {
    name: { firstName: "Amina", lastName: "Bashir" },
    address: "1111 Garden East",
    city: "Karachi",
    state: "Sindh",
  },
  {
    name: { firstName: "Faisal", lastName: "Raza" },
    address: "1212 Bahria Town",
    city: "Islamabad",
    state: "Islamabad Capital Territory",
  },
  {
    name: { firstName: "Mehak", lastName: "Qureshi" },
    address: "1313 Liberty Market",
    city: "Lahore",
    state: "Punjab",
  },
  {
    name: { firstName: "Usman", lastName: "Siddiqui" },
    address: "1414 Rawal Road",
    city: "Rawalpindi",
    state: "Punjab",
  },
  {
    name: { firstName: "Zara", lastName: "Farooq" },
    address: "1515 Main Boulevard",
    city: "Lahore",
    state: "Punjab",
  },
  {
    name: { firstName: "Arif", lastName: "Hussain" },
    address: "1616 Clifton",
    city: "Karachi",
    state: "Sindh",
  },
  {
    name: { firstName: "Rabia", lastName: "Khan" },
    address: "1717 Islamabad Highway",
    city: "Islamabad",
    state: "Islamabad Capital Territory",
  },
];

const CityTable = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const functionName = async () => {
      try {
        const citiesResponse = await axios.get(AppRoutes.getAllCities);
        // console.log("cities=>", citiesResponse?.data?.data);
        setCities(citiesResponse.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    functionName();
  }, [setCities]);
  console.log("cities=>123", cities);
  
  const theme = useTheme(); // Get the current theme
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    if (cities && cities.length > 0) {
      // debugger;
      setIsLoading(false); // Set loading to false once cities data is available
    }
  }, [cities]);

  const columns = useMemo(
    () => [
      {
        accessorFn: (_, index) =>
          table.getState().pagination.pageIndex * table.getState().pagination.pageSize + index + 1,
        header: "Serial No.",
        size: 20,
        muiTableBodyCellProps: {
          sx: {
            textAlign: "center",
            border: "1px solid rgba(0, 0, 0, 0.1)",
          },
        },
      },
      {
        accessorKey: "name.firstName",
        header: "First Name",
        size: 100,
      },
      {
        accessorKey: "address",
        header: "Address",
        size: 250,
      },
      {
        accessorKey: "city",
        header: "City",
        size: 150,
      },
      {
        accessorKey: "country",
        header: "country",
        size: 150,
      },
      {
        accessorKey: "name.lastName",
        header: "Last Name",
        size: 150,
      },
      {
        accessorKey: "state",
        header: "State",
        size: 150,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    cities,
    enableDensityToggle: false,
    initialState: { density: "compact" },
    muiTableBodyRowProps: ({ row }) => ({
      sx: {
        backgroundColor:
          row.index % 2 === 0
            ? theme.palette.mode === "dark"
              ? "rgba(150, 150, 150, 0.1)"
              : "rgb(219, 234, 254)"
            : "inherit",
        border: `1px solid ${theme.palette.mode === "dark" ? "rgba(244, 244, 244, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
      },
    }),
    muiTableBodyCellProps: {
      sx: {
        border: `1px solid ${theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.1)"}`,
        fontSize: "12px", // Adjust font size
        height: "15px", // Adjust row height
      },
    },
    muiTableHeadCellProps: {
      sx: {
        border: `1px solid ${theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.1)"}`,
        backgroundColor: theme.palette.mode === "dark" ? "rgb(41, 41, 41)" : "rgb(229 231 235)",
        textAlign: "center",
      },
    },
  });

  return (
    <div>
      {isLoading ? (
        <Skeleton variant="rectangular" width="100%" height={300} animation="wave" />
      ) : (
        <MaterialReactTable table={cities} />
      )}
    </div>
  );
};

export default CityTable;
