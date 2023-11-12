import React, { useContext, useState } from "react";
import "./Home.css";
import AnimatedPage from "../AnimatedPage";
import { Link } from "react-router-dom";
import { ExpenseContext } from "../../context/ExpenseContext";

const Home = () => {
  const context = useContext(ExpenseContext);
  const [viewFeature, setViewFeature] = useState("expense-breakdown");
  const { jwt } = context;
  const featureInfo = [
    [
      "Breakdown Your Expenses:",
      "Expense-tracker application is designed with interactive dashbaord using line chart which will help you to better break your expense data and know about your expense Trend. Moreover, our dashboard also has filtering options to help you view data in Daily, Weekly, Monthly or Yearly basis",
      "Expense-tracker dynamically loads and processes your data based on very less input data i.e, just your expense name, amount, date and category and our application is smart enough to give maximum insights using these minimum inputs.",
    ],
    [
      "Expese Categories:",
      "Expense-tracker application is designed with a pie chart also which provides the ability to to better break your expense data according to categories and know about your expense Trend. Moreover, our dashboard also has filtering options to help you view data in Daily, Weekly, Monthly or Yearly basis",
      "Expense-tracker dynamically loads and processes your data based on very less input data i.e, just your expense name, amount, date and category and our application is smart enough to give maximum insights using these minimum inputs.",
    ],
  ];
  return (
    <AnimatedPage>
      <div className="intro">
        <h1>
          Expense-Tracker by <span className="purple">KaranBhangu</span>
        </h1>
        <h1>Take Control of Your Finances.</h1>
        <div className="btns">
          {jwt ? (
            <Link to="/dashboard">Dashboard</Link>
          ) : (
            <Link to="/register">Signup</Link>
          )}
          <Link to="/about">Learn More &gt;</Link>
        </div>
      </div>
      <div className="features">
        <div className="feature-box">
          <div className="icon-part">
            <i className="fa-solid fa-shield-halved fa-3x"></i>{" "}
          </div>
          <div className="feature-part">
            <h3>Secure</h3>
            <p>
              Expense-tracker is a completely secure application which uses up
              to date and best measure to keep all of your data safe.
            </p>
          </div>
        </div>
        <div className="feature-box">
          <div className="icon-part">
            <i className="fa-solid fa-chart-line fa-3x"></i>
          </div>
          <div className="feature-part">
            <h3>Dashboards</h3>
            <p>
              Expense-tracker provides simple and interactive dashboard for
              better analysis of your expenses data which helps to manage them
              efficiently.
            </p>
          </div>
        </div>
        <div className="feature-box">
          <div className="icon-part">
            <i className="fa-solid fa-truck-fast fa-3x"></i>
          </div>
          <div className="feature-part">
            <h3>Fast</h3>
            <p>
              Expense-tracker is a fast and reliable app to fetch your expenses
              anytime because of the latest technologies used to build this
              project.
            </p>
          </div>
        </div>
      </div>
      <h3
        style={{
          textAlign: "center",
          marginTop: "80px",
          color: "rgba(0,0,0,0.7)",
        }}
      >
        Reviews by Users
      </h3>
      <h2 className="feature">Testimonials:</h2>

      <div className="testimonials">
        <div className="testimonial">
          <div className="quotes">
            <i className="fa-solid fa-quote-left fa-5x"></i>
          </div>
          <div className="main-review">
            <h2 className="name">Marthur Lew</h2>
            <p className="occupation">Placeholder Testimonial</p>
            <p className="review">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam,
              exercitationem iusto odit quis, tempora vitae modi quo ipsum sint
              assumenda, blanditiis impedit sapiente. Lorem ipsum dolor sit
              amet.
            </p>
          </div>
        </div>
        <div className="testimonial">
          <div className="quotes">
            <i className="fa-solid fa-quote-left fa-5x"></i>
          </div>
          <div className="main-review">
            <h2 className="name">William Shew</h2>
            <p className="occupation">Placeholder Testimonial</p>
            <p className="review">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
              veritatis porro rerum! Dignissimos, accusantium adipisci sequi vel
              accusamus nemo, ut expedita qui nostrum numquam quasi!
            </p>
          </div>
        </div>
      </div>
      <div className="summary">
        <h3
          style={{
            textAlign: "center",
            marginTop: "0px",
            color: "rgba(0,0,0,0.7)",
          }}
        >
          Control Over Expenses
        </h3>

        <h2 style={{ textAlign: "center", fontSize: "2.5rem" }}>
          Better Breakdown:
        </h2>
        <div className="feature-buttons">
          <button
            className={
              viewFeature === "expense-breakdown" ? "feature-active" : ""
            }
            onClick={() => {
              setViewFeature("expense-breakdown");
            }}
          >
            Expense Breakdown
          </button>
          <button
            className={
              viewFeature === "category-breakdown" ? "feature-active" : ""
            }
            onClick={() => {
              setViewFeature("category-breakdown");
            }}
          >
            Category Breakdown
          </button>
        </div>
        <div className="feature-explanation">
          <div className="main-data">
            <div className="forFeatures-left">
              <img
                src={
                  viewFeature === "expense-breakdown"
                    ? "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBpZSUyMGNoYXJ0fGVufDB8fDB8fHww"
                    : "https://images.pexels.com/photos/7580843/pexels-photo-7580843.jpeg?auto=compress&cs=tinysrgb&w=600"
                }
                alt=""
              />
            </div>
            <div className="forFeatures-right">
              <h2>
                {viewFeature === "expense-breakdown"
                  ? featureInfo[0][0]
                  : featureInfo[1][0]}
              </h2>
              <p>
                {viewFeature === "expense-breakdown"
                  ? featureInfo[0][1]
                  : featureInfo[1][1]}
              </p>
              <br className="desktop-only" />
              <p className="desktop-only">{featureInfo[0][2]}</p>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <p>
          ©KaranBhangu 2023-2024{" "} -
          <a href="https://github.com/karanbhangu" target="_blank" rel="noreferrer">My Github</a>
        </p>
      </footer>
    </AnimatedPage>
  );
};

export default Home;
