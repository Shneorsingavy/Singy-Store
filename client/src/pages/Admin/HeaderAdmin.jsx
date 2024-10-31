import React,{ useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiLogOut } from "react-icons/fi";
import { adminOptions } from '../../App';


const HeaderAdmin = () => {

  const {setIsAuthenticated} = useContext(adminOptions)

  const handleLogOut = async() => {    
      try {
        const response = await fetch('http://localhost:5000/api/admin/logout', {
          method: 'POST',
          credentials: 'include',
        });
  
        if (response.ok) {
          setIsAuthenticated(false)
          console.log("Logout successful");
        } else {
          console.log("Logout failed");
        }
      } catch (error) {
        console.error("Error during logout:", error);
      }
    };
  

  return (
    <header className="bg-blue-800 text-white shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
        <div> 
          <FiLogOut 
            size={25}
            onClick={handleLogOut}
            /> 
          </div>
        <div className="text-lg font-bold">
          <Link to="/" className="hover:text-yellow-300 ml-0">Admin Dashboard</Link>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/dashboard" className="hover:text-yellow-300">Dashboard</Link>
            </li>
            <li>
              <Link to="/users" className="hover:text-yellow-300">Users</Link>
            </li>
            <li>
              <Link to="/orders" className="hover:text-yellow-300">Orders</Link>
            </li>
            <li>
              <Link to="/settings" className="hover:text-yellow-300">Settings</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default HeaderAdmin;
