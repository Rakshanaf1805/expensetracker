import React, { useState } from 'react';

const ForgotPassword = ({ onReset, onBack, username: initialUsername  }) => {
  const [username, setUsername] = useState(initialUsername || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
    return regex.test(password);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!username.trim()) {
      setError('Username is required');
      return;
    }
    if (!validatePassword(newPassword)) {
      setError('Password must include uppercase, lowercase, number, and special character.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (!users[username]) {
      setError('User does not exist');
      return;
    }

    users[username].password = newPassword;
    localStorage.setItem('users', JSON.stringify(users));
    setMessage('Password reset successful. You can now login.');
    setUsername('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="card">
      <h2>Reset Password</h2>
      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}
      <form onSubmit={handleReset}>
        <input
          type="text"
          placeholder="Username"
          required
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          required
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          required
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>
      <p>
        <button onClick={onBack} className="underline">Back to Login</button>
      </p>
    </div>
  );
};

export default ForgotPassword;
