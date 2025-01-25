import React from 'react'

function Heading1({text, className}) {
  return (
    <h1 className={`text-3xl font-bold mb-6 text-primary ${className}`}>{text}</h1>
  )
}

export default Heading1