import React, { useState, useContext } from "react";
import Cookies from "js-cookie"; // Import the library
import "./User.css"; // Import your CSS file
import { useNavigate } from "react-router-dom";
import AnimatedPage from "../AnimatedPage";
import { ExpenseContext } from "../../context/ExpenseContext";
import { toast } from "react-toastify";


const Login = () => {
  const navigate = useNavigate();
  const context = useContext(ExpenseContext);
  const {setJwt} = context;
  const notify = (message) => {
    toast.success(message);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an object to send as the request body
    const loginData = {
      email: email,
      password: password,
    };

    const loginUser = await fetch(`https://expensetracker-backend-fy7b.onrender.com/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Use "Content-Type" with a capital 'C'
      },
      body: JSON.stringify(loginData), // Convert the object to JSON
    });
    if(loginUser.ok){
      const userVerify = await loginUser.json();
      const token = userVerify.token;

      // Storing jwt in token:
      Cookies.set("jwt", token, {expires: 7})
      navigate("/dashboard"); // Omit optional second argument
      setJwt(Cookies.get("jwt"))
      notify("Logged in succesfully.")
    }
    else{
      notify("Error while logging in")
    }
  };

  return (
    <AnimatedPage>
<div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-header">Login</h2>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
    </AnimatedPage>
    
  );
};

export default Login;
