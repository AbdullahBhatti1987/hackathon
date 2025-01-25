import React from 'react'
import ButtonFilter from './ButtonFilter'

function FilterButtons() {
  return (
    <div className="flex gap-3 bg-gray-100 p-1 rounded-lg my-1">
            <ButtonFilter text={"Overview"} /> 
            <ButtonFilter text={"Anylistic"}/> 
            <ButtonFilter text={"Reports"} /> 
            <ButtonFilter text={"Notifications"} /> 
          </div>
  )
}

export default FilterButtons