import React from "react";
import {
  Link
} from "react-router-dom";

function HomePage() {
  //console.log("I've been rendered!");
  return (
    <main className="homepageContainer">
      <h1 id="homepage-header">Welcome to Personal Budget App!</h1>
      <p>Log in to see your personal budget dashboard page</p>

      <Link to="/login" className="button">Log in</Link>
      <Link to="/signup" className="button">Create Account</Link>
    </main>
  );
}

export default HomePage;