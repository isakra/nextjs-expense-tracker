export default function ExpenseList({ expenses, deleteExpense }) {
    return (
      <div className="mt-6">
        {expenses.length === 0 ? (
          <p className="text-gray-500 text-center">No expenses yet</p>
        ) : (
          <ul className="bg-white p-4 rounded-lg shadow">
            {expenses.map((expense) => (
              <li
                key={expense.id}
                className="flex justify-between items-center p-2 border-b"
              >
                <span>{expense.name} - ${expense.amount}</span>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => deleteExpense(expense.id)}
                >
                  ✖
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
  