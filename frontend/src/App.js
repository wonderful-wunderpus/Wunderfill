import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen.js';
import Register from './components/Register.js';
import Login from './components/Login.js';
import ResumeForm from './components/ResumeForm.js';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<HomeScreen />} />
          <Route exact path='signup' element={<Register />} />
          <Route exact path='login' element={<Login />} />
          <Route exact path='form' element={<ResumeForm />} />
        </Routes>  
      </div>
    </Router>
  );
}

export default App;