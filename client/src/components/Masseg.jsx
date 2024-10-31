import React from 'react'

const Masseg = () => {
  return (
    <div
    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    onClick={() => {setSeccesRes(!seccesRes); setArr([]) }}>
    <div
      className="bg-white p-8 rounded w-1/3 h-1/3 shadow-lg font-bold text-2xl flex text-center items-center justify-center"
      dir='rtl'>
      פרטי הקניה נשלחו בהצלחה!
    </div>
  </div>
  )
}

export default Masseg