import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom'; // React Router 사용 시

export const GlobalStyle = createGlobalStyle`
  html {
    font-size: 16px;
  }

  body {
    background-color: #f4f5f7; /* 회색 배경 */
    color: #000000;
    font-family: sans-serif;
    margin: 0;
    padding: 1rem; /* body 전체에 padding 적용 (선택 사항) */
    box-sizing: border-box;
  }

  @media (max-width: 768px) {
    html {
      font-size: 14px;
    }
  }

  @media (max-width: 576px) {
    html {
      font-size: 12px;
    }
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1rem;
  background-color: #ffffff; /* 흰색 컨테이너 배경 */
  border-radius: 0.5rem;
  box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

export const DetailSection = styled.div`
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem; /* 각 섹션 간 간격 */
`;

export const Button = styled.button`
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #007bff;
  padding: 0.8rem 1.2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  text-decoration: none;

  &:hover {
    background-color: #e0f7fa;
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }

  @media (max-width: 576px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 0.5rem; /* 테이블 상단 간격 조정 */
  background-color: #ffffff;
`;

export const TableHead = styled.thead`
  background-color: #ffffff;
  border-bottom: 1px solid #ccc;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f0f0f0;
  }

  thead & {
    &:hover {
      background-color: transparent;
    }
    cursor: default;
  }

  @media (max-width: 600px) {
    display: block;
    border-bottom: 1px solid #ccc;
    margin-bottom: 0.8rem;
  }
`;

export const TableHeader = styled.th`
  padding: 0.8rem;
  text-align: left;
  font-size: 1rem;

  @media (max-width: 600px) {
    display: block;
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;

    &::before {
      content: attr(data-label);
      font-weight: bold;
      display: inline-block;
      width: 6rem;
      margin-right: 0.8rem;
    }
  }
`;

export const TableCell = styled.td`
  padding: 0.8rem;
  text-align: left;
  font-size: 0.9rem;

  @media (max-width: 600px) {
    display: block;
    padding: 0.4rem 0.8rem;
    border-bottom: none;

    &:last-child {
      border-bottom: 1px solid #ccc;
      margin-bottom: 0.8rem;
    }

    &::before {
      content: attr(data-label);
      font-weight: bold;
      display: inline-block;
      width: 6rem;
      margin-right: 0.8rem;
    }
  }
`;

export const PageTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 0.8rem;
  }

  @media (max-width: 576px) {
    font-size: 1.6rem;
    margin-bottom: 0.6rem;
  }
`;

export const DetailWrapper = styled.div`
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin-top: 1rem;
  border: 1px solid #eee;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const ResponsiveDetailWrapper = styled(DetailWrapper)`
  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 1199px) and (min-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 991px) and (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 767px) {
    grid-template-columns: repeat(1, 1fr);
  }
  display: grid;
`;

export const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0;
  width: calc(25% - 1rem);

  @media (max-width: 1199px) and (min-width: 992px) {
    width: calc(33.333% - 1rem);
  }
  @media (max-width: 991px) and (min-width: 768px) {
    width: calc(50% - 1rem);
  }
  @media (max-width: 767px) {
    width: 100%;
  }
`;

export const Label = styled.div`
  font-weight: bold;
  margin-bottom: 0.3rem;
  color: #333;
`;

export const Value = styled.div`
  color: #555;
  word-break: break-word;
`;

export const HeaderContainer = styled.header`
  background-color: #007bff; /* 파란색 배경 */
  color: #ffffff; /* 흰색 글자 */
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between; /* 항목들을 양쪽 끝으로 배치 */
  align-items: center;
`;

export const HeaderItems = styled.nav`
  display: flex;
  align-items: center;
`;

export const HeaderItem = styled(Link)`
  // React Router Link 사용 (선택 사항)
  color: #ffffff;
  text-decoration: none; /* 기본 밑줄 제거 */
  margin-left: 1.5rem;
  font-size: 1rem;
  transition: color 0.3s ease, text-decoration 0.3s ease; /* color와 text-decoration에 transition 적용 */

  &:hover {
    color: #e0f7fa; /* 호버 시 밝게 */
    text-decoration: underline; /* 호버 시 밑줄 표시 */
    text-decoration-color: #ffffff; /* 밑줄 색상을 흰색으로 지정 */
  }

  &:first-child {
    margin-left: 0;
  }

  @media (max-width: 768px) {
    margin-left: 1rem;
    font-size: 0.9rem;
  }

  @media (max-width: 576px) {
    margin-left: 0.8rem;
    font-size: 0.8rem;
  }
`;

export const Logo = styled(Link)`
  // 로고 영역 (선택 사항)
  color: #ffffff;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 576px) {
    font-size: 1.1rem;
  }
`;
