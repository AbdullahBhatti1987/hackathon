import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import dayjs from "dayjs";

export default function DatePickerValue({ name, id, label, value, onChange, className }) {
  const handleChange = (newValue) => {
    onChange(newValue ? newValue.format("YYYY-MM-DD") : null); // Format the date as YYYY-MM-DD
  };

  return (
    <div className={`mb-2 flex gap-4 justify-between items-center bg-blue-100 ${className}`}>
      <label htmlFor={id} className="block text-sm font-medium w-2/5">
        {label}
      </label>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          className="inputClass w-3/5 p-2 bg-white"
          name={name}
          value={value ? dayjs(value) : null} // Convert to dayjs object if value exists
          onChange={handleChange}
          format="DD/MM/YYYY"
          renderInput={(params) => (
            <TextField {...params} variant="outlined" size="small" placeholder="DD/MM/YYYY" xs={{boxSize: "none", height: '2.6rem'}}   />
          )}
        />
      </LocalizationProvider>
    </div>
  );
}