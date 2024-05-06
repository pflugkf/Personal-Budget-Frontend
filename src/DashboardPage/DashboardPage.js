import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Menu from "../Menu/Menu";

import { Chart } from "chart.js/auto";
import { Pie, Bar } from "react-chartjs-2";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DashboardPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");
  var tokenCheckTimer;

  const [budgetData, setData] = useState({ datasets: [] });
  const [budgetItemCount, setCount] = useState(0);
  const [budgetMax, setMax] = useState("");
  const [budgetAvg, setAverage] = useState(0);
  const [budgetTotal, setTotal] = useState(0);

  useEffect(() => {
    let data = [];
    let labels = [];
    let colors = [];

    axios
      .get("http://localhost:3000/api/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (res) {
        const jsonData = res.data.myContent.myBudget;

        //console.log(jsonData);

        for (var i = 0; i < jsonData.length; i++) {
          labels.push(jsonData[i].title);
          data.push(jsonData[i].budget);
          colors.push(jsonData[i].color);
        }

        //console.log(labels);
        //console.log(colors);
        //console.log(data);

        setData({
          datasets: [
            {
              data: data,
              backgroundColor: colors,
            },
          ],
          labels: labels,
        });

        var maxBudgetVal = Math.max.apply(null, data);
        var maxBudgetIndex = 0;
        var maxBudgetLabel = "";

        var sum = 0;
        for (let i = 0; i < data.length; i++) {
          sum += data[i];

          if (data[i] === maxBudgetVal) {
            maxBudgetIndex = i;
          }
        }

        maxBudgetLabel = labels[maxBudgetIndex];

        setCount(data.length);

        if (data.length > 0) {
          setMax(maxBudgetLabel + ", " + maxBudgetVal);
          setAverage(sum / (data.length - 1));
        } else {
          setMax("None");
          setAverage(0);
        }

        setTotal(sum);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.err, {
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
  }, []);

  /* function tokenHandler() {
    console.log("checking");
    
    if (tokenCheck(token)) {
      console.log("token expired, logging out");
      clearInterval(tokenCheckTimer);
      localStorage.removeItem("jwt");
      navigate("/");
    }
  }

  function tokenCheck(token) {
    var warningGiven = false;

    if (token) {
      const tokenData = JSON.parse(atob(token.split(".")[1]));
      const expireTime = tokenData.exp * 1000;
      const currentTime = Date.now();
      console.log("expireTime: " + expireTime);
      console.log("currentTime: " + currentTime);
      if((expireTime - currentTime) <= 20000 && !warningGiven) {
        console.log("20 second warning here");
        toast.warn('20 seconds until logout', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
          });
          warningGiven = true;
      }
      return currentTime > expireTime;
    } else {
      return true;
    }
  }

  if(token) {
    tokenCheckTimer = setInterval(tokenHandler, 5000);
  } else {
    clearInterval(tokenCheckTimer);
  } */
  

  return (
    <main id="dashboardContainer" className="container">
      <Menu />
      <section id="dashboard-header">
        <h1>[username]'s Budget Dashboard</h1>
      </section>

      <section id="dashboard-content">
        <Link
          to="/add"
          className="button"
          aria-label={"Link to add budget item"}
        >
          Add Item to Budget
        </Link>
        <article id="pieContainer">
          {/* visualization 1: pie chart */}
          <div>
            <Pie
              // type='pie'
              data={budgetData}
            />
          </div>
        </article>

        <article>
          {/* visualization 2: table */}
          <div>
            <table id="budgetTable">
              <thead>
                <tr>
                  <th colSpan={2}>Personal Budget Statistics</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="statHeader">Budget Items</td>
                  <td>{budgetItemCount}</td>
                </tr>
                <tr>
                  <td className="statHeader">Highest Budget Item</td>
                  <td>{budgetMax}</td>
                </tr>
                <tr>
                  <td className="statHeader">Average Budget Amount</td>
                  <td>{budgetAvg}</td>
                </tr>
                <tr>
                  <td className="statHeader">Total Budget</td>
                  <td>{budgetTotal}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>

        <article>
          {/* visualization 3: bar chart */}
          <div id="barContainer">
            <Bar
              data={budgetData}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "Your Budget, Visualized",
                  },
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          </div>
        </article>
      </section>

      <ToastContainer />
    </main>
  );
}

export default DashboardPage;
