import React, { useEffect, useState } from "react";
import axios from "axios";
import Menu from "../Menu/Menu";

import { Link, useNavigate } from "react-router-dom";

function AddItemPage() {
  const navigate = useNavigate();

  //TODO: input validation!!!!!!!!!!!
  function add() {
    const token = localStorage.getItem("jwt");

    axios.get("http://localhost:3000/api/verify", {
      headers: {Authorization: `Bearer ${token}`,},
    }).then(function(res) {
      console.log(res);
      console.log(res.status);
      console.log(res.data);
      console.log(res.data.content);

      if(res.status === 200) {
        const data = {
          title: document.getElementById("label").value,
          budget: parseInt(document.getElementById("budget").value),
          color: document.getElementById("color").value,
          user: res.data.content
        };
    
        axios.post("http://localhost:3000/api/newdoc", data).then((res) => {
          console.log(res);

          document.getElementById("label").value = "";
          document.getElementById("budget").value = "";
          document.getElementById("color").value = "";
    
          if (res && res.data && res.data.success) {
            navigate("/dashboard");
          } else {
            console.log("invalid");
          }
        });

        //navigate("/dashboard");
      } else {
        localStorage.removeItem("jwt");
        navigate("/");
      }
      
    }).catch((err) => {
        console.log(err);
    });
  }

  return (
    <div>
      <h2>Add an Item to Your Personal Budget</h2>

      <div>
        <label htmlFor="label">Label</label>
        <input type="text" id="label" name="label"></input>
      </div>

      <div>
        <label htmlFor="budget">Budget Amount</label>
        <input type="text" id="budget" name="budget"></input>
      </div>

      <div>
        <label htmlFor="color">Item Color</label>
        <input type="text" id="color" name="color"></input>
      </div>

      <button onClick={add}>Add</button>
    </div>
  );
}

export default AddItemPage;
