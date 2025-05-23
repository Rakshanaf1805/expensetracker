import React, { useState } from 'react';


const Login = ({ onLogin, onSwitch }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const stored = JSON.parse(localStorage.getItem('users')) || {};
    if (stored[username] && stored[username].password === password) {
      onLogin({ username });
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="card">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" required value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <button onClick={onSwitch}>Register</button></p>
    </div>
  );
};

export default Login;
