import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css'; // Create ForgotPassword.css

const ForgotPassword = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending reset email for:', email); // Debugging
      await axios.post('http://localhost:1337/admin/auth/forgot-password', {
        email,
      });
      setMessage('Reset password email sent.');
      setError(null);
      console.log('Reset email request successful'); // Debugging
    } catch (err) {
      console.error('Failed to send reset email:', err); // Debugging
      setError(err.response?.data?.error?.message || 'Failed to send reset email');
      setMessage('');
    }
  };

  return (
    <div className="forgot-password-overlay">
      <div className="forgot-password-content">
        <h2>Forgot Password</h2>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="forgot-password-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="forgot-password-input"
          />
          <button type="submit" className="forgot-password-button">
            Reset Password
          </button>
        </form>
        <button onClick={onClose} className="close-button">Close</button>
      </div>
    </div>
  );
};

export default ForgotPassword;