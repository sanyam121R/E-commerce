import React, { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
// import { ShoppingContextProvider } from '../context/Store';
import { useDispatch, useSelector } from 'react-redux';

import Home from './Home';
import Navbar from './Navbar';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Missing from './Missing';
import Cart from './Cart/Cart';
import About from './About';
import Contact from './Contact';
import Footer from './Footer';
import SelectedProduct from './SelectedProduct';
import SelectedCategory from './SelectedCategory';
import Category from './Category';
import Profile from './Profile';
import userSlice from '../redux/Slices/userSlice';
import Orders from './Orders';

const PrivateRoute = ()=>{
  const auth = useSelector((state)=>state.auth.userLoaded);
  return auth ? <Outlet/> : <Navigate to="/login" />;
}

const Layout = () => {
  const auth = useSelector((state)=>state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if(auth.userLoaded){
      dispatch(userSlice);
    }
  }, [auth.userLoaded]);
  
  
  return (
    <div className='flex flex-col g-10'>
        {/* <ShoppingContextProvider> */}
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route element={<PrivateRoute />}>
                <Route exact path='/' element={<Home/>} />
                <Route path='/user/profile' element={<Profile/>} />
                <Route path='/about' element={<About/>} />
                <Route path='/contact' element={<Contact/>} />
                <Route path='/cart' element={<Cart/>} />
                <Route path='/category' element={<Category/>}/>
                <Route path='/category/:categoryId' element={<SelectedCategory/>} />
                <Route path='/product/:productId' element={<SelectedProduct/>}/>
                <Route path='/orders' element={<Orders/>}/>
              </Route>

              <Route path='/*' element={<Missing/>}/>
              <Route path='/login' element={<Login/>} />
              <Route path='/register' element={<Register/>} />
            </Routes>
            <Footer/>
          </BrowserRouter>
        {/* </ShoppingContextProvider> */}
    </div>
  )
}
{/*
  done
  SelectedCategory
  Category
  Profile
  Home
  

                  <Route exact path='/' element={<PrivateRoute><Home/></PrivateRoute>} />
                <Route path='/user/profile' element={<PrivateRoute><Profile/></PrivateRoute>} />
                <Route path='/about' element={<PrivateRoute><About/></PrivateRoute>} />
                <Route path='/contact' element={<PrivateRoute><Contact/></PrivateRoute>} />
                <Route path='/cart' element={<PrivateRoute><Cart/></PrivateRoute>} />
                <Route path='/category' element={<PrivateRoute><Category/></PrivateRoute>}/>
                <Route path='/category/:categoryId' element={<PrivateRoute><SelectedCategory/></PrivateRoute>} />
                <Route path='/product/:productId' element={<PrivateRoute><SelectedProduct/></PrivateRoute>}/>




*/}

export default Layout