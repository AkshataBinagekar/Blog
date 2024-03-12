import { useState } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (email.trim() === '') {
      setErrorMessage('Please Enter Your Email');
      return;
    }

    if (password.trim() === '') {
      setErrorMessage('Please Enter Your Password');
      return;
    }
    

    try {
      // const response = await axios.post('http://localhost:5000/login', formData);
      // console.log(response.data);
      // Show success message
      setSuccessMessage('Login successful!');
      // Redirect to home page after a delay
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="login">
      <h2 className="loginTitle">LOGIN</h2>
      <div className="loginContent">
        <img className="loginPic" src="https://i.pinimg.com/originals/97/77/06/977706aea80d60585bed41103c1f0e7c.gif" alt="" />
        <form className="loginForm" onSubmit={handleSubmit}>
          <label>EMAIL:</label>
          <input
            className="loginInput"
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            placeholder=" Enter Your Email..."
          />
          <label>PASSWORD:</label>
          <input
            className="loginInput"
            type="password"
            name="password"
            value={formData.password}
            onChange={onChange}
            placeholder=" Enter Your Password..."
          />
          <button className="loginBtn" type="submit"> LOGIN </button>
          <a href="/forgotPassword" className="FP">Forgot Password?</a>
          <span className="signupbtn">
            Don't have an account? <a href="/">SIGNUP</a>
          </span>
        </form>
        {errorMessage && (
          <div className="alertMessage">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="successMessage">{successMessage}</div>
        )}
      </div>
    </div>
  );
}

export default Login;
