import React, { useState, useEffect } from 'react';
import {
  Container,
  PageTitle,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
} from '../styles'; // 스타일 파일 경로에 맞게 수정

const UserInfoList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // const response = await fetch('/api/userinfo/select'); // 전체 사용자 정보 API 엔드포인트
        const response = await fetch(`${BACKEND_HOST}/api/userinfo/select`); // 전체 사용자 정보 API 엔드포인트
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data.data);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Container>
      <PageTitle>사용자 정보</PageTitle>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>ID</TableHeader>
            <TableHeader>이름</TableHeader>
            <TableHeader>계정</TableHeader>
            <TableHeader>재시작 횟수</TableHeader>
            <TableHeader>표시 여부</TableHeader>
            <TableHeader>생성일</TableHeader>
          </TableRow>
        </TableHead>
        <tbody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.user}</TableCell>
              <TableCell>{user.account}</TableCell>
              <TableCell>{user.reStartCount}</TableCell>
              <TableCell>{user.displayYN}</TableCell>
              <TableCell>{user.createdAt}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default UserInfoList;
