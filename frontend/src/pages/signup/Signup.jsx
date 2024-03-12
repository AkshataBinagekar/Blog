

import { useState } from 'react';
import axios from 'axios';
import {  useNavigate} from 'react-router-dom';
import "./Signup.css";

function Signup() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const [successMessage] = useState('');
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    const handleSubmit = async (e) => {
      e.preventDefault(); 
      const { email, password } = formData;
 // Check if email and password are not empty
 if (email.trim() === '') {
  const alertDiv = document.createElement('div');
        alertDiv.textContent = 'Please Enter Your Email';
        alertDiv.classList.add('alertMessage');
        document.querySelector('.signupContent').appendChild(alertDiv);
  return;
}

if (password.trim() === '') {
  const alertDiv = document.createElement('div');
  alertDiv.textContent = 'Please Enter Your Password';
  alertDiv.classList.add('alertMessage');
  document.querySelector('.signupContent').appendChild(alertDiv);
  return;
} 
if (password.trim() === '') {
  const alertDiv = document.createElement('div');
  alertDiv.textContent = 'Please Enter Your Password';
  alertDiv.classList.add('alertMessage');
  document.querySelector('.signupContent').appendChild(alertDiv);
  return;
}

if (password.trim().length < 8) {
  const alertDiv = document.createElement('div');
  alertDiv.textContent = 'Password must be at least 8 characters long';
  alertDiv.classList.add('alertMessage');
  document.querySelector('.signupContent').appendChild(alertDiv);
  return;
}

if (/\s/.test(password.trim())) {
  const alertDiv = document.createElement('div');
  alertDiv.textContent = 'Password cannot contain spaces';
  alertDiv.classList.add('alertMessage');
  document.querySelector('.signupContent').appendChild(alertDiv);
  return;
}

try {
  const response = await axios.post('http://localhost:5000/Signup', formData);
  console.log(response.data);
  // Show success message
  const successDiv = document.createElement('div');
  successDiv.textContent = 'Signup successful!';
  successDiv.classList.add('successMessage');
  document.querySelector('.signupContent').appendChild(successDiv);
  // Redirect to login page after a delay
  setTimeout(() => {
    navigate('/login');
  }, 2000);
} catch (error) {
  console.error('Error:', error.message);
}
};

 
 
  return (
    <div className="signup">
      <h2 className="signupTitle">SIGN UP</h2>
      <div className="signupContent">
      <img className="pic" src="https://i.pinimg.com/originals/9d/cf/bf/9dcfbf46aa46eea30079a4d0946ca76f.gif" alt="" />
      <form className="signupForm" onSubmit={handleSubmit} >
        <label>EMAIL:</label>
        <input
          className="signupInput"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder=" Enter Your Email..."
        />
        <label>PASSWORD:</label>
        <input
          className="signupInput"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder=" Enter Your Password..."
        
        />
       <button className="signupButton" type="submit" >  SIGNUP</button>
     
        <span className="signupLoginButton">
          already have an account? <a href="/login" >LOGIN</a>
        </span>
       
      </form>
      {successMessage && (
          <div className="successMessage">{successMessage}</div>
        )}
      </div>
    </div>
  );
}

export default Signup;
