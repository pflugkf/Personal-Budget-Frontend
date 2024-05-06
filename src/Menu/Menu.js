import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Menu() {
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("jwt");
    navigate("/");
  }

  return (
    <div>
      <nav id="nav-bar" className="container">
        <Link to="/" className="nav-link" aria-label={"Link to Home page"}>Home</Link>
        <Link to="/dashboard" className="nav-link" aria-label={"Link to Dashboard"}>Dashboard</Link>
        <Link to="/" className="nav-link" onClick={logOut} aria-label={"Link to Log Out of Account"}>Logout</Link>
      </nav>
    </div>
  );
}

export default Menu;
