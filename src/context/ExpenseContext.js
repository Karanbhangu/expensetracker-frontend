import { useState } from "react";
import { createContext } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const ExpenseContext = createContext();

const host = "https://expensetracker-backend-fy7b.onrender.com/"; // API endpoint
const formatDate = (date) => {
  const formattedDate = new Date(date);
  return `${formattedDate.getUTCFullYear()}-${(formattedDate.getUTCMonth() + 1)
    .toString()
    .padStart(2, "0")}-${formattedDate
    .getUTCDate()
    .toString()
    .padStart(2, "0")}`;
};

const ExpenseState = (props) => {
  const notify = (message) => {
    toast.success(message);
  };
  const [jwt, setJwt] = useState(Cookies.get("jwt"));
  const [expenses, setExpenses] = useState([]);
  const [allExpense, setallExpense] = useState([]);
  const [user, setUser] = useState("");

  const [categoryPercentage, setCategoryPercentage] = useState({});
  // Function to fetch and filter expenses data
  const getExpenses = async (timePeriod) => {
    try {
      // Fetch expenses data from the server
      const response = await fetch(`${host}expenses/getexpenses`, {
        method: "GET",
        headers: {
          "auth-token": jwt,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch expenses.");
      }

      // Convert fetched data to JSON
      const fetchExpenses = await response.json();

      // Process fetched data and filter based on the selected time period
      const filteredExpenses = fetchExpenses.Expenses.map((expense) => {
        const date = new Date(expense.date);
        const dayOfWeek = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ][date.getUTCDay()];

        return {
          amount: expense.amount,
          id: expense._id,
          label: dayOfWeek,
          date: formatDate(expense.date),
          category: expense.category,
        };
      });
      // Calculate date range based on the selected time period (e.g., last 7 days)
      const currentDate = new Date();
      const startDate = new Date(currentDate);
      const formattedCurrentDate = formatDate(currentDate);
      let filteredItems;
      // Filter and make Summed Data for same dates according to requirement
      if (timePeriod === "daily") {
        startDate.setDate(currentDate.getDate() - 6);

        // Filter expenses for the selected time period
        const formattedStartDate = formatDate(startDate);
        filteredItems = filteredExpenses.filter((item) => {
          return (
            item.date >= formattedStartDate && item.date <= formattedCurrentDate
          );
        });
      } else if (timePeriod === "weekly") {
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        filteredItems = filteredExpenses.filter((item) => {
          const fetchedMonth = new Date(item.date);
          if (
            fetchedMonth.getMonth() === currentMonth &&
            fetchedMonth.getFullYear() === currentYear
          ) {
            return item;
          } else {
            return false;
          }
        });
      } else if (timePeriod === "monthly") {
        const currentYear = currentDate.getFullYear();
        filteredItems = filteredExpenses.filter((item) => {
          const fetchedYear = new Date(item.date).getFullYear();
          if (fetchedYear === currentYear) {
            return item;
          } else {
            return false;
          }
        });
      } else if (timePeriod === "yearly") {
        const yearlyTotals = {}; // Create an object to store yearly totals

        // Loop through the filtered expenses to calculate yearly totals
        filteredExpenses.forEach((item) => {
          const year = new Date(item.date).getFullYear(); // Get the year from the date
          const amount = item.amount;
          const category = item.category;
          // If the year doesn't exist in yearlyTotals, initialize it with the current amount
          if (!yearlyTotals[year]) {
            yearlyTotals[year] = {
              amount: amount,
              label: year.toString(),
              category: category,
            };
          } else {
            // If the year exists, add the current amount to the existing total
            yearlyTotals[year].amount += amount;
          }
        });

        // Convert yearlyTotals object to an array
        filteredItems = Object.values(yearlyTotals);
      }
      // Sum up expenses for the same dates and category totals
      const summedItems = {};

      for (const item of filteredItems) {
        const { date, amount, label, category } = item;
        if (summedItems[date]) {
          summedItems[date].amount += amount;
        } else {
          summedItems[date] = {
            amount,
            label,
            date,
            category,
          };
        }
      }

      // Filter to convert data of a month into weekly data:
      const weeklyTotals = {
        1: { amount: 0, label: "Week 1" },
        2: { amount: 0, label: "Week 2" },
        3: { amount: 0, label: "Week 3" },
        4: { amount: 0, label: "Week 4" },
        5: { amount: 0, label: "Week 5" },
      };

      if (timePeriod === "weekly") {
        for (const item in summedItems) {
          const fetchDate = new Date(summedItems[item].date).getDate();
          const amount = Number(summedItems[item].amount);

          if (fetchDate <= 7) {
            weeklyTotals[1].amount += amount;
          } else if (fetchDate > 7 && fetchDate <= 14) {
            weeklyTotals[2].amount += amount;
          } else if (fetchDate > 14 && fetchDate <= 21) {
            weeklyTotals[3].amount += amount;
          } else if (fetchDate > 21 && fetchDate <= 28) {
            weeklyTotals[4].amount += amount;
          } else if (fetchDate > 28 && fetchDate <= 31) {
            weeklyTotals[5].amount += amount;
          }
        }
      }

      // Filter to convert summed data into monthly data:
      const monthlyTotals = {
        1: { amount: 0, label: "January" },
        2: { amount: 0, label: "February" },
        3: { amount: 0, label: "March" },
        4: { amount: 0, label: "April" },
        5: { amount: 0, label: "May" },
        6: { amount: 0, label: "June" },
        7: { amount: 0, label: "July" },
        8: { amount: 0, label: "August" },
        9: { amount: 0, label: "September" },
        10: { amount: 0, label: "October" },
        11: { amount: 0, label: "November" },
        12: { amount: 0, label: "December" },
      };

      if (timePeriod === "monthly") {
        for (const item in summedItems) {
          const fetchMonth = new Date(summedItems[item].date).getMonth();
          const amount = Number(summedItems[item].amount);
          // Increment the total for the corresponding month
          monthlyTotals[fetchMonth + 1].amount += amount;
        }
      }
      // Convert summed data back to an array of expenses
      let expenses;
      if (timePeriod === "daily") {
        expenses = Object.values(summedItems); // This did not require much manipulation
      } else if (timePeriod === "weekly") {
        expenses = Object.values(weeklyTotals).reverse();
      } else if (timePeriod === "monthly") {
        expenses = Object.values(monthlyTotals).reverse();
      } else if (timePeriod === "yearly") {
        expenses = Object.values(filteredItems).reverse(); //This did not require much manipulation
      }

      // Category wise feetching
      // Initialize category totals object
      const initialCategoryTotals = {
        groceries: 0,
        utilities: 0,
        transportation: 0,
        entertainment: 0,
        other: 0,
      };

      // Loop through the filtered expenses to calculate category-wise totals
      filteredItems.forEach((item) => {
        const category = item.category;
        const amount = item.amount;

        // Add the amount to the corresponding category total
        initialCategoryTotals[category] += amount;
      });

      // Update the expenses state
      setCategoryPercentage(initialCategoryTotals);
      setExpenses(expenses);
    } catch (error) {
      console.error("Error fetching and processing expenses:", error);
      // Handle errors as needed (e.g., show error message to user)
    }
  };

  // Get all expenses:
  const allExpenses = async (page) => {
    try {
      // Fetch expenses data from the server
      const response = await fetch(`${host}expenses/getexpenses`, {
        method: "GET",
        headers: {
          "auth-token": jwt,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch expenses.");
      }

      // Convert fetched data to JSON
      let fetchExpenses = await response.json();
      fetchExpenses = fetchExpenses.Expenses.reverse();
      const pageSize = 10; //Number of expenses per page
      const pageNumber = page;

      const startPagination = (pageNumber - 1) * pageSize;
      const endPagination = pageNumber * pageSize;

      fetchExpenses = fetchExpenses.slice(startPagination, endPagination);
      setallExpense(fetchExpenses);
    } catch (err) {
      console.log(err);
    }
  };
  const getExpense = async (id) => {
    try {
      // Fetch expenses data from the server
      const response = await fetch(`${host}expenses/expense/${id}`, {
        method: "GET",
        headers: {
          "auth-token": jwt,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch expenses.");
      }

      // Convert fetched data to JSON
      let fetchExpenses = await response.json();
      setExpenses(fetchExpenses);
    } catch (err) {
      console.log(err);
    }
  };
  // Deleting Expense:
  const deleteExpense = async (id,page) => {
    try {
      // Fetch expenses data from the server
      const response = await fetch(`${host}expenses/deleteexpense/${id}`, {
        method: "DELETE",
        headers: {
          "auth-token": jwt,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch expenses.");
      }
      allExpenses(page);
      notify("Deleted Expense Successfully");

    } catch (err) {
      console.log(err);
    }
  };

  // Updating a expense:

  const updateExpense = async (id, expenseData, page) => {
    try {
      const expensy = {
        expensetitle: expenseData.expenseTitle,
        expenseamount: expenseData.expenseAmount,
        expensedate: expenseData.expensedate,
        expensecategory: expenseData.expenseCategort,
      };
      // Update expenses data from the server
      const response = await fetch(`${host}expenses/updateexpense/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": jwt,
        },
        body: JSON.stringify(expensy),
      });
      allExpenses(page);
      if (!response.ok) {
        throw new Error("Failed to fetch expenses.");
      }
      notify("Expense Updated Successfully");
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch single user details:
  const fetchUser = async () => {
    try {
      const response = await fetch(`${host}auth/getuser`, {
        method: "POST",
        headers: {
          "auth-token": jwt,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch expenses.");
      }
      const fetchedUser = await response.json();
      setUser(fetchedUser);
    } catch (err) {
      console.log(err);
    }
  };

  // Updating user data:
  const updateUser = async (userData) => {
    try {
      const response = await fetch(`${host}auth/updateuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": jwt,
        },
        body: JSON.stringify(userData),
      });
      console.log(userData)
      if (!response.ok) {
        throw new Error("Failed to fetch expenses.");
      }
      const fetchedUser = await response.json();
      console.log(fetchedUser);
    } catch (err) {
      console.log(err);
    }
  };
  // Provide expenses and getExpenses function through context
  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        getExpenses,
        categoryPercentage,
        allExpenses,
        getExpense,
        allExpense,
        deleteExpense,
        updateExpense,
        setJwt,
        jwt,
        user,
        fetchUser,
        updateUser,
      }}
    >
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseState;
