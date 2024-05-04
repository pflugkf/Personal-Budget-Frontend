import React from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

class Auth {
  login(data) {
    return axios.post('http://localhost:3000/api/login', data).then(res => {
        const token = res.data.token;

        if(res.data.success && token){
            localStorage.setItem('jwt', token);//JSON.stringify(res.data);?
        }

        return(res.data);
    });
  }

  signup(name, username, password) {
    return axios.post();
  }

  logout() {
    localStorage.removeItem("jwt");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("jwt"));
  }
}

export default Auth;
