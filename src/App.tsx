import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AnimatedWeddingCard from './components/motion/AnimatedWeddingCard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/invite/Guest" replace />} />
          <Route path="/invite/:guestName" element={<AnimatedWeddingCard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
