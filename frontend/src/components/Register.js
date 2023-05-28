import React from 'react';
import { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({})  
  
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const submitHandler = (e) => {
    e.preventDefault;
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
    } else {
      // dispatch register action, args: username, password
      fetch('/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
    }
  }
  return (
    <>
      <form onSubmit={submitHandler}>
        <h1>Register</h1>
        <label >
          <p>Username:</p>
          <input type="text" name="username" onChange={handleChange}/>
        </label>
        <label>
          <p>Password:</p>
          <input type="password" name="password" onChange={handleChange}/>
        </label>
        <label>
          <p>Confirm Password:</p>
          <input type="password" name="confirmPassword" onChange={handleChange}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  )
}

export default Register;