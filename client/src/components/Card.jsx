import React from 'react'

const Card = ({watch}) => {
  return (
    <div className='border-2 rounded-lg shadow-xl p-2 flex flex-col justify-center text-center items-center'>
       <img src={watch.image} alt="pic" className="w-24 h-24 object-cover border rounded-md mb-4 p-2"/>  
       <h2 className='text-green-600 font-bold'>Price: {watch.price}$</h2>
       <p>Amount: {watch.amount}</p>
    </div>
  )
}

export default Card