// prompt:
// 지금 이 에러메시지가 발생하고 있어 : No routes matched location "/"
// 홈경로로 접근했을 때 보여주는 컴포넌트 만들어주고 메인 화면에는 구글 드라이브에 업로드된 동영상을 보여주고 싶은데 가능해?

// prompt:
// 홈 경로로 접근했을 때
// 1) <HomePage />컴포넌트가 <Container>컴포넌트 밖에 있어야 하고
// 2) 동영상 사이즈도 반응형ㅇ으로 바꿔줘

// prompt:
// 이 리액트 소스코드에서 아래의 에러메시지가 발생하고 있는데 원인 알 수 있어?
// Refused to frame 'https://accounts.google.com/' because an ancestor violates the following Content Security Policy directive: "frame-ancestors https://drive.google.com".

// prompt:
// 분명 Routes에 board를 등록했는데 왜 /board로 접근했을 때 404 에러가 발생하는거야?
// 내가 배포한 곳은 Google Cloud Platform의 Cloud Run이야
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import JobList from './components/JobList';
import ArList from './components/ArList';
import ArDetail from './components/ArDetail';
import { GlobalStyle, Container, Button } from './styles';
import Header from './components/common/Header';
import UserInfoList from './components/UserInfoList';
import LogViewer from './components/common/LogViewer';
import SimpleUploader from './components/SimpleUploader';
import UploadedFileList from './components/UploadedFileList';
import styled from 'styled-components';

function App() {
  // const apiUrl = process.env.REACT_APP_HOST;
  // App.js 파일
  const apiUrl = process.env.REACT_APP_HOST;
  console.log('REACT_APP_HOST : ', apiUrl);

  // const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;
  // console.log('process.env.REACT_APP_BACKEND_HOST : ', BACKEND_HOST);

  // 반응형 iframe을 위한 styled component
  // const ResponsiveIframe = styled.iframe`
  //   width: 100%;
  //   height: 0;
  //   padding-bottom: 56.25%; /* 16:9 비율 (height = width * 9 / 16) */
  //   position: relative;
  //   border: 0;

  //   & > div {
  //     position: absolute;
  //     top: 0;
  //     left: 0;
  //     width: 100%;
  //     height: 100%;
  //   }
  // `;

  // 홈 화면 컴포넌트
  function HomePage() {
    // const videoId = '1uy0-GOB0n1NepjzcRubfT7gk-8mQTXAr'; // 회사
    const videoId = '1uiTL1ZDvFmt4zDZ3E2WPW20YcNg9wbfI'; // 개인
    const videoUrl = `https://drive.google.com/file/d/${videoId}/preview`;

    return (
      <div>
        {/* <ResponsiveIframe
          src={videoUrl}
          allowFullScreen
          title="Google Drive Video"
        /> */}
      </div>
    );
  }
  return (
    <Router>
      <GlobalStyle />
      <Header />
      {/* HomePage 컴포넌트를 Container 밖에 배치 */}
      {/* <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes> */}
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ar" element={<JobList />} />
          <Route path="/userinfo" element={<UserInfoList />} />
          <Route path="/log" element={<LogViewer />} />
          <Route path="/ar-list/:jobId" element={<ArList />} />
          <Route path="/ar/:arInfoId" element={<ArDetail />} />
          <Route path="/fileupload/" element={<SimpleUploader />} />
          <Route path="/board" element={<UploadedFileList />} />
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
