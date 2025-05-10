import React, { useState, useEffect } from 'react';
import {
  Container,
  PageTitle,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
} from '../../styles'; // 스타일 파일 경로에 맞게 수정

const LogViewer = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, ''); // 오늘 날짜 YYYYMMDD 형식

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        // const response = await fetch(`/api/log/read/${today}`);
        // const response = await fetch(`${BACKEND_HOST}/api/userinfo/select`); // 전체 사용자 정보 API 엔드포인트
        const response = await fetch(
          `http://localhost:5000/api/log/read/20250510`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('data', data);
        setLogs(data.data); // API 응답 구조에 맞게 'data' 속성에서 로그 배열 추출
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    };

    fetchLogs();
  }, [today]); // 오늘 날짜가 변경될 때마다 (새로운 날짜의 로그를 위해) 다시 로드할 수 있도록 dependency 추가

  if (loading) {
    return <div>Loading logs...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    // <Container>
    <div>
      <PageTitle>오늘의 로그</PageTitle>
      {logs.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>타임스탬프</TableHeader>
              <TableHeader>로그 레벨</TableHeader>
              <TableHeader>파일 이름</TableHeader>
              <TableHeader>함수</TableHeader>
              <TableHeader>라인 번호</TableHeader>
              <TableHeader>메시지</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {logs.map((log, index) => (
              <TableRow key={index}>
                <TableCell>{log.timestamp}</TableCell>
                <TableCell>{log.level}</TableCell>
                <TableCell>{log.filename}</TableCell>
                <TableCell>{log.function}</TableCell>
                <TableCell>{log.lineno}</TableCell>
                <TableCell>{log.message}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      ) : (
        <div>오늘의 로그 데이터가 없습니다.</div>
      )}
      {/* </Container> */}
    </div>
  );
};

export default LogViewer;
