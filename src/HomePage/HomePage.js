import React from "react";
import {
  Link
} from "react-router-dom";

function HomePage() {
  //console.log("I've been rendered!");
  return (
    <div>
      <h1>Welcome to Personal Budget App!</h1>
      <p>Log in to see your personal budget dashboard page</p>

      <Link to="/login">Log in</Link>
      <Link to="/signup">Create Account</Link>
    </div>
  );
}

export default HomePage;