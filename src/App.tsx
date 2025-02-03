import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import './App.css'
import ExchangeRate from './pages/ExchangeRate'

const App: React.FC = () => {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<ExchangeRate />} />   
    </Routes>
  </Router>
  );
};

export default App;	
