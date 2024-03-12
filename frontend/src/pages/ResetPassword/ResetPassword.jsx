import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ResetPassword.css';

function RestPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      setSuccessMessage('');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/resetpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, newPassword: password })
      });

      if (!response.ok) {
        throw new Error('Reset password request failed');
      }

      setSuccessMessage('Password reset successfully.');
      setErrorMessage('');
      navigate('/login');
    } catch (error) {
      console.error('Reset password error:', error);
      setErrorMessage('Error resetting password. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className='RestPassword'>
      <h2 className='rpTitle'>Reset Password</h2>
      {successMessage && <div className="success">{successMessage}</div>}
      {errorMessage && <div className="error">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className='rpContent'>
          <label>New Password:</label>
          <input
            className="rpInput"
            type="password"
            id="password"
            placeholder=" Enter Your Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Confirm Password:</label>
          <input
            className="rpInput"
            type="password"
            id="confirmPassword"
            placeholder=" Enter Your Confirm Password..."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button className="RPassword">Reset Password</button>
        </div>
      </form>
    </div>
  );
}

export default RestPassword;
