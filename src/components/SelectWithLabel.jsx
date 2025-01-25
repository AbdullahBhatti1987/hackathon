import React from 'react';

function SelectWithLabel({ label, id, name, value, saveItem, onChange, options, placeholder, className, view = "name" }) {
  return (
    <div className={`mb-2 flex  gap-4 justify-between items-center capitalize ${className}`}>
      <label htmlFor={id} className="block text-sm font-medium w-2/5">
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={"inputClass w-3/5"}
        required
      >
        <option value="" className="capitalize" disabled>
          {placeholder}
        </option>
        {options?.map((option, index) => (
          
          <option key={index} value={option[saveItem]} className="capitalize">
            
            {option[view] || option.name || option.title || option.country}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectWithLabel;
