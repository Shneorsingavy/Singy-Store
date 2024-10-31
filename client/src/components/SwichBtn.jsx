import React from 'react'

const SwichBtn = ({setIsSignUp, isSignUp}) => {
  return (
    <div className="flex justify-around mb-6">
    <button
      onClick={() => setIsSignUp(true)}
      className={`px-4 py-2 rounded ${isSignUp ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
    >
      Sign-up
    </button>
    <button
      onClick={() => {
        setIsSignUp(false)
      }}
      className={`px-4 py-2 rounded ${!isSignUp ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
    >
      Log-In
    </button>
  </div>
  )
}

export default SwichBtn