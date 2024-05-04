import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import LoginPage from './LoginPage/LoginPage';
import SignupPage from './SignupPage/SignupPage';
import HomePage from './HomePage/HomePage';
import DashboardPage from './DashboardPage/DashboardPage';
import Footer from './Footer/Footer';

function App() {
  //setInterval(test, 1000);
  function test() {
    //console.log("I'm the app");
    //TODO: test/validate jwt expiration time here????
  }
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
      <Footer />
    </Router>

  );
}

export default App;
