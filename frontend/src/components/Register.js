import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({})
  const [passwordMatch, setPasswordMatch] = useState(true)
  const navigate = useNavigate(); 
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatch(false)
      alert('Passwords do not match')
    } else {
      fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
        .then((response) => console.log(response))
        .catch((err) => console.log(`uh oh ${err}`))
    }
  }
  return (
    <>
    <button className='backButton' onClick={() => navigate(-1)}>Back ⬅︎</button>
      <form onSubmit={submitHandler}>
        <h1>Register</h1>
        <label htmlFor='username'>Username: <input type="text" name="username" onChange={handleChange}/></label>
        <label htmlFor='password'>Password: <input type="password" name="password" onChange={handleChange}/></label>
        <label htmlFor='confirmPassword'>Confirm: <input type="password" name="confirmPassword" onChange={handleChange}/>
          {passwordMatch === false ? <p className='password-message'>Passwords don't match</p> : null}
        </label>

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  )
}

export default Register;