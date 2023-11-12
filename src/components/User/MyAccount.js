import React, { useContext, useEffect, useState } from "react";
import AnimatedPage from "../AnimatedPage";
import { ExpenseContext } from "../../context/ExpenseContext";
import { toast } from "react-toastify";

const MyAccount = () => {
  const context = useContext(ExpenseContext);
  const { user, fetchUser, updateUser } = context;
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    fetchUser();
  }, []);
  useEffect(() => {
    if (user.name !== undefined) {
      setUserDetails({
        name: user.name,
        email: user.email,
        password: "",
      });
    }
  }, [user]);
  const handleNameChange = (e) => {
    setUserDetails({
      name: e.target.value,
      email: userDetails.email,
      password: userDetails.password
    })
  }
  const handleEmailChange = (e) => {
    setUserDetails({
      name: userDetails.name,
      email: e.target.value,
      password: userDetails.password
    })
  }
  const handlePasswordChange = (e) => {
    setUserDetails({
      name: userDetails.name,
      email: userDetails.email,
      password: e.target.value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(userDetails)
    toast.success("Updates details successfully");
  }
  return (
    <AnimatedPage>
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="login-header">My Account</h2>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input"
              value={userDetails.name}
              onChange={handleNameChange}
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
              name="email"
              className="form-input"
              value={userDetails.email}
              required
              onChange={handleEmailChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              New Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              value={userDetails.password}
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit" className="login-button">
            Save Changes
          </button>
        </form>
      </div>
    </AnimatedPage>
  );
};

export default MyAccount;
