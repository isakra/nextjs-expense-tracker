import { useState } from "react";
import { Expense } from "../types/expense";  // ✅ Import Type

interface ExpenseFormProps {
  addExpense: (expense: Omit<Expense, "id">) => Promise<void>;
}

export default function ExpenseForm({ addExpense }: ExpenseFormProps) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { // ✅ Fix Type
    e.preventDefault();
    if (!name || !amount) return;

    try {
      await addExpense({ name, amount: parseFloat(amount) });

      // Reset form after successful submission
      setName("");
      setAmount("");
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow">
      <input
        className="w-full p-2 border rounded mb-2"
        type="text"
        placeholder="Expense Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="w-full p-2 border rounded mb-2"
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white w-full py-2 rounded"
      >
        Add Expense
      </button>
    </form>
  );
}
