import React, { useContext, useState } from 'react';
import { cartOptions } from '../App';
import { NavLink } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaBars } from 'react-icons/fa'; 
import Sidebar from './Sidebar';

const Header = ({ setArrProduct, product }) => {

  const { cartArr } = useContext(cartOptions);
  
  const [search, setSearch] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [originalProductList] = useState(product); 

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const searchedProducts = () => {
    if (search.trim() !== "") {
      const searched = originalProductList.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) // חיפוש לפי חלק מהשם
      );
      setArrProduct(searched);
    } else {
      setArrProduct(originalProductList); // אם שדה החיפוש ריק, החזר את המערך המקורי
    }
  };


  return (
    <header className="bg-gray-900 text-white flex items-center p-4 sticky top-0 z-50 shadow-lg">
      <div className="flex items-center space-x-4 w-full max-w-screen-xl mx-auto">
        <button onClick={toggleSidebar} className="text-2xl cursor-pointer">
          <FaBars />
        </button>
        <div className="flex-grow flex items-center justify-center">
          <div className="text-3xl font-bold text-yellow-500 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
            SingiWatch
          </div>
        </div>
        <div className="flex items-center space-x-2 w-1/3">
          <input
            dir="rtl"
            type="text"
            placeholder="חיפוש..."
            onChange={(event) => setSearch(event.target.value)}
            value={search}
            className="w-full p-2 rounded-l-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
          />
          <button
            className="bg-yellow-500 text-gray-900 p-2 rounded-r-md flex items-center"
            onClick={searchedProducts} // קריאה לפונקציית החיפוש
          >
            <FaSearch />
          </button>
        </div>
        <NavLink to="/cart" className="relative text-2xl ml-4 cursor-pointer">
          <FaShoppingCart />
          {cartArr.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {cartArr.length}
            </span>
          )}
        </NavLink>
      </div>
      <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />
    </header>
  );
};

export default Header;
