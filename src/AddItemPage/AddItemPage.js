import React, { useEffect, useState } from "react";
import axios from "axios";
import Menu from "../Menu/Menu";

import { Link, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { HexColorPicker, HexColorInput } from "react-colorful";

function AddItemPage() {
  const navigate = useNavigate();
  const [color, setColor] = useState("#ffffff");

  function add() {
    refresh();
    const token = localStorage.getItem("jwt");

    axios
      .get("https://lionfish-app-x87ad.ondigitalocean.app/api/verify", {
        headers: { Authorization: `Bearer ${token}` },
        'Content-Encoding': 'gzip'
      })
      .then(function (res) {
        if (res.status === 200) {
          var colorHex = "#" + document.getElementById("color").value;
          
          const data = {
            title: document.getElementById("label").value,
            budget: parseInt(document.getElementById("budget").value),
            color: colorHex,
            user: res.data.content,
          };

          if (data.title === "" || data.budget === "" || data.color === "") {
            toast.error("Please fill out all fields", {
              position: "top-center",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else {
            axios
              .post("https://lionfish-app-x87ad.ondigitalocean.app/api/newdoc", data, {
                'Content-Encoding': 'gzip'
              }).then((res) => {
                console.log(res);

                document.getElementById("label").value = "";
                document.getElementById("budget").value = "";
                document.getElementById("color").value = "";

                if (res && res.data && res.data.success) {
                  navigate("/dashboard");
                } else {
                  console.log("invalid");
                }
              })
              .catch((error) => {
                console.log(error.response);

                toast.error(error.response.data.err, {
                  position: "top-center",
                  autoClose: 4000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              });
          }
        } else {
          localStorage.removeItem("jwt");
          navigate("/");
        }
      });
  }

  function refresh() {
    const refreshToken = localStorage.getItem("refresher");

    const data = {
      refresh: refreshToken,
      currentToken: localStorage.getItem("jwt"),
    };

    axios.post("https://lionfish-app-x87ad.ondigitalocean.app/api/refresh", data, {
        'Content-Encoding': 'gzip'
      }).then((res) => {
        console.log(res);

        if (res && res.data && res.data.success) {
          const newToken = res.data.token;
          localStorage.removeItem("jwt");
          localStorage.setItem("jwt", newToken);

        } else {
          console.log("invalid");
        }
      }).catch((error) => {
            console.log(error.response);

            toast.error(error.response.data.err, {
              position: "top-center",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
      });
  }

  return (
    <main id="addItemContainer" className="container">
      <Menu />
      <section id="addItem-header" role="banner">
        <h2>Add an Item to Your Personal Budget</h2>
      </section>

      <section id="addItem-input">
        <article id="addItem-input-title">
          <label htmlFor="label">Budget Item: </label>
          <input type="text" id="label" name="label"></input>
        </article>

        <article id="addItem-input-budget">
          <label htmlFor="budget">Budget Amount: </label>
          <input type="number" id="budget" name="budget" min={1}></input>
        </article>

        <article id="addItem-input-color">
          <label htmlFor="color">Item Color: </label>
          <HexColorInput color={color} onChange={setColor} id="color"/>
          <HexColorPicker color={color} onChange={setColor} id="colorpicker"/>
        </article>
      </section>

      <section id="addItem-buttons">
        <button onClick={add} aria-label={"Button to add budget item"}>Add</button>
        <Link to="/dashboard" className="button" aria-label={"Link to return to Dashboard page"}>
          Back
        </Link>
      </section>

      <ToastContainer />
    </main>
  );
}

export default AddItemPage;
