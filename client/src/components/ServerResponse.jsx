import React from 'react'

const ServerResponse = ({setServerRes, serverRes}) => {
  return (
    <div
    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    onClick={() => setServerRes('')}
  >
    <p className="w-1/4 h-1/4 flex justify-center text-center items-center border-2 rounded-lg bg-white text-black text-2xl">
      {serverRes}
    </p>
    
  </div>
  )
}

export default ServerResponse