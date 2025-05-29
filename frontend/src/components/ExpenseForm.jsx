import React, { useState } from 'react';

const ExpenseForm = ({ salary }) => {
  const [expenses, setExpenses] = useState([]);
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [error, setError] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    const amount = parseFloat(expenseAmount);

    // Regex: starts with letter, then anything else
    const namePattern = /^[A-Za-z][A-Za-z0-9\s]*$/;

    if (!namePattern.test(expenseName.trim())) {
      setError('❌ Expense name must start with a letter and can include letters, numbers, or spaces.');
      return;
    }

    if (expenseName.trim() && !isNaN(amount) && amount > 0) {
      setExpenses([...expenses, { name: expenseName.trim(), amount }]);
      setExpenseName('');
      setExpenseAmount('');
      setError('');
    } else {
      setError('❌ Please enter a valid expense name and amount.');
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
      {error && <p className="error">{error}</p>}

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
          min="0"
        />
        <button type="submit">Add Expense</button>
      </form>

      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            {expense.name}: ₹{expense.amount}
            <button
              onClick={() => handleDelete(index)}
              style={{ marginLeft: '10px', backgroundColor: '#FFAAAA', color: 'white' }}
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
