import React, { useContext } from 'react';
import { cartOptions } from '../App';

const Product = ({ watch }) => {
  const { addItem } = useContext(cartOptions);

  
  const isSoldOut = watch.quantity <= 0;

  return (
    <div
      className={`relative border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center p-4 m-4 
        ${isSoldOut ? 'bg-gray-200 opacity-70' : 'bg-white'}`} 
    >
     
      {isSoldOut && (
        <div className="absolute top-0 left-0 bg-red-500 text-white font-bold px-2 py-1 text-xs transform -translate-x-1/2 -translate-y-1/2 rotate-45">
          Sold Out
        </div>
      )}
      <img
        src={watch.image}
        alt="watch"
        className="w-48 h-48 object-cover border rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold mb-2">{watch.name}</h3>
      <p className="text-sm text-gray-600 mb-2">{watch.description}</p>
      <h3 className="text-lg font-bold mb-4 flex flex-grow">${watch.price}</h3>

      
      <button
        className={`font-bold py-2 px-4 rounded transition-colors duration-200 
          ${isSoldOut ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}
        onClick={() => !isSoldOut && addItem(watch)}
        disabled={isSoldOut} 
      >
        Add To Cart
      </button>
    </div>
  );
};

export default Product;
