import { cartOptions } from '../App'
import { useContext, useState } from 'react';

const ShowCart = () => {
  const { setArr, cartArr, removeItem, addItem } = useContext(cartOptions);
  const [seccesRes, setSeccesRes] = useState(false)

  const sendData = async () => {

    try {
      const productsToSend = cartArr.map((item) => ({
        _id: item._id,
        amount: item.amount
      }));
      console.log(productsToSend);
      
      const response = await fetch('http://localhost:5000/api/products/reduce', {
        method: 'POST',
        credentials:'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productsToSend)
      }
      );

      if (!response.ok) { throw new Error(`Failed to set products in ${response.status}`) }

      const data = await response.json();
      console.log(data);
      setSeccesRes(true);

    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }





  return (
    <div className="overflow-x-hidden z-50 left-0 top-0 w-80 h-120 bg-white shadow-lg p-4 border-l border-gray-300 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2 border-gray-300">
        Shopping Cart
      </h2>
      {cartArr.length === 0 ? (
        <p className="text-center text-gray-500 mt-20">Your cart is empty.</p>
      ) : (
        cartArr.map((product) => (
          <div
            key={product._id}
            className="flex items-center border-b border-gray-200 pb-4 mb-4"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-24 h-24 object-cover rounded-md mr-4"
            />
            <div className="flex-grow">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 mb-1">{product.description}</p>
              <p className="text-lg font-bold text-gray-900 mb-2">
                ${product.price}
              </p>
              <div className="flex items-center">
                <button
                  className="bg-gray-300 text-gray-800 px-3 py-1 rounded-l-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
                  onClick={() => removeItem(product)}
                >
                  -
                </button>
                <span className="px-4 py-1 text-lg font-medium">
                  {product.amount}
                </span>
                <button
                  className="bg-gray-300 text-gray-800 px-3 py-1 rounded-r-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
                  onClick={() => addItem(product)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))
      )}

      {cartArr.length > 0 && (
        <div className="mt-6 border-t border-gray-300 pt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Total</h3>
          <p className="text-xl font-bold text-gray-900">
            $
            {cartArr
              .reduce((total, product) => total + product.price * product.amount, 0).toFixed(2)}
          </p>
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200 w-full mt-4"
            onClick={sendData}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
      <div className="relative">
        {seccesRes && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            onClick={() => {setSeccesRes(!seccesRes); setArr([]) }}>
            <div
              className="bg-white p-8 rounded w-1/3 h-1/3 shadow-lg font-bold text-2xl flex text-center items-center justify-center"
              dir='rtl'>
              פרטי הקניה נשלחו בהצלחה!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowCart;
