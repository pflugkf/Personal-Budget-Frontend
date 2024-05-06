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

  const [budgetData, setData] = useState({ datasets: [] });
  const [budgetItemCount, setCount] = useState(0);
  const [budgetMax, setMax] = useState("");
  const [budgetAvg, setAverage] = useState(0);
  const [budgetTotal, setTotal] = useState(0);
  const [expense, setExpense] = useState(0);

  function calculate() {
    var income = document.getElementById("income").value;
    setExpense(income-budgetTotal);
  }

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
        const tokenData = JSON.parse(atob(token.split(".")[1]));
        console.log(tokenData);
        var userName = tokenData.username;
        document.getElementById("dashboard-header-text").innerHTML = userName + "'s Dashboard";

        const jsonData = res.data.myContent.myBudget;

        for (var i = 0; i < jsonData.length; i++) {
          labels.push(jsonData[i].title);
          data.push(jsonData[i].budget);
          colors.push(jsonData[i].color);
        }

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

  return (
    <main id="dashboardContainer" className="container">
      <Menu />
      <section id="dashboard-header">
        <h1 id="dashboard-header-text">[username]'s Budget Dashboard</h1>
      </section>

      <section id="dashboard-content">
        <Link
          to="/add"
          className="button"
          aria-label={"Link to add budget item"}
        >
          Add Item to Budget
        </Link>

        <article className="row">
          {/* visualization 2: table */}
          <figure>
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
          </figure>

          <article id="expense-input">
            <label htmlFor="income">Enter your income here: </label>
            <input type="number" id="income" name="income"></input>
            <button onClick={calculate}>Enter</button>
            <p>Your total earnings after expenses are: {expense}</p>
          </article>
        </article>

        <h3>Your Budget, Visualized</h3>

        <article className="row">
          {/* visualization 2: bar chart */}
          <figure id="barContainer">
            <Bar
              data={budgetData}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "Your Budget",
                  },
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          </figure>

          {/* visualization 3: pie chart */}
          <figure id="pieContainer">
            <Pie
              // type='pie'
              data={budgetData}
            />
          </figure>
        </article>

        <article></article>
      </section>

      <ToastContainer />
    </main>
  );
}

export default DashboardPage;
