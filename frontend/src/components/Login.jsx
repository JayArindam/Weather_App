import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin, onSwitchToRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      onLogin();
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className='login-container'>
      <h1>Login</h1>
      <input
        type='text'
        placeholder='Username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p>
        Don't have an account?{' '}
        <span className='link' onClick={onSwitchToRegister}>
          Register Here
        </span>
      </p>
    </div>
  );
};

export default Login;
