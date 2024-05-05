import React from "react";
import axios from "axios";
import {
  Link,
  useNavigate
} from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  function login() {
    const data = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
    };
    
    axios.post('http://localhost:3000/api/login', data).then(res => {
        console.log(res);
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        if (res && res.data && res.data.success) {
            const token = res.data.token;
            localStorage.setItem('jwt', token);
            //getDashboard();
            //navigate("/dashboard");
        } else {
          console.log("invalid");
        }
    });
}
  return (
    <div>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.6.7/axios.min.js"
        integrity="sha512-NQfB/bDaB8kaSXF8E77JjhHG5PM6XVRxvHzkZiwl3ddWCEPBa23T76MuWSwAJdMGJnmQqM0VeY9kFszsrBEFrQ=="
        crossOrigin="anonymous" referrerPolicy="no-referrer">
      </script>

      <h1 id="login-header">Log In</h1>
      <p>Log in to see your personal budget dashboard page!</p>

      <div>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username"></input>
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input type="text" id="password" name="password"></input>
      </div>

      {/* <Link to="/home" className="button" onClick={login}>Log In</Link> */}
      <button onClick={login}>Login</button>
      <Link to="/signup" className="button">Sign Up</Link>
    </div>
  );
}

export default LoginPage;
