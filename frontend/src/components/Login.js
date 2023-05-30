import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({});
  const [loggedIn, setLoggedIn] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const submitHandler = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then((response) => {
        if (response.status === 200) {
          console.log(response)
          setLoggedIn(true);
          navigate('/form')
        } else {
          setLoggedIn(false);
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <>
      <button className='backButton' onClick={() => navigate(-1)}>Back ⬅︎</button>
      <form onSubmit={submitHandler}>
        <h1>Sign in</h1>
        <label htmlFor='username'>Username: <input type="text" name="username" onChange={handleChange}/> </label>
        <label htmlFor='password'>Password: <input type="password" name="password" onChange={handleChange}/> </label>
        <div>
          <button type="submit" onClick={submitHandler}>Login</button>
          {loggedIn === false ? <p className='password-message'>Invalid login credentials</p> : null}
        </div>
      </form>
    </>
  )
}

export default Login;