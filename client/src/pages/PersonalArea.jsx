import React, { useEffect, useContext, useState } from 'react';
import Card from '../components/Card';
import { cartOptions } from '../App';

const PersonalArea = () => {
  const [shopeHistoryProducts, setShopeHistoryProducts] = useState([]);
  const { product } = useContext(cartOptions);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/personalData', {
        method: 'GET',
        credentials: 'include'
      });

      if (response.ok) {
        const { shopHistory } = await response.json();
   

        // לעבור על כל רכישה ולשדרג את המוצרים
        const UpdatedProduct = shopHistory.map(purchase => {
          // לשדרג את המוצרים ברכישה
          purchase.items.forEach(item => {
            const productData = product.find(prod => prod._id === item._id);
                  
            if (productData) {
              item.image = productData.image;
              item.price = productData.price;
            }
          });
          return purchase; // להחזיר את הרכישה עם המוצרים המעודכנים
        });

        setShopeHistoryProducts(UpdatedProduct);
      }
    } catch (err) {
      console.log('Error in fetch history', err);
    }
  };

  const showDatailes = () => {
    // כאן תוכל להוסיף לוגיקה להצגת פרטי ההזמנה אם תרצה
  };

  return (
    <div className='w-full min-h-screen bg-gray-100 p-6 flex flex-col justify-center text-center'>
      <h1 className='text-3xl font-bold mb-6'>Your Purchase History</h1>
      {shopeHistoryProducts.length > 0 ? (
        shopeHistoryProducts.map(({ items, purchaseDate }, index) => (
          <div key={index} className='bg-white shadow-md rounded-lg mb-8 p-6 w-1/2'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-2xl font-semibold text-gray-700'>Purchase number {index + 1}</h3>
              <button
                className='text-sm text-blue-500 hover:underline'
                onClick={showDatailes}
              >
                View Order Details
              </button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              {items.map((watch) => (
                <Card key={watch._id} watch={watch} />
              ))}
            </div>

            <div className='mt-6 text-right'>
              <span className='mr-6'>Date of purchase: {purchaseDate}</span>
              <button className='bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded shadow'>
                Buy Again
              </button>
            </div>
          </div>
        ))
      ) : (
        <h3 className='text-lg text-gray-500'>No purchase history available.</h3>
      )}
    </div>
  );
};

export default PersonalArea;
