import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WeddingCard from './components/WeddingCard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/invite/Guest" replace />} />
          <Route path="/invite/:guestName" element={<WeddingCard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
