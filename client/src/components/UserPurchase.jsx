import React, { useContext } from 'react';
import { adminOptions } from '../App';

const UserPurchase = ({ purchases }) => {
  const { setIsAuthenticated, product, fetchProducts } = useContext(adminOptions);

  const totalPurchasePrice = (purchase) => {
    return purchase.items.reduce((total, item) => {
      const productDetails = product.find(prod => prod._id === item._id);
      if (productDetails) {
        // הכפל את המחיר בכמות
        return total + (productDetails.price * item.amount);
      }
      return total; // אם לא נמצא המוצר, תחזיר את הסכום הנוכחי
    }, 0);
  };

  return (
    <div className="overflow-x-auto p-4">
      <table dir="rtl" className="min-w-full bg-white border border-gray-300 shadow-md">
        <thead className="bg-gray-200 text-gray-600">
          <tr>
            <th className="py-2 px-4 border-b">תאריך רכישה</th>
            <th className="py-2 px-4 border-b">כמות מוצרים</th>
            <th className="py-2 px-4 border-b">סכום קניה</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((purchase) => (
            <tr key={purchase.purchaseDate} className="text-center">
              <td className="py-2 px-4 border-b">{purchase.purchaseDate}</td>
              <td className="py-2 px-4 border-b">{purchase.items.length}</td>
              <td className="py-2 px-4 border-b text-green-600">{totalPurchasePrice(purchase).toFixed(2)} $</td>
            </tr>
          ))}
        </tbody>
      </table> 
    </div>
  );
};

export default UserPurchase;
