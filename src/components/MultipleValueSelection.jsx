import React, { useState } from "react";


const MultipleValueSelection = () => {
  const [selectedValues, setSelectedValues] = useState([]);

  const handleSelectChange = (event) => {
    // Get selected options as an array
    const selected = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedValues(selected);
  };

  const options = [
    { id: 1, role: "admin", name: "Admin" },
    { id: 2, role: "trainer", name: "Trainer" },
    { id: 3, role: "studentser", name: "Student" },
    { id: 4, role: "user", name: "User" },
  ];

  return (
    <div className="p-4">
      <MultipleValueSelection
        label="Choose Options"
        id="multi-select"
        name="multiSelect"
        value={selectedValues}
        saveItem="value"
        onChange={handleSelectChange}
        options={options}
        placeholder="Select options"
      />
      <div className="mt-4">
        <strong>Selected Values:</strong> {JSON.stringify(selectedValues)}
      </div>
    </div>
  );
};

export default MultipleValueSelection;
