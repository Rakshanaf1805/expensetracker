import React, { useState } from 'react';

const Login = ({ onLogin, onSwitch, onForgotPassword  }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

   const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
    return regex.test(password);
  };


  const handleSubmit = (e) => {
    e.preventDefault();

     if (!validatePassword(password)) {
      setError('Password must include uppercase, lowercase, number, and special character.');
      return;
    }

    const stored = JSON.parse(localStorage.getItem('users')) || {};
    if (stored[username] && stored[username].password === password) {
      setError('');
      setAttempts(0);
      onLogin({ username });
    } else {
      setError('❌ Invalid username or password');
      setAttempts(prev => prev + 1);
    }
  };

  return (
    <div className="card">
      <h1>Expense Tracker</h1>
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>

       {attempts >= 3 && (
        <p>
          Forgot password?{' '}
          <button onClick={() => onForgotPassword(username)} className=" underline">
            Reset here
          </button>
        </p>
      )}

      <p>
        Don’t have an account?{' '}
        <button onClick={onSwitch}>Register here</button>
      </p>
    </div>
  );
};

export default Login;
