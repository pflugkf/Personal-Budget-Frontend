import React, { useEffect, useState } from "react";
import {
  Link,
  useNavigate
} from "react-router-dom";
import axios from "axios";
import Menu from "../Menu/Menu";
import { Chart } from "chart.js/auto";
import { Pie, Bar } from "react-chartjs-2";

function DashboardPage() {
  const [budgetData, setData] = useState({ datasets: [] });
  const [budgetItemCount, setCount] = useState(0);
  const [budgetMax, setMax] = useState("");
  const [budgetAvg, setAverage] = useState(0);
  const [budgetTotal, setTotal] = useState(0);

  let data = [];
  let labels = [];
  let colors = [];

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    axios
      .get("http://localhost:3000/api/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (res) {
        const jsonData = res.data.myContent.myBudget;

        console.log(jsonData);

        for (var i = 0; i < jsonData.length; i++) {
          labels.push(jsonData[i].title);
          data.push(jsonData[i].budget);
          colors.push(jsonData[i].color);
        }

        //console.log(labels);
        //console.log(colors);
        console.log(data);

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

          if(data[i] === maxBudgetVal) {
            maxBudgetIndex = i; 
          }
        }

        maxBudgetLabel = labels[maxBudgetIndex];

        //console.log("Sum of all budget values: " + sum);
        //console.log("Average: " + sum / (data.length - 1));

        setCount(data.length);

        setMax(maxBudgetLabel + ", " + maxBudgetVal);

        setAverage(sum / (data.length - 1));

        setTotal(sum);

      }).catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main>
      <Menu />
      <section>
        <h1>[username]'s Budget Dashboard</h1>

        <Link to="/add" className="button">Add Item to Budget</Link>

        <article className="pieContainer">
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
            <table className="budgetTable">
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
          {/* visualization 3: bar chart? */}
          <div className="barContainer">
            <Bar
              // type='pie'
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
    </main>
  );
}

export default DashboardPage;
