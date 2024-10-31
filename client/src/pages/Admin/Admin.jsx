import React, { useEffect, useState } from 'react';
import HeaderAdmin from './HeaderAdmin';
import UserPurchase from '../../components/UserPurchase';


const Admin = () => {

  const [usersData, setUsersData] = useState([]);
  const [selectedUserPurchases, setSelectedUserPurchases] = useState(null);
  
  useEffect(() => {
    fetchUsersData();
  }, []);

  

  const fetchUsersData = async () => {
    
    try {
      const response = await fetch('http://localhost:5000/api/admin/getUsersData', {   
        method: 'GET',
        credentials:'include'
      });
    
      if(response.ok) {
        const {users} = await response.json();
        console.log(users);
        
        setUsersData(users);
      }
      
    } catch(err) {
      console.log("Error in fetch users data: ", err.message);
    }
  };


  // פונקציה לטפל בלחיצה ולהחזיר את רכיבי היסטוריית הרכישות
  const purchaseDetails = (purchases) => {
    setSelectedUserPurchases(purchases); 
  };


  return (
    <div className="min-h-screen bg-gray-100">
      <HeaderAdmin />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center" dir='rtl'>לוח בקרה של האדמין</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg" dir='rtl'>
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-right">שם משתמש</th>
                <th className="py-3 px-6 text-right">אימייל</th>
                <th className="py-3 px-6 text-right">כמות רכישות</th>
                <th className="py-3 px-6 text-right">תאריך רישום</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {usersData.map((user) => (
                <tr key={user._id} className="border-b border-gray-300 hover:bg-gray-100">
                  <td className="py-3 px-6">{user.name}</td>
                  <td className="py-3 px-6">{user.email}</td>
                  <td className="py-3 px-6 text-center cursor-pointer" onClick={() => purchaseDetails(user.shopHistory)}>
                    {user.shopHistory.length}
                  </td>
                  <td className="py-3 px-6">{user.registrationDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

 {/* הצגת הקומפוננטה UserPurchase כאשר נבחרו רכישות */}
{selectedUserPurchases && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
   
    <div className="absolute inset-0 bg-gray-800 opacity-50"></div>

    <div className="relative bg-white p-6 rounded-lg shadow-lg z-50 max-w-md w-full">
      <h2 className="text-xl font-semibold mb-4 mt-6" dir='rtl'>רכישות של המשתמש:</h2>
      <UserPurchase purchases={selectedUserPurchases} />


      <button
        onClick={() => setSelectedUserPurchases(null)} 
        className="absolute top-2 right-2 border-2 px-2 text-gray-500 hover:text-white hover:bg-blue-500 "
      >
        X
      </button>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default Admin;
