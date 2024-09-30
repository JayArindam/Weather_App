import React, { useState } from 'react';
import Weather from './components/Weather';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleRegister = () => {
    setIsRegistering(false);
  };

  return (
    <div className='app'>
      {isLoggedIn ? (
        <Weather />
      ) : isRegistering ? (
        <Register onRegister={handleRegister} />
      ) : (
        <Login onLogin={handleLogin} onSwitchToRegister={() => setIsRegistering(true)} />
      )}
    </div>
  );
};

export default App;
