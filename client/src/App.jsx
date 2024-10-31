import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React, { createContext, useEffect, useState } from 'react';
import Home from './pages/Home';
import Cart from './pages/Cart';
import About from './pages/About';
import Header from './components/Header';
import LendingPage from './pages/LendingPage.jsx';
import PersonalArea from './pages/PersonalArea.jsx';
import Admin from './pages/Admin/Admin.jsx';
import { Outlet } from 'react-router-dom';



export const cartOptions = createContext();
export const adminOptions = createContext();

function App() {

  const [cartArr, setArr] = useState([]);
  const [product, setArrProduct] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');

  const checkAuth = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/checkAuth/checkToken', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(true);
        setUserRole(data.role);
        await fetchProducts();
      } else {
        setIsAuthenticated(false);
        setUserRole('');
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUserRole('');
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products/all');
      if (!response.ok) throw new Error('Failed to fetch products');
      const { products } = await response.json();
      setArrProduct(products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addItem = (watch) => {
    const existInCart = cartArr.find(item => item._id === watch._id);
    if (!existInCart) {
      setArr((prevCart) => [...prevCart, { ...watch, amount: 1 }]);
    } else {
      const updatedCart = cartArr.map((item) =>
        item._id === existInCart._id ? { ...item, amount: item.amount + 1 } : item
      );
      setArr(updatedCart);
    }
  };

  const removeItem = (watch) => {
    if (watch.amount > 1) {
      setArr((prevArr) =>
        prevArr.map((item) =>
          item._id === watch._id ? { ...item, amount: item.amount - 1 } : item
        )
      );
    } else {
      setArr((prevArr) => prevArr.filter((item) => item._id !== watch._id));
    }
  };

  return (


    <Router>
      <Routes>
        {isAuthenticated && userRole === 'admin' ? (

          <Route element={
            <adminOptions.Provider value={{ setIsAuthenticated, product, fetchProducts }}>
              <Outlet />
            </adminOptions.Provider>
          }>
            <Route path="/admin" element={
              <Admin />
            } />
            <Route path="*" element={<Navigate to="/admin" />} />
          </Route>

        ) : isAuthenticated ? (

          <Route
            element={
              <cartOptions.Provider
                value={{
                  addItem,
                  removeItem,
                  cartArr,
                  setArr,
                  setArrProduct,
                  isAuthenticated,
                  setIsAuthenticated,
                  fetchProducts,
                  product,
                }}
              >
                <Header setArrProduct={setArrProduct} product={product} />
                <Outlet />
              </cartOptions.Provider>
            }
          >
            <Route path="/" element={<Home arrProducts={product} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/personalArea" element={<PersonalArea />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>

        ) : (
          <>
            <Route
              path="/"
              element={<LendingPage setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;