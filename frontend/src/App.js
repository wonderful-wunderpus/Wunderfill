import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen.js';
import Register from './components/Register.js';
import Login from './components/Login.js';

const App = () => {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<HomeScreen />} />
          <Route exact path='signup' element={<Register />} />
          <Route exact path='login' element={<Login />} />
        </Routes>  
    </Router>
  );
}

export default App;