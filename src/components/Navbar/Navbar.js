import React, { useState, useEffect, useContext } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ExpenseContext } from "../../context/ExpenseContext";
import { toast } from "react-toastify";

export default function Navbar(props) {
  const navigate = useNavigate();
  const context = useContext(ExpenseContext);
  const { jwt, setJwt } = context;
  const notify = (message) => {
    toast.success(message);
  };
  const [menuState, changeMenuState] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const handleLogout = () => {
    Cookies.remove("jwt");
    navigate("/");
    notify("Logged out successfully.");
    setJwt(undefined);
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10 && !isScrolled) {
        setIsScrolled(true);
      } else if (window.scrollY <= 10 && isScrolled) {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolled]);

  const handleMenu = () => {
    if (menuState === "open") {
      changeMenuState("");
      setIsScrolled(false);
    } else {
      changeMenuState("open");
      setIsScrolled(true);
    }
  };

  const closeMenu = () => {
    changeMenuState("");
  };

  return (
    <>
      <nav
        className={`${isScrolled ? "scrolled-navbar" : "transparent-navbar"}`}
      >
        <div className="lefty">
          <Link to="/">          <h1> E-Tracker </h1>
</Link>
        </div>
        <div className="righty">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {jwt ? (
              <li>
                <Link to="/manageexpenses">Manage Expenses</Link>
              </li>
            ) : (
              <li>
                <Link to="/about">About</Link>
              </li>
            )}

            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="righty-end">
          {jwt ? (
            <>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>{" "}
              <Link to="/myaccount">My Account</Link>
            </>
          ) : (
            <>
              {" "}
              <Link to="/login">Login</Link>{" "}
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
        <div
          className={
            menuState === "open" ? "righty-mobile open" : "righty-mobile"
          }
          onClick={handleMenu}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </nav>
      <div
        className={menuState === "open" ? "mobile-Menu open" : "mobile-Menu"}
      >
        <ul>
          <li>
            <Link onClick={closeMenu} to="/">
              Home
            </Link>
          </li>
          {jwt ? (
            <li>
              <Link onClick={closeMenu} to="/manageexpenses">
                Manage Expenses
              </Link>
            </li>
          ) : (
            <li>
              <Link onClick={closeMenu} to="/about">
                About
              </Link>
            </li>
          )}

          <li>
            <Link onClick={closeMenu} to="/dashboard">
              Dashboard
            </Link>
          </li>
          <li>
            <Link onClick={closeMenu} to="/contact">
              Contact
            </Link>
          </li>
          {jwt ? (
            <>
              <button className="logout-button" onClick={()=>{handleLogout(); closeMenu()}}>
                Logout
              </button>{" "}
              <li>
                <Link onClick={closeMenu} to="/myaccount">My Account</Link>
              </li>
            </>
          ) : (
            <>
              {" "}
              <li>
                <Link onClick={closeMenu} to="/login">Login</Link>{" "}
              </li>
              <li>
                <Link onClick={closeMenu} to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
}
