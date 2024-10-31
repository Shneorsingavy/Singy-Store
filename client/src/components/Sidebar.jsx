import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { FiLogOut } from "react-icons/fi";
import { cartOptions } from '../App'
import Cookies from 'js-cookie';

const Sidebar = ({ isOpen, toggle, onLogout }) => {
  const { setIsAuthenticated } = useContext(cartOptions);
  const [warningLogOut, setWarningLogOut] = useState(false);
  const [logOut, setLogOut] = useState(false);

  const handleLogOut = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        setIsAuthenticated(false);
        console.log("Logout successful");
      } else {
        console.log("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const confirmLogout = () => {
    setWarningLogOut(false);
    handleLogOut();
  };

  return (
    <>
   
      <div
        className={`fixed w-52 top-0 left-0 h-full bg-gray-800 text-white transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <button
          onClick={toggle}
          className="text-xl absolute top-4 right-4"
        >
          X
        </button>

        <button
          onClick={toggle}
          className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-gray-800 text-white rounded-l-full p-1 hover:bg-gray-700"
        >
          {isOpen ? <IoIosArrowBack size={20} /> : <IoIosArrowForward size={20} />}
        </button>

        <nav className="p-4 h-full flex flex-col justify-between">
          <ul>
            <NavLink to='/'>
              <li className="p-2 hover:bg-gray-700 cursor-pointer" onClick={toggle}>Home</li>
            </NavLink>
            <NavLink to='/about'>
              <li className="p-2 hover:bg-gray-700 cursor-pointer" onClick={toggle}>About</li>
            </NavLink>
            <NavLink to='/contact'>
              <li className="p-2 hover:bg-gray-700 cursor-pointer" onClick={toggle}>Contact</li>
            </NavLink>
            <NavLink to='/personalArea'>
              <li className="p-2 hover:bg-gray-700 cursor-pointer" onClick={toggle}>Personal Area</li>
            </NavLink>
          </ul>

          <ul className="flex mb-4">
            <li
              className="p-2 hover:bg-gray-700 cursor-pointer flex justify-between w-full"
            >
              Logout
              <FiLogOut
                size={20}
                onClick={() => setWarningLogOut(true)} // להציג את הודעת האזהרה
              />
            </li>
          </ul>
        </nav>
      </div>

      {/* Warning Modal */}
      {warningLogOut && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl text-black font-bold mb-8" dir='rtl'>האם אתה בטוח שברצונך לצאת מהאתר?</h2>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setWarningLogOut(false)} // ביטול הלוגאוט
                className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded"
              >
                ביטול
              </button>
              <button
                onClick={confirmLogout} // אישור הלוגאוט
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
              >
                אישור
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
