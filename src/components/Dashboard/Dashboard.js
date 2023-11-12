import React, { useContext, useEffect, useState } from "react";
import Tabled from "./Table/Tabled";
import Chart from "chart.js/auto";
import { Line, Pie } from "react-chartjs-2";
import "./Dashboard.css";
import { ExpenseContext } from "../../context/ExpenseContext";
import AnimatedPage from "../AnimatedPage";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
  const notify = (message) => {
    toast.error(message);
  };
  // Retrieve expenses and getExpenses function from the context
  const context = useContext(ExpenseContext);
  const { expenses, getExpenses, categoryPercentage, jwt } = context;
  const navigate = useNavigate();
  // Fetch daily expenses data on component mount
  useEffect(() => {
    if(jwt){
      getExpenses("daily");
    }
    else{
      navigate("/")
      notify("Please login first")
    }
  }, []);
  // State to manage chart labels and data
  const [labels, setLabels] = useState([]);
  const [pieLabels, setPieLabels] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [presentData, setPresentData] = useState([]);
  const [expenseType, setExpenseType] = useState("Daily");

  // Update chart data when expenses change
  useEffect(() => {
    if (expenses.length > 0) {
      const updatedLabels = expenses.map((expense) => expense.label);
      setLabels(updatedLabels.reverse());
      const updatedData = expenses.map((expense) => expense.amount);
      setPresentData(updatedData.reverse());
      setPieLabels(Object.keys(categoryPercentage));
      setPieData(Object.values(categoryPercentage));
    }
  }, [expenses]);
  const handleChange = (e) => {
    getExpenses(e.target.value.toLowerCase());
    setExpenseType(e.target.value);
  };

  // Data for the Line chart
  const data = {
    labels: labels,
    datasets: [
      {
        label: `${expenseType} Expenses`,
        backgroundColor: "blue",
        borderColor: "rgb(0,0,255)",
        data: presentData,
      },
    ],
  };
  // Data for the Pie chart
  const pieChartData = {
    labels: Object.keys(categoryPercentage),
    datasets: [
      {
        data: Object.values(categoryPercentage),
        backgroundColor: [
          "#952323",
          "#164863",
          "#445D48",
          "#E55604",
          "#5B0888", // You can customize colors as needed
        ],
      },
    ],
  };
  // Options for pie chart
  const options = {
    plugins: {
      legend: {
        position: "right",
        rtl: true,
        labels: {
          usepointstyle: true,
          pointstyle: "circle",
          padding: 20,
        },
      },
    },
  };
  return (
    <AnimatedPage>
      <div className="dashboard">
        <p className="dataSelection">
          Show Data:
          <select name="datafor" id="datafor" onChange={handleChange}>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </p>
        <div className="summary">
          <h2>Your Expenses:</h2>
          <div className="main-data">
            <div className="left-data">
              <Line data={data}></Line>
            </div>
            <div className="right-data">
              <Tabled labels={labels} presentData={presentData}></Tabled>
            </div>
          </div>
        </div>
        <div className="summary">
          <h2>Expenses Breakdown:</h2>
          <div className="main-data">
            {expenseType === "yearly" ? (
              <p>Pie chart is unsupported for yearly data currently</p>
            ) : (
              <>
                <div className="left-data pie">
                  <Pie data={pieChartData} options={options}></Pie>
                </div>
                <div className="right-data">
                  <Tabled labels={pieLabels} presentData={pieData}></Tabled>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Dashboard;
