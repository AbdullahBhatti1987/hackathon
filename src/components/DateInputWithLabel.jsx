import React from 'react';

function DateInputWithLabel({ label, id, name, value, onChange, className }) {
  return (
    <div className={`mb-2 flex  gap-4 justify-between items-center capitalize ${className}`}>
     <label htmlFor={id} className="block text-sm font-medium w-2/5">
        {label}
      </label>
      <input
        type="date"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="inputClass w-3/5"
        required
      />
    </div>
  );
}

export default DateInputWithLabel;
