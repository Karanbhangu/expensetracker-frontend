import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import AddExpense from "./components/Dashboard/CRUD/AddExpense";
import ExpenseState from "./context/ExpenseContext";
import Contact from "./components/Contact/Contact";
import ManageExpenses from "./components/Dashboard/ManageExpenses/ManageExpenses";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import MyAccount from "./components/User/MyAccount";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import About from "./components/About/About";

function App() {

  return (
    <BrowserRouter>
      <ExpenseState>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/manageexpenses" element={<ManageExpenses />} />
          <Route path="/addexpense" element={<AddExpense />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/myaccount" element={<MyAccount />} />
        </Routes>
        <ToastContainer
          position="top-center" // Set the position to "top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false} // Set pauseOnFocusLoss to false
          draggable
          pauseOnHover={false}
        />
      </ExpenseState>
    </BrowserRouter>
  );
}

export default App;
