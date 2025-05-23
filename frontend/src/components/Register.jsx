import React, { useState } from 'react';

const Register = ({ onRegister, onSwitch }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (users[username]) {
      setMessage('Username already exists');
    } else {
      users[username] = { password };
      localStorage.setItem('users', JSON.stringify(users));
      onRegister({ username });
    }
  };

  return (
    <div className="card">
      <h2>Register</h2>
      {message && <p className="error">{message}</p>}
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Username" required value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <button onClick={onSwitch}>Login</button></p>
    </div>
  );
};

export default Register;
