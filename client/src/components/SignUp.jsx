import React from 'react'
import { IoMdEyeOff } from "react-icons/io";
import { FaEye } from "react-icons/fa";

const SignUp = ({toolsSignUp}) => {

  const {SignLogIn, details, inValidEmail, showPassword, handleChange, setShowPassword} = toolsSignUp
    
  return (
    <form onSubmit={(e) => { e.preventDefault(); SignLogIn(); }}>
    <div className="mb-4">
      <label className="block text-gray-700 font-bold">
        <span className='text-red-500'>*</span>Name:
      </label>
      <input
        type="text"
        name="name"
        value={details.name}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded"
        placeholder="הכנס את שמך"
        required
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 font-bold">
        <span className='text-red-500'>*</span>Email:
      </label>
      <input
        type="email"
        name="email"
        value={details.email}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded"
        placeholder="הכנס את האימייל שלך"
        required
      />
      {inValidEmail && <p className='text-red-500'>Invalid email!</p>}
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 font-bold">
        <span className='text-red-500'>*</span>Password:
      </label>
      <div className='relative'>
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={details.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          placeholder="הכנס סיסמה"
          required
        />
        <span
          className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <IoMdEyeOff /> : <FaEye />}
        </span>
      </div>
    </div>
   
    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
      הרשם
    </button>
  </form>
  )
}

export default SignUp