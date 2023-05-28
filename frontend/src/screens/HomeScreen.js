import React from 'react';
import { Link } from 'react-router-dom';


const HomeScreen = () => {
  return (
    <div>
      <h1>HomeScreen</h1>
      <button>
        <Link to='signup'>Signup</Link>
      </button>
      <button>
        <Link to='login'>Login</Link>
      </button>
    </div>
  );
}

export default HomeScreen;