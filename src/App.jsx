import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Techniques from './components/Techniques';
import TechniquesListRaw from './components/TechniquesListRaw';

function App() {
  return (
    <Router basename="/weighted-techniques-react">
      <Routes>
        <Route path="/" element={<Techniques />} />
        <Route path="/raw" element={<TechniquesListRaw />} />
      </Routes>
    </Router>
  );
}

export default App;
