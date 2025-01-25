import React from 'react'
import { FaGithub } from "react-icons/fa";

function Signup() {
  return (
    <div >
    <div className='flex flex-col gap-6 border-2 p-8 rounded-xl w-2/5 m-auto mt-12'>
      <div className='flex flex-col gap-1'>
      <h1 className="text-2xl font-semibold">Create an account</h1>
      <p>Enter your email below to create your account</p>
      </div>
      <div className="flex gap-4 justify-between items-center">
        <button onClick={""} className="flex justify-center items-center gap-2 border-2 w-1/2 rounded-lg py-2">
          <FaGithub />
          <span>GitHub</span>
        </button>
        <button onClick={""} className="flex justify-center items-center gap-2 border-2 w-1/2 rounded-lg py-2">
          <FaGithub />
          <span>GitHub</span>
        </button>
      </div>
      <div className='w-full flex justify-center'>
        <span className='text-center text-xs font-semibold'>OR CONTINUE WITH</span>
      </div>
      <div className='flex flex-col gap-4'>
        <label htmlFor="email" className='flex flex-col gap-2 font-semibold'>Email
          <input type="email" name="email" id="email" className='border-2 py-2 px-2 rounded-lg font-normal' placeholder='abc@gmail.com'/>
        </label>
        <label htmlFor="password" className='flex flex-col gap-2 font-semibold'>Password
          <input type="password" name="password" id="password" className='border-2 py-2 px-2 rounded-lg font-normal' placeholder='**********'/>
        </label>
      </div>
      <div>
        <button className='bg-black text-white p-2 rounded-lg w-full'>
          Create account
        </button>
      </div>
    </div>
  </div>
  )
}

export default Signup