import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>HomeScreen</h1>
      <div>
        <button onClick={() => navigate('signup')}>Signup</button>
        <button onClick={() => navigate('login')}>Login</button>
      </div>
    </div>
  );
}

export default HomeScreen;