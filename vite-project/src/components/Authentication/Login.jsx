import React, { useContext, useState } from 'react';
import axios from 'axios';
import "./Login.css";
import Signup from './SignUp';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Context } from '../utils/context';
import ForgotPassword from './ForgotPassword'; // Import ForgotPassword

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false); // Add state for ForgotPassword
  const navigate = useNavigate();
  const { login, setLogin, profile, setProfile } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:1337/api/auth/local', {
        identifier,
        password,
      });
      localStorage.setItem('jwt', response.data.jwt);
      console.log('Login successful');
      setLogin(false);
      setProfile(true);
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Login failed');
    }
  };

  const handleSignupClick = () => {
    setShowSignup(true);
  };

  const handleSignupClose = () => {
    setShowSignup(false);
  };

  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    setShowForgotPassword(true);
  };

  const handleForgotPasswordClose = () => {
    setShowForgotPassword(false);
  };

  return (
    <>
      <div className="overlay"></div>
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username or Email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <a
          href="#"
          className="forgot-password-link"
          onClick={handleForgotPasswordClick} // Use click handler
        >
          Forgot Password
        </a>
        <p className="signup-prompt">
          Don't have an account? <button onClick={handleSignupClick} className="signup-link-button">Sign up</button>
        </p>
      </div>
      {showSignup && <Signup onClose={handleSignupClose} />}
      {showForgotPassword && <ForgotPassword onClose={handleForgotPasswordClose} />} {/* Render ForgotPassword */}
    </>
  );
};

export default Login;
