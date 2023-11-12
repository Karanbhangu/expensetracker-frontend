import React, { useState } from "react";
import "./User.css"; // Import your CSS file
import AnimatedPage from "../AnimatedPage";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an object to send as the request body
    const registerData = {
      email: email,
      name: name,
      password: password,
    };

    const registerUser = await fetch(`https://expensetracker-backend-fy7b.onrender.com/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Use "Content-Type" with a capital 'C'
      },
      body: JSON.stringify(registerData), // Convert the object to JSON
    });
    if (registerUser.ok) {
      const userVerify = await registerUser.json();
      navigate("/login");
      toast.success("Registration successful please login.");
    } else {
      toast.error("Registration unsuccessful please try again.");
    }
  };

  return (
    <AnimatedPage>
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="login-header">Register</h2>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
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
              value={password}
              onChange={handlePasswordChange}
              className="form-input"
              required
            />
          </div>
          <button type="submit" className="login-button">
            Register
          </button>
        </form>
      </div>
    </AnimatedPage>
  );
};

export default Register;
