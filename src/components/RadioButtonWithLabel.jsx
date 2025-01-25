import React from 'react';

function RadioButtonWithLabel({ label, name, options, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium">{label}</label>
      <div className="flex items-center space-x-4">
        {options.map((option) => (
          <label key={option.value} className="flex items-center">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              className="mr-2"
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
}

export default RadioButtonWithLabel;
