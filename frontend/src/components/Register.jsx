import React, { useState } from 'react';

const Register = ({ onRegister, onSwitch }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  
  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
    return regex.test(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || {};

     if (!validatePassword(password)) {
      setMessage('Password must include uppercase, lowercase, number, and special character.');
      return;
    }
    
    if (users[username]) {
      setMessage('⚠ Username already exists');
    } else {
      users[username] = { password };
      localStorage.setItem('users', JSON.stringify(users));
      setMessage('✅ Registered successfully! Please log in.');
      setTimeout(() => {
        onSwitch(); // switch to Login screen
      }, 1500);
    }
  };

  return (
    <div className="card">
      <h1>Expense Tracker</h1>
      <h2>Register</h2>
      {message && <p className="info">{message}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          required
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account?{' '}
        <button onClick={onSwitch}>Login here</button>
      </p>
    </div>
  );
};

export default Register;
