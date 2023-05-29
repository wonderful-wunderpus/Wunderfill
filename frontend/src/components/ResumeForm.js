import React from 'react';
import { useNavigate } from 'react-router-dom';

const ResumeForm = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <button className='backButton' onClick={() => navigate('/')}>Back ⬅︎</button>
      <form >
        <h1>Resume Form:</h1>
        <label htmlFor='name'>Name: <input type="text" name="name" /> </label>
        <label htmlFor='job'>Job: <input type="text" name="job" /> </label>
        <label htmlFor='bio'>Bio: <input type="text" name="bio" /> </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  )
}

export default ResumeForm;