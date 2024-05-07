import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignupPage() {
  const navigate = useNavigate();
  var tokenCheckTimer;

  function createAccount() {
    const data = {
      name: document.getElementById("name").value,
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    };

    if (data.name === "" || data.username === "" || data.password === "") {
      toast.error("Please fill out all fields", {
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
      axios
        .post("https://lionfish-app-x87ad.ondigitalocean.app/api/signup", data, {
          'Content-Encoding': 'gzip'
        })
        .then((res) => {
          console.log(res);
          document.getElementById("name").value = "";
          document.getElementById("username").value = "";
          document.getElementById("password").value = "";
          if (res && res.data && res.data.success) {
            const token = res.data.token;
            localStorage.setItem("jwt", token);
            navigate("/dashboard");

            tokenCheckTimer = setInterval(tokenHandler, 5000);
          } else {
            console.log("invalid");
          }
        })
        .catch((error) => {
          console.log(error);
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
    const token = localStorage.getItem("jwt");
    if (token) {
      const tokenData = JSON.parse(atob(token.split(".")[1]));
      const expireTime = tokenData.exp * 1000;
      const currentTime = Date.now();
      console.log("Time remaining: " + (expireTime - currentTime));
      if (expireTime - currentTime <= 20000 && warningGiven === false) {
        console.log("20 second logout warning");
        toast.warn("20 seconds until logout", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        warningGiven = true;
      }
      return currentTime > expireTime;
    } else {
      return true;
    }
  }

  return (
    <main id="signuppageContainer" className="container">
      <section id="signup-header">
        <h2>Welcome to Personal Budget App, Create Your Account Here</h2>
      </section>

      <section id="signup-input">
        <article id="signup-input-name">
          <label htmlFor="Name">Name: </label>
          <input type="text" id="name" name="name"></input>
        </article>

        <article id="signup-input-user">
          <label htmlFor="username">Username: </label>
          <input type="text" id="username" name="username"></input>
        </article>

        <article id="signup-input-pass">
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" name="password"></input>
        </article>
      </section>

      <section id="signup-buttons">
        <button
          onClick={createAccount}
          aria-label={"Button to create account and enter Dashboard page"}
        >
          Create Account
        </button>
        <Link
          to="/"
          className="button"
          aria-label={"Button to return to Home page"}
        >
          Return
        </Link>
      </section>

      <ToastContainer />
    </main>
  );
}

export default SignupPage;
