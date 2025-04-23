import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import JobList from './components/JobList';
import ArList from './components/ArList';
import ArDetail from './components/ArDetail';
import { GlobalStyle, Container, Button } from './styles';

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Container>
        <Routes>
          <Route path="/" element={<JobList />} />
          <Route path="/ar-list/:jobId" element={<ArList />} />
          <Route path="/ar/:arInfoId" element={<ArDetail />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
