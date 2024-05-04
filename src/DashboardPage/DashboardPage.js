import React, { useEffect, useState } from "react";
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

        console.log(labels);
        console.log(colors);
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

        var sum = 0;
        for (var i = 0; i < data.length; i++) {
          sum += data[i];
        }

        console.log("Sum of all budget values: " + sum);
        console.log("Average: " + sum / (data.length - 1));

        setCount(data.length);

        /* setMax({

        }); */

        /* setAverage({
          
        }); */

        setTotal(sum);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main>
      <Menu />
      <section>
        <h1>[username]'s Budget Dashboard</h1>

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
            <h1>table here</h1>
            <table className="budgetTable">
              <tr>
                <td>Budget Items</td>
                <td>{budgetItemCount}</td>
              </tr>
              <tr>
                <td>Highest Budget Item</td>
                <td>14</td>
              </tr>
              <tr>
                <td>Average Budget Amount</td>
                <td>~~~~~</td>
              </tr>
              <tr>{/* TODO: bold this section */}
                <td>Total Budget</td>
                <td>{budgetTotal}</td>
              </tr>
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
