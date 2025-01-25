import { useEffect, useState, useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import axios from 'axios'; // Import axios for making API requests

const Example = () => {
  // State to store fetched data
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with your API URL
        const response = await axios.get('YOUR_API_URL_HERE');
        setFetchedData(response.data); // Set the fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  // Memoize columns to avoid unnecessary re-renders
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name.firstName', // Access nested data with dot notation
        header: 'First Name',
        size: 150,
      },
      {
        accessorKey: 'name.lastName',
        header: 'Last Name',
        size: 150,
      },
      {
        accessorKey: 'address',
        header: 'Address',
        size: 200,
      },
      {
        accessorKey: 'city',
        header: 'City',
        size: 150,
      },
      {
        accessorKey: 'state',
        header: 'State',
        size: 150,
      },
    ],
    []
  );

  // Initialize the table with the fetched data
  const table = useMaterialReactTable({
    columns,
    data: fetchedData, // Use fetched data here
  });

  return <MaterialReactTable table={table} />;
};

export default Example;
