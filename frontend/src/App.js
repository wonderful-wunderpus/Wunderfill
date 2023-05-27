import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import React from 'react'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' component={HomeScreen} exact />
      </Routes>
    </BrowserRouter>
  )
}

export default App