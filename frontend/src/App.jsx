import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Welcome from './components/Welcome';
import ForgotPassword from './components/ForgotPassword';

const App = () => {
  const [user, setUser] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotUsername, setForgotUsername] = useState('');

  const handleLogin = (userData) => {
    setUser(userData);
    setIsForgotPassword(false);
  };
  
   const handleForgotPassword = (username) => {
    setForgotUsername(username || '');
    setIsForgotPassword(true);
  };

  const handleBackToLogin = () => {
    setIsForgotPassword(false);
    setIsRegistering(false);
  };
  
  return (
    <div className="app-container">
      {!user ? (
        isForgotPassword ? (
          <ForgotPassword onReset={handleLogin} onBack={handleBackToLogin} username={forgotUsername} />
        ) : isRegistering ? (
          <Register onRegister={handleLogin} onSwitch={() => setIsRegistering(false)} />
        ) : (
          <Login
            onLogin={handleLogin}
            onSwitch={() => setIsRegistering(true)}
            onForgotPassword={handleForgotPassword}
          />
        )
      ) : (
        <Welcome user={user} />
      )}
    </div>
  );
};

export default App;