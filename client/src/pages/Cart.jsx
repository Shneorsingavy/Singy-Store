import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { cartOptions } from '../App';
import ShowCart from '../components/ShowCart';

const Cart = () => {

  const { cartArr, addItem, removeItem } = useContext(cartOptions);

  return (
    <div className="p-6">
      {cartArr.length > 0 ? (
        <ShowCart cartArr={cartArr} removeItem={removeItem} addItem={addItem}/>
      ) : (
        <div className="text-center text-gray-600">
          <p className='text-2xl font-bold'>Your cart is empty.</p>
          <NavLink to='/'> <button
            className='bg-blue-500 hover:bg-blue-700 text-white 
                           font-bold p-1 rounded transition-colors duration-200'>Back
          </button>
          </NavLink>
        </div>
      )}
    </div>
  )
}

export default Cart