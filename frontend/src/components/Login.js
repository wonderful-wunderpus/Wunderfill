import React from 'react'
import {Link} from 'react-router-dom'
import { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const submitHandler = (e) => {
    e.preventDefault;
    fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    // then - successful authentication: use React Router useNavigate Hook to redirect to resume form page
    // use controller to handle redirect to protect the authenticated page.
    // catch - error: use React Router useNavigate Hook to redirect to signup page OR display an error message
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <h1>Sign in</h1>
        {/* <label >
          <p>Username:</p>
          <input type="text" name="username" onChange={handleChange}/> */}
        {/* </label> */}
        <label htmlFor='username'>Username: </label>
        <input type="text" name="username" onChange={handleChange}/>
        <label>
          <p>Password:</p>
          <input type="password" name="password" onChange={handleChange}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  )
}

export default Login;