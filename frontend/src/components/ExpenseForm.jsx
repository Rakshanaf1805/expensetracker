import React, { useState } from 'react';

const ExpenseForm = ({ salary }) => {
  const [expenses, setExpenses] = useState([]);
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    const amount = parseFloat(expenseAmount);
    if (expenseName.trim() && !isNaN(amount) && amount > 0) {
      setExpenses([...expenses, { name: expenseName, amount }]);
      setExpenseName('');
      setExpenseAmount('');
    }
  };

  const handleDelete = (index) => {
    const updated = expenses.filter((_, i) => i !== index);
    setExpenses(updated);
  };

  const total = expenses.reduce((acc, item) => acc + item.amount, 0);
  const remaining = salary - total;

  let warning = '';
  if (remaining < 0) {
    warning = '❌ Expenses exceed your salary!';
  } else if (remaining <= 5000) {
    warning = `⚠️ Warning: You have only ₹${remaining.toFixed(2)} left to spend!`;
  }

  return (
    <div>
      <h3>Salary: ₹{salary}</h3>
      <h3>Total Expenses: ₹{total}</h3>
      {warning && <p className="warning">{warning}</p>}

      <form onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Expense name"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(e.target.value)}
          required
        />
        <button type="submit">Add Expense</button>
      </form>

      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            {expense.name}: ₹{expense.amount}
            <button
              onClick={() => handleDelete(index)}
              style={{ marginLeft: '10px', backgroundColor: '#ef4444' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseForm;
