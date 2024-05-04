import React from "react";
import {
  Link
} from "react-router-dom";

function SignupPage() {
  return (
    <div>
      <h2>Welcome to Personal Budget App, Create Your Account Here</h2>

      <div>
        <label for="Name">Name</label>
        <input type="text" id="name" name="name"></input>
      </div>

      <div>
        <label for="username">Username</label>
        <input type="text" id="username" name="username"></input>
      </div>

      <div>
        <label for="password">Password</label>
        <input type="text" id="password" name="password"></input>
      </div>

      <Link to="/home">Create Account</Link>
      <Link to="/">Return</Link>
    </div>
  );
}

export default SignupPage;