import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoginPage from './LoginPage/LoginPage';
import SignupPage from './SignupPage/SignupPage';
import HomePage from './HomePage/HomePage';
import DashboardPage from './DashboardPage/DashboardPage';
import AddItemPage from './AddItemPage/AddItemPage';
import Footer from './Footer/Footer';

function App() {
  var token = localStorage.getItem("token");
  //console.log(window.location.pathname);
  //var timeCheck = setInterval(test, 1000);
  var time = 0;
  function test() {
    time += 1000;
    console.log(window.location.pathname);
    //TODO: test/validate jwt expiration time here????
    if(time >= 10000) {
      //clearInterval(timeCheck);

      toast.info('Token expired', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
        });

        window.location = "/";
    }
  }
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/add" element={<AddItemPage />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </Router>
    

  );
}

export default App;
