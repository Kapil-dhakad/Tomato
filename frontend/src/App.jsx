import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Verify from './pages/verify/Verify';
import StoreContextProvider from './context/StoreContext';
import MyOrders from './pages/MyOrders/MyOrders';
import SellerRoute from './pages/seller/SellerRoute';
import Orders from './pages/seller/pages/Orders/Orders';
import List from './pages/seller/pages/List/List';
import Add from './pages/seller/pages/Add/Add';
import { url } from './pages/seller/assets/assets';
import FoodDetails from './pages/FoodDetail/FoodDetails';
import { API_URL } from "./config";

const App = () => {
      const url = "http://localhost:3000"
  
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <StoreContextProvider>
      {showLogin && (
        <LoginPopup setShowLogin={setShowLogin} setIsLoggedIn={setIsLoggedIn} />
      )}
      <div className='app'>
        <Navbar
          setShowLogin={setShowLogin}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<MyOrders />} />
          <Route path="/food/:id" element={<FoodDetails />} />
          {/* ✅ Nested admin routes */}
          <Route path='/admin' element={<SellerRoute />}>
            <Route path='add' element={<Add url={API_URL} />} />
            <Route path='list' element={<List url={API_URL} />} />
            <Route path='orders' element={<Orders url={API_URL} />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </StoreContextProvider>
  );
};

export default App;
