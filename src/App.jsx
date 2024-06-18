import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import TechniqueList from './components/TechniqueList';
import TechniqueListRaw from './components/TechniqueListRaw';

function App() {
  return (
    <Router basename="/weighted-techniques-react">
      <Routes>
        <Route path="/" element={<TechniqueList />} />
        <Route path="/raw" element={<TechniqueListRaw />} />
      </Routes>
    </Router>
  );
}

export default App;
