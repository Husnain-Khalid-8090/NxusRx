import React,{ useContext }  from "react";
import { Routes, Route, Outlet, Navigate,BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from "../shared/components/layout/container";


import VerifyEmail from "../pages/verifyEmail";
import ConfirmEmail from "../pages/confirmEmail";
import ForgetPassword from "../pages/forgetPassword";
import ResetPassword from "../pages/resetPassword";
import { AuthContext } from '../context/authContext';
import Pages from '../pages'
import Signup from "../pages/Signup";
import Signin from '../pages/Signin'
import VerifyOtp from "../pages/verifyOtp";
import NexusLanding from "../modules/nexusLandingPage";
import VerifyDocument from "../pages/verifyDocument";
import Profile from "../modules/adminDashboard/profileSettings";
import PrivateRoutes from "../shared/components/Auth/PrivateRoutes";
import Products from "../pages/product";
import AddProduct from '../pages/product/AddProduct'
/**
 * Application main router component
 *
 * contains all the available routes and components in the application
 */





const Router  =  () => {

    
    return (

    <Routes>
        <Route element={<Layout><AddProduct/></Layout>}path="/dash/addProduct" exact/>
      <Route element={<PrivateRoutes/>}>
        <Route  element={<Layout><Products/></Layout>} path="/dash/products"exact />
        <Route element={<Layout><Profile/></Layout>}path="/dash/profile" exact/>

        </Route>
    <Route exact path="/login" element={<Signin/>}/>
    <Route exact path="/verifyDocument"element={<VerifyDocument/>}/>
        <Route exact path="/verifyDocument/:id"element={<VerifyDocument/>}/>
    <Route exact path="/signup" element={<Signup/>}/>
    <Route exact path="/verifyOtp" element={<VerifyOtp/>}/>
    <Route exact path="/forgetpassword" element={<ForgetPassword/>}/>
    <Route exact path="/verify/:id/:uniqueString" element={<ConfirmEmail/>}/>
    <Route exact path="/verify" element={<VerifyEmail/>}/>
    <Route exact path='/resetPassword/:id' element={<ResetPassword/>}/>


    <Route exact path="/" element={<NexusLanding/>} />
      
      
        </Routes>

    );
  };



export default Router;





