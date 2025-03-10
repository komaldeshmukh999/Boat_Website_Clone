import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';

const Signup = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:1337/api/auth/local/register', {
        username,
        email,
        password,
      });
      console.log('Signup successful');
      if (onClose) {
        onClose();
      }
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Signup failed');
    }
  };

  return (
    <div className="signup-popup-overlay">
      <div className="signup-popup-content">
        <h2 className="signup-title">Signup</h2>
        {error && <p className="error-message">{error}</p>}
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="signup-input"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="signup-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="signup-input"
          />
          <button type="submit" className="signup-button">Signup</button>
        </form>
        {onClose && (
          <button onClick={onClose} className="close-button">Close</button>
        )}
      </div>
    </div>
  );
};

export default Signup;