import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Menu() {
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("jwt");
    //navigate("/");
  }

  function refresh() {
    const refreshToken = localStorage.getItem("refresher");

    const data = {
      refresh: refreshToken,
      currentToken: localStorage.getItem("jwt"),
    };

    axios.post("https://lionfish-app-x87ad.ondigitalocean.app/api/refresh", data, {
        'Content-Encoding': 'gzip'
      }).then((res) => {
        console.log(res);

        if (res && res.data && res.data.success) {
          const newToken = res.data.token;
          localStorage.removeItem("jwt");
          localStorage.setItem("jwt", newToken);

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

  return (
    <main role="navigation">
      <nav id="nav-bar" className="container">
        <Link to="/" className="nav-link" onClick={refresh} aria-label={"Link to Home page"}>Home</Link>
        <Link to="/dashboard" className="nav-link" onClick={refresh} aria-label={"Link to Dashboard"}>Dashboard</Link>
        <Link to="/" className="nav-link" onClick={logOut} aria-label={"Link to Log Out of Account"}>Logout</Link>
      </nav>
    </main>
  );
}

export default Menu;
