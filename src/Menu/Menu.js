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
      <nav>
        <ul>
          <li>
            <Link to="/home" /* aria-label="Link to About page" */>Home</Link>
          </li>
          <li>
            <Link to="/dashboard" /* aria-label="Link to About page" */>Dashboard</Link>
          </li>
          <li>
            <button onClick={logOut}>Logout</button>
            {/* <Link to="/">Logout</Link> */}
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Menu;
