// prompt:
// 로컬에 파일로 저장된 로그를 읽어와서 화면에 보여주는 컴포넌트야.
// 현재 api를 호출할 때 파라미터에 /api/log/read/20250510 이런식으로 날짜 정보를 넣어서 보내는데 추가 기능이 필요해.
// 1) 처음 페이지 이동시에는 무조건 오늘 날짜의 로그를 보여줘야해.
// 2) 연, 월, 일을 선택할 수 있는 컴포넌트 생성해줘.
// 3) '타임스탬프'를 클릭하면 로그 정렬이 오름차순/내림차순으로 변경되도록 해줘.

// prompt:
// 1) 연, 월, 일을 선택하면 해당 일자의 로그를 보여줘.
// 2) '타임스탬프'는 다른 테이블의 칼럼명과 같은 스타일로 변경해줘.

// prompt:
// 1) '메시지'칼럼의 내용이 100자 이상일 경우 '...'로 표시하고, 마우스를 올리면 전체 내용이 툴팁으로 보이도록 해줘.

// prompt:
// 혹시 툴팁 사용하는 로직은 모두 제거하고 각 row의 메시지를 클릭하면 모달창으로 해당 행의 전체 메시지를 보여주는 방법으로 수정해줄 수 있어?

// prompt:
// 마지막으로 타임스탬프 칼럼을 클릭하면 오름차순, 내림차순 정렬이 되도록 하고 싶은데 기능은 구현되어 있으나 정상적으로 동작 안하고 있어. 혹시 어느 부분에 문제가 있는지 봐줄 수 있어?
import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import {
  Container,
  PageTitle,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
} from '../../styles';

const DateSelectorContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SortButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  font-weight: bold;
`;

const MessageCell = styled(TableCell)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 200px;
  cursor: pointer; /* 클릭 가능한 스타일 */
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  max-width: 80%;
  max-height: 80%;
  overflow-y: auto;
  white-space: pre-wrap; /* 자동 줄바꿈 활성화 (ModalContent 자체) */

  pre {
    white-space: pre-wrap; /* <pre> 태그 내부에서도 줄바꿈 적용 */
    word-break: break-word; /* 단어 단위로 줄바꿈 (더 자연스러운 줄바꿈) */
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
`;

const LogViewer = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedLogMessage, setSelectedLogMessage] = useState(null); // 모달에 표시할 메시지 상태
  const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;

  const years = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() - i
  );
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const daysInMonth = useCallback(
    (year, month) => new Date(year, month, 0).getDate(),
    []
  );
  const days = Array.from(
    { length: daysInMonth(selectedYear, selectedMonth) },
    (_, i) => i + 1
  );
  const formatDate = useCallback((year, month, day) => {
    const monthStr = month < 10 ? `0${month}` : `${month}`;
    const dayStr = day < 10 ? `0${day}` : `${day}`;
    return `${year}${monthStr}${dayStr}`;
  }, []);
  const fetchLogs = useCallback(
    async (date) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${BACKEND_HOST}/api/log/read/${date}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setLogs(data.data);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    },
    [BACKEND_HOST]
  );
  useEffect(() => {
    const today = formatDate(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      new Date().getDate()
    );
    fetchLogs(today);
  }, [fetchLogs, formatDate]);
  const handleDateChange = useCallback(
    (year, month, day) => {
      setSelectedYear(year);
      setSelectedMonth(month);
      setSelectedDay(day);
      const formattedDate = formatDate(year, month, day);
      fetchLogs(formattedDate);
    },
    [fetchLogs, formatDate]
  );
  const handleYearChange = useCallback(
    (event) => {
      const year = parseInt(event.target.value);
      setSelectedYear(year);
      handleDateChange(year, selectedMonth, selectedDay);
    },
    [handleDateChange, selectedMonth, selectedDay]
  );
  const handleMonthChange = useCallback(
    (event) => {
      const month = parseInt(event.target.value);
      setSelectedMonth(month);
      const newDaysInMonth = daysInMonth(selectedYear, month);
      if (selectedDay > newDaysInMonth) {
        setSelectedDay(newDaysInMonth);
      }
      handleDateChange(selectedYear, month, selectedDay);
    },
    [daysInMonth, handleDateChange, selectedYear, selectedDay]
  );
  const handleDayChange = useCallback(
    (event) => {
      const day = parseInt(event.target.value);
      setSelectedDay(day);
      handleDateChange(selectedYear, selectedMonth, day);
    },
    [handleDateChange, selectedYear, selectedMonth]
  );
  const handleSort = useCallback(() => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    const sortedLogs = [...logs].sort((a, b) => {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);
      return newSortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
    setLogs(sortedLogs);
  }, [logs, sortOrder]);

  const handleMessageClick = useCallback((message) => {
    setSelectedLogMessage(message);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedLogMessage(null);
  }, []);

  if (loading) return <div>Loading logs...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Container>
      <PageTitle>로그 뷰어</PageTitle>
      <DateSelectorContainer>
        <Select value={selectedYear} onChange={handleYearChange}>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>
        <Select value={selectedMonth} onChange={handleMonthChange}>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </Select>
        <Select value={selectedDay} onChange={handleDayChange}>
          {days.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </Select>
      </DateSelectorContainer>

      {selectedLogMessage && (
        <ModalOverlay onClick={handleCloseModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
            <pre>{selectedLogMessage}</pre>
          </ModalContent>
        </ModalOverlay>
      )}

      {logs.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>
                <SortButton onClick={handleSort}>타임스탬프</SortButton>
              </TableHeader>
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
                <MessageCell onClick={() => handleMessageClick(log.message)}>
                  {log.message.length > 100
                    ? `${log.message.slice(0, 100)}...`
                    : log.message}
                </MessageCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      ) : (
        <div>해당 날짜의 로그 데이터가 없습니다.</div>
      )}
    </Container>
  );
};

export default LogViewer;
