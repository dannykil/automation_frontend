import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import JobList from './components/JobList';
import ArList from './components/ArList';
import ArDetail from './components/ArDetail';
import { GlobalStyle, Container, Button } from './styles';

function App() {
  // const apiUrl = process.env.REACT_APP_HOST;
  // App.js 파일
  const apiUrl = process.env.REACT_APP_HOST;
  console.log('REACT_APP_HOST : ', apiUrl);

  // const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;
  // console.log('process.env.REACT_APP_BACKEND_HOST : ', BACKEND_HOST);

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

// // .env.development 파일
// HOST=0.0.0.0

// // App,js 파일
// const apiUrl = process.env.REACT_APP_HOST;
// console.log('REACT_APP_HOST : ', apiUrl);

// 이렇게 설정했는데 로그를 보면 REACT_APP_HOST :  undefined 라고 나와있어. 값을 못가져오고 있는데 혹시 어디가 잘못됐어?
