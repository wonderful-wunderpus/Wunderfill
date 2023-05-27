import React from 'react'
import {Link} from 'react-router-dom'

const Login = () => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const submitHandler = (e) => {
    e.preventDefault;
    // dispatch login action, args: username, password
    fetch([route], {
      method: 'POST',
      headers: {},
      body: JSON.stringify(formData)
    })
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <h1>Sign in</h1>
        <label >
          <p>Username:</p>
          <input type="text" name="username" onChange={handleChange}/>
        </label>
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

export default Login