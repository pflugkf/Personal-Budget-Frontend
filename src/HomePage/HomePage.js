import React from "react";
import {
  Link
} from "react-router-dom";

import Menu from '../Menu/Menu';

function HomePage() {
  return (
    <div>
      <Menu />
      <h1>Hello, [username]</h1>
      <p>Welcome to Personal Budget App! To get started, select Dashboard in the navigation bar.</p>
    </div>
  );
}

export default HomePage;