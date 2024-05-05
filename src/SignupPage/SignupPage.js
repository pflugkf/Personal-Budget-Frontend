import React from "react";
import axios from "axios";
import {
  Link,
  useNavigate
} from "react-router-dom";

function SignupPage() {
  const navigate = useNavigate();

  function createAccount() {
    const data = {
      name: document.getElementById('name').value,
      username: document.getElementById('username').value,
      password: document.getElementById('password').value,
    };

    axios.post('http://localhost:3000/api/signup', data).then(res => {
        console.log(res);
        document.getElementById('name').value = '';
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        if (res && res.data && res.data.success) {
            const token = res.data.token;
            localStorage.setItem('jwt', token);
            navigate("/dashboard");
        } else {
          console.log("invalid");
        }
    });
  }

  return (
    <div>
      <h2>Welcome to Personal Budget App, Create Your Account Here</h2>

      <div>
        <label htmlFor="Name">Name</label>
        <input type="text" id="name" name="name"></input>
      </div>

      <div>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username"></input>
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input type="text" id="password" name="password"></input>
      </div>

      {/* <Link to="/dashboard">Create Account</Link> */}
      <button onClick={createAccount}>Create Account</button>
      <Link to="/" className="button">Return</Link>
    </div>
  );
}

export default SignupPage;