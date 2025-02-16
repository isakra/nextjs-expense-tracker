import { useState, useEffect } from "react";
import ExpenseList from "../components/ExpenseList";
import ExpenseForm from "../components/ExpenseForm";

export default function Home() {
  const [expenses, setExpenses] = useState([]);

  // Fetch Expenses
  useEffect(() => {
    fetch("http://localhost:3001/api/expenses")
      .then((res) => res.json())
      .then((data) => setExpenses(data));
  }, []);

  // Add Expense
  const addExpense = async (expense) => {
    const res = await fetch("http://localhost:3001/api/create-expense", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expense),
    });

    if (res.ok) {
      const newExpense = await res.json();
      setExpenses([...expenses, newExpense]);
    }
  };

  // Delete Expense
  const deleteExpense = async (id) => {
    const res = await fetch(`http://localhost:3001/api/expense/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setExpenses(expenses.filter((expense) => expense.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Expense Tracker</h1>
      <ExpenseForm addExpense={addExpense} />
      <ExpenseList expenses={expenses} deleteExpense={deleteExpense} />
    </div>
  );
}
