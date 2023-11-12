import React from "react";
import "./About.css"; // Import your CSS file
import AnimatedPage from "../AnimatedPage";

function About() {
  return (
    <AnimatedPage>
      <div className="about-us">
        <p>"Your Money, Your Control."</p>
        <h2>Expense-tracker by <br /> <span className="purple">KaranBhangu.</span></h2>
        <h3>Welcome to our Expense Tracker Project! We are passionate about helping you gain control over your finances and achieve your financial goals. Our expense tracker is designed with a focus on providing a fast, reliable, and user-friendly solution to simplify your expense management.</h3>
        <br />
        <h3>At the heart of our project is a commitment to making expense tracking an effortless and insightful experience. We understand that managing your finances can be a daunting task, and that's why we have created a tool with several standout features to streamline the process.</h3>
        <br />
        <h3 style={{marginBottom:"10px"}}>Key Features:</h3>
        <h3>
          <ul>
            <li>Fast and reliable</li>
            <li>Cloud Storage Support</li>
            <li>Better Insights Using Graphs and Visuals</li>
            <li>Expense Tracking by Category</li>
          </ul>
        </h3>
      </div>
    </AnimatedPage>
  );
}

export default About;
