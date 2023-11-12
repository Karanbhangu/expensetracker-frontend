import React, { useRef } from "react";
import "./Expenses.css";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import AnimatedPage from "../../AnimatedPage";
import { toast } from "react-toastify";

const AddExpense = () => {
  // Create a ref for the form element
  const formRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = formRef.current;

    // Create an object to send as the request body
    const myExpenses = {
      expensetitle: form.expenseTitle.value,
      expenseamount: form.expenseAmount.value,
      expensedate: form.expensedate.value,
      expensecategory: form.expenseCategory.value,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/expenses/addexpense",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": Cookies.get("jwt"),
          },
          body: JSON.stringify(myExpenses),
        }
      );

      if (response.ok) {
        // Handle a successful response, e.g., navigate to a success page or reset the form
        form.reset(); // Reset the form after a successful submission
        toast.success("Expense Added Successfully");
      } else {
        // Handle errors, e.g., display an error message
        console.error("Failed to add expense");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <AnimatedPage>
      <div className="dashboard">
        <div className="heading-bg"></div>
        <div className="form-container">
          <h1 className="title">
            <Link to="/manageexpenses">
              <i className="fa-solid fa-arrow-left"></i>
            </Link>
            Add Expense
          </h1>
          <form ref={formRef} id="expenseForm">
            <label htmlFor="expenseTitle" className="form-label">
              Expense Name:
            </label>
            <input
              type="text"
              id="expenseTitle"
              name="expensetitle"
              className="form-input"
              required
            />

            <label htmlFor="expenseAmount" className="form-label">
              Expense Amount:
            </label>
            <input
              type="number"
              id="expenseAmount"
              name="expenseamount"
              step="0.01"
              className="form-input"
              required
            />
            <label htmlFor="expensedate" className="form-label">
              Date:
            </label>
            <input
              type="date"
              id="expensedate"
              name="expensedate"
              step="0.01"
              className="form-input"
              required
            />

            <label htmlFor="expenseCategory" className="form-label">
              Update Category:
            </label>
            <select
              id="expenseCategory"
              name="expensecategory"
              className="select-input"
              required
            >
              <option value="groceries">Groceries</option>
              <option value="utilities">Utilities</option>
              <option value="transportation">Transportation</option>
              <option value="entertainment">Entertainment</option>
              <option value="other">Other</option>
            </select>
            <br />
            <br />
            <button
              type="submit"
              onClick={handleSubmit}
              className="submit-button"
            >
              Add Expense
            </button>
          </form>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default AddExpense;
