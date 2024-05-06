import React from "react";
import { Link, useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  function nav() {
    if(localStorage.getItem("jwt")){
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }

  return (
    <main id="homepageContainer" className="container">
      <section id="homepage-header">
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
          {/* <Link to="/login" className="button">Go to Dashboard</Link> */}
          <button onClick={nav} aria-label={"Link to Dashboard page"}>Go to Dashboard</button>
          <Link to="/signup" className="button" aria-label={"Link to Signup page"}>Create Account</Link>
        </article>
      </section>
      
    </main>
  );
}

export default HomePage;
