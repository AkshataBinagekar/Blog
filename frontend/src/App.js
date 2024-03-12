import React from 'react'
import Home from './pages/home/Home'
import Signup from './pages/signup/Signup.jsx';
import { Route, Routes } from 'react-router-dom';
import Recipe from './pages/recipe/Recipe.jsx'
import Login from './pages/login/Login.jsx';
import Write from './pages/write/Write.jsx';
import Single from './pages/Single/Single.jsx';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword.jsx';
import RestPassword from './pages/ResetPassword/ResetPassword.jsx';


function App() {
  return (
    <Routes>
     <Route path="/" element={<Signup />} />
     <Route path="/login" element={<Login />} />
     <Route path="/forgotPassword" element={<ForgotPassword />} />
     <Route path="/resetpassword" element={<RestPassword />} />
    <Route path="/home"  element={<Home />} />
    <Route path="/recipe" element={<Recipe />} />
    <Route path="/write" element={<Write />} />
    <Route path="/posts/:postId" element={<Single />} />
  </Routes>
  )
}


export default App
