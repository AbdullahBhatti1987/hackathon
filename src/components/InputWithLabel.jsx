import React from 'react';

function InputWithLabel({ type, label, id, name, value, onChange, placeholder, className }) {
  return (
    <div className={`mb-2 flex gap-4 justify-between items-center ${className}`}>
      <label htmlFor={id} className="block text-sm font-medium w-2/5">
        {label}
      </label>
      <input
        type={`${type} || "text"`}
        id={id}
        name={name}
        value={value} 
        onChange={onChange}
        placeholder={placeholder}
        className="inputClass w-3/5"
        required
      />
    </div>
  );
}

export default InputWithLabel;
