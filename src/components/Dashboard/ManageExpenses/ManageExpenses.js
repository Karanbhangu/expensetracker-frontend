import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteExpense from "./DeleteExpense";
import UpdateExpense from "./UpdateExpense";
import { ExpenseContext } from "../../../context/ExpenseContext";
import AnimatedPage from "../../AnimatedPage";

const ManageExpenses = () => {
  // Retrieve expenses and getExpenses function from the context
  const context = useContext(ExpenseContext);
  const [page, setPage] = useState(1);
  const { allExpenses, allExpense, deleteExpense, updateExpense } = context;
  const [animation, setAnimation] = useState(false);
  const [changeId, setChangeId] = useState("");
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [visibleChange, setVisibleChange] = useState(false);
  const [changeData, setChangeData] = useState([]);

  useEffect(() => {
    allExpenses(page);
  }, []);
  useEffect(() => {
    allExpenses(page);
  }, [page]);
  const deleteNote = (id) => {
    setChangeId(id);
    setVisibleDelete(true);
    allExpenses(page)
  };
  const editNote = (id, arrayValues) => {
    setChangeData(arrayValues);
    setChangeId(id);
    setVisibleChange(true);
  };
  return (
    <AnimatedPage>
      <div className="manage-expenses">
        <div className="summary">
          <h2 style={{ marginBottom: "20px" }}>Expeses Summary:</h2>
          <table className={animation ? "custom-table hide" : "custom-table"}>
            <thead>
              <tr>
                <th className="canHide">Name</th>
                <th>Amount</th>
                <th>Date</th>
                <th className="canHide">Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allExpense !== undefined
                ? allExpense.map((expense) => {
                    const dated = new Date(expense.date);
                    return (
                      <tr key={expense.title}>
                        <td className="canHide">{expense.title}</td>
                        <td>${expense.amount}</td>
                        <td>
                          {dated.getDate() +
                            "-" +
                            Number(dated.getMonth() + 1) +
                            "-" +
                            dated.getFullYear()}
                        </td>
                        <td className="canHide">{expense.category}</td>
                        <td>
                          <i
                            onClick={() => {
                              editNote(expense._id, [
                                expense.title,
                                expense.amount,
                                expense.date,
                                expense.category,
                              ]);
                            }}
                            className="fa-solid fa-pen-to-square"
                          ></i>
                          &nbsp;{" "}
                          <i
                            className="fa-solid fa-trash"
                            onClick={() => {
                              deleteNote(expense._id);
                            }}
                          ></i>{" "}
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
          <div className="action-btns">
            <button
              disabled={page === 1}
              onClick={() => {
                setPage(page - 1);
                setAnimation(true);
                setTimeout(() => {
                  setAnimation(false);
                }, 500);
              }}
            >
              Previous
            </button>
            <p>Page {page}</p>
            <button
              disabled={allExpense.length < 10}
              onClick={() => {
                setPage(page + 1);
                setAnimation(true);
                setTimeout(() => {
                  setAnimation(false);
                }, 500);
              }}
            >
              Next
            </button>
          </div>
        </div>
        <div className="summary">
          <h2>Manage Expenses:</h2>
          <ul className="budget-links">
            <li>
              <i className="fa-solid fa-plus fa-lg"></i>
              <Link to="/addexpense">Add Expense</Link>
            </li>
          </ul>
        </div>
        <DeleteExpense
          isVisible={visibleDelete}
          deleteId={changeId}
          showMenu={setVisibleDelete}
          deleteExpense={deleteExpense}
            page={page}
        />
        <UpdateExpense
          isVisible={visibleChange}
          updateId={changeId}
          showMenu={setVisibleChange}
          changeData={changeData}
          updateExpense={updateExpense}
          page={page}
          
        />
      </div>
    </AnimatedPage>
  );
};

export default ManageExpenses;
