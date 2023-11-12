import React, { useEffect, useRef, useState } from "react";

const UpdateExpense = (props) => {
  // Create a form reference
  const formRef = useRef();

  // State to manage expense data
  const [expenseData, setExpenseData] = useState({
    expenseTitle: "",
    expenseAmount: "",
    expensedate: "",
    expenseCategory: "",
  });
  useEffect(() => {
    if (props.changeData[0] !== undefined) {
      const parsedDate = new Date(props.changeData[2]);
      const year = parsedDate.getFullYear();
      const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0");
      const day = parsedDate.getDate().toString().padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;

      setExpenseData({
        expenseTitle: props.changeData[0],
        expenseAmount: props.changeData[1],
        expensedate: formattedDate,
        expenseCategory: props.changeData[3],
      });
    }
  }, [props.changeData]);

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpenseData({
      ...expenseData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    props.updateExpense(props.updateId, expenseData,props.page)
    props.showMenu(false)
  };

  return (
    <div className={props.isVisible ? "update-modal" : "update-model hide"}>
      <div className="modal-box">
        <div className="head">
          <h2>Update Expense</h2>
          <i
            onClick={() => props.showMenu(false)}
            className="fa-solid fa-xmark fa-2x"
          ></i>
        </div>
        <form id="expenseForm" ref={formRef} onSubmit={handleSubmit}>
          <label htmlFor="expenseTitle" className="form-label">
            Expense Name:
          </label>
          <input
            type="text"
            id="expenseTitle"
            name="expenseTitle"
            className="form-input"
            value={expenseData.expenseTitle}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="expenseAmount" className="form-label">
            Expense Amount:
          </label>
          <input
            type="number"
            id="expenseAmount"
            name="expenseAmount"
            step="0.01"
            className="form-input"
            value={expenseData.expenseAmount}
            onChange={handleInputChange}
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
            value={expenseData.expensedate}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="expenseCategory" className="form-label">
            Update Category:
          </label>
          <select
            id="expenseCategory"
            name="expenseCategory"
            className="select-input"
            value={expenseData.expenseCategory}
            onChange={handleInputChange}
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
          <button type="submit" className="submit-button">
            Update Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateExpense;
