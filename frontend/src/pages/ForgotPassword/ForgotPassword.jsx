import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const Submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/forgotpassword', { email });
      console.log(response.data);
      setSuccessMessage('Password reset email sent successfully.'); // Set success message
      setErrorMessage(''); // Clear error message if present
    } catch (error) {
      console.error('Error:', error.message);
      setErrorMessage('Error sending password reset email.'); // Set error message
      setSuccessMessage(''); // Clear success message if present
    }
  };

  const handleSubmit = async (e) => {
    navigate('/login');
  };

  return (
    <div className='ForgotPassword'>
      <h2 className="fpTitle">FORGOT PASSWORD</h2>
      <div className="fpContent">
        <form onSubmit={Submit}>
          <label>EMAIL:</label>
          <input
            className="fpInput"
            type="email"
            name="email"
            placeholder=" Enter Your Email..."
            value={email}
            onChange={handleChange}
          />
          <button className='fPassword'>SEND</button>
        </form>
        <button onClick={handleSubmit} className='fpBtn'> GO BACK </button>
        {successMessage && <div className="success">{successMessage}</div>} {/* Display success message */}
        {errorMessage && <div className="error">{errorMessage}</div>} {/* Display error message */}
      </div>
    </div>
  );
}

export default ForgotPassword;
