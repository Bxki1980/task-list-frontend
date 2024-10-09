import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, setToken } from '../utils/auth';
import '../styles/login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Redirect to TaskList if already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/tasklist');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setRememberMe(checked);
    } else if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://localhost:7071/api/Login/authenticate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName: username, password }),
      });

      if (response.ok) {
        const result = await response.json();
        // Store the token
        setToken(result.token, rememberMe);
        setError('');
        navigate('/tasklist');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="login">
      <div className="login-box">
        <header className="login-header">Login</header>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="input-field"
              name="username"
              id="username"
              placeholder="Username"
              value={username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-box">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="input-field"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={handleInputChange}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <div className="forgot">
            <label>
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={handleInputChange}
              />
              Remember me
            </label>
            <div>
              <a href="/forgot-password">Forgot password?</a>
            </div>
          </div>
          <div className="input-submit">
            <button className="submit-btn" type="submit">
              Sign In
            </button>
          </div>
        </form>
        <div className="sign-up-link">
          <p>
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
