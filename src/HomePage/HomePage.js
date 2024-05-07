import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function HomePage() {
  const navigate = useNavigate();

  function nav() {
    if(localStorage.getItem("jwt")){
      refresh();
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
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
    <main id="homepageContainer" className="container">
      <section id="homepage-header" role="banner">
        <h1>Welcome to Personal Budget App!</h1>
        <p>Your ticket to more savings</p>
      </section>

      <section id="homepage-content">
        <article id="homepage-info">
          <h4>Do you know where you are spending your money? If you really stop to
            track it down, you would get surprised! Proper budget management
            depends on real data... and this app will help you with that!</h4>
        </article>

        <article id="homepage-links">
          <h4>Click below to go to your personal dashboard page.</h4>
          <p>New to the app? Sign up today!</p>
          <button onClick={nav} aria-label={"Link to Dashboard page"}>Go to Dashboard</button>
          <Link to="/signup" className="button" aria-label={"Link to Signup page"}>Create Account</Link>
        </article>
      </section>
      <ToastContainer />
    </main>
  );
}

export default HomePage;
