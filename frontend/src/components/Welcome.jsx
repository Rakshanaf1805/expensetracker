import React, { useState } from 'react';
import ExpenseForm from './ExpenseForm';

const Welcome = ({ user }) => {
  const [salary, setSalary] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isNaN(parseFloat(salary)) && parseFloat(salary) > 0) {
      setSubmitted(true);
    }
  };

  return (
    <div className="card">
      <h1>Expense Tracker</h1>
      <h2>Welcome, {user.username}!</h2>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Enter your salary"
            value={salary}
            onChange={e => setSalary(e.target.value)}
            min="0"
            required
          />
          <button type="submit">Submit Salary</button>
        </form>
      ) : (
        <ExpenseForm salary={parseFloat(salary)} />
      )}
    </div>
  );
};

export default Welcome;
