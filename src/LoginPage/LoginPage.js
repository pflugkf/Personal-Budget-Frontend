import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginPage() {
  const navigate = useNavigate();
  var tokenCheckTimer;

  function login() {
    const data = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    };

    if (data.username === "" || data.password === "") {

      toast.error('Please fill out all fields', {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

    } else {
      axios.post("https://lionfish-app-x87ad.ondigitalocean.app/api/login", data, {
        'Content-Encoding': 'gzip'
      }).then((res) => {
        console.log(res);
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        if (res && res.data && res.data.success) {
          const userToken = res.data.token;
          const refreshToken = res.data.refresh;
          localStorage.setItem("jwt", userToken);
          localStorage.setItem("refresher", refreshToken);
          
          navigate("/dashboard");
          
          tokenCheckTimer = setInterval(tokenHandler, 5000);

        } else {
          console.log("invalid");
        }
      }).catch((error) => {
            console.log(error.response);

            toast.error(error.response.data.err, {
              position: "top-center",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
      });
    }
  }

  function tokenHandler() {
    console.log("checking");

    if (tokenCheck()) {
      console.log("token expired, logging out");
      clearInterval(tokenCheckTimer);
      localStorage.removeItem("jwt");
      navigate("/");
    }
  }

  var warningGiven = false;
  function tokenCheck() {
    const token = localStorage.getItem('jwt');
    if (token) {
      const tokenData = JSON.parse(atob(token.split(".")[1]));
      const expireTime = tokenData.exp * 1000;
      const currentTime = Date.now();
      if((expireTime - currentTime) <= 20000 && warningGiven === false) {
        toast.warn('20 seconds until logout', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
          });
          warningGiven = true;
      }
      return currentTime > expireTime;
    } else {
      clearInterval(tokenCheckTimer);
    }
  }

  return (
    <main id="loginpageContainer" className="container">
      <section id="login-header" role="banner">
        <h1>Log In</h1>
        <p>Log in to see your personal budget dashboard page!</p>
      </section>

      <section id="login-input">
        <article id="login-input-user">
          <label htmlFor="username">Username: </label>
          <input type="text" id="username" name="username"></input>
        </article>

        <article id="login-input-pass">
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" name="password"></input>
        </article>
      </section>

      <section id="login-buttons">
        <button onClick={login} aria-label={"Button to log in and enter Dashboard page"}>Login</button>
        <Link to="/signup" className="button" aria-label={"Link to Signup page"}>Sign Up</Link>
      </section>

      <ToastContainer />
    </main>
  );
}

export default LoginPage;
