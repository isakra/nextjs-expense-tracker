import { useState, useEffect } from "react";
import ExpenseList from "../components/ExpenseList";
import ExpenseForm from "../components/ExpenseForm";
import { Expense } from "../types/expense";  // ✅ Import Type

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]); // ✅ Added Type

  // Fetch Expenses with error handling
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/expenses");
        if (!res.ok) throw new Error("Failed to fetch expenses");
        const data: Expense[] = await res.json();
        setExpenses(data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  // Add Expense with proper type
  const addExpense = async (expense: Omit<Expense, "id">) => {
    try {
      const res = await fetch("http://localhost:3001/api/create-expense", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expense),
      });

      if (!res.ok) throw new Error("Failed to add expense");

      const newExpense: Expense = await res.json();
      setExpenses((prevExpenses) => [...prevExpenses, newExpense]); // ✅ Fixes Type Issue
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  // Delete Expense with proper type
  const deleteExpense = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3001/api/expense/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete expense");

      setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
    } catch (error) {
      console.error("Error deleting expense:", error);
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
