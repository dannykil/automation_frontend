// 사용자 : ** 절대 수정금지. 프롬프팅을 통해 'LLM'에게 수정 요청할 것 **
// prompt:
// 아래는 현재 내가 운영하고 있는 어플리케이션의 css 컴포넌트(styles.js)인데 수정이 필요해. 혹시 너가 이해하고 도와줄 수 있어?

// 'Container' 컴포넌트의 사이즈에 맞춰서 반응하는 inputbox 컴포넌트 생성해줘

// css에 있는 컴포넌트를 사용해서 상단 우측에 '등록' 버튼 하나 만들어줄 수 있어? 해당 버튼을 클릭하면 /fileupload로 이동하도록 해줘

// 수정된 내용을 css파일에 적용해줄 수 있어?

// prompt:
// 화면을 보면 파일경로 칼럼의 크기가 너무 작아서 내용이 잘려서 보이고 있어. 이걸 수정해줘. 해당 컴포넌트의 이름은 UploadedFileListTableHeaderCell과 UploadedFileListTableCell야
import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';

export const GlobalStyle = createGlobalStyle`
  html {
    font-size: 16px;
  }

  body {
    background-color: #f4f5f7;
    color: #000000;
    font-family: sans-serif;
    margin: 0;
    padding: 1rem;
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
  background-color: #ffffff;
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
  margin-bottom: 1rem;
`;

export const Button = styled.button`
  background-color: #007bff;
  color: #ffffff;
  border: 1px solid #007bff;
  padding: 0.8rem 1.2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  text-decoration: none;
  margin-top: 1rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;

  &:hover {
    background-color: #0056b3;
  }

  &:first-child {
    margin-left: 0;
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
    margin-left: 0.3rem;
    margin-right: 0.3rem;
  }

  @media (max-width: 576px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
    margin-left: 0.2rem;
    margin-right: 0.2rem;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 0.5rem;
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
  word-break: break-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

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
  background-color: #007bff;
  color: #ffffff;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderItems = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  & > *:last-child {
    padding-right: 3rem;
  }
`;

export const HeaderLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s ease, text-decoration 0.3s ease;

  &:hover {
    color: #e0f7fa;
    text-decoration: underline;
    text-decoration-color: #ffffff;
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

export const DropdownContainer = styled.div`
  position: absolute;
  top: 100%;
  left: auto;
  right: 0;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-top: none;
  border-radius: 0.3rem;
  box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.1);
  z-index: 10;
  display: none;
  min-width: 150px;
`;

export const DropdownItem = styled(Link)`
  display: block;
  padding: 0.8rem 1.2rem;
  text-decoration: none;
  color: #333;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f8f8f8;
  }
`;

export const HeaderItemWithDropdown = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 1.5rem;
  margin-right: 3rem;

  &:hover ${DropdownContainer} {
    display: block;
  }
`;

export const RegisterButton = styled(HeaderLink)`
  background-color: #ffffff;
  color: #007bff;
  border: 1px solid #007bff;
  padding: 0.6rem 1rem;
  border-radius: 0.5rem;
  text-decoration: none;

  &:hover {
    background-color: #e0f7fa;
    color: #0056b3;
    border-color: #0056b3;
    text-decoration: none;
  }
`;

export const ResponsiveInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  box-sizing: border-box;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  margin-bottom: 1rem;

  &:focus {
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }

  @media (max-width: 768px) {
    padding: 0.5rem 0.5rem;
    font-size: 0.9rem;
  }

  @media (max-width: 576px) {
    padding: 0.4rem 0.4rem;
    font-size: 0.8rem;
  }
`;

export const UploadedFileListContainer = styled.div`
  margin-top: 2rem;
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.1);
  padding: 1rem;
`;

export const UploadedFileListTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

export const UploadedFileListTable = styled(Table)`
  margin-top: 0;
`;

export const UploadedFileListTableHeader = styled(TableHead)``;

export const UploadedFileListTableRow = styled(TableRow)``;

export const UploadedFileListTableHeaderCell = styled(TableHeader)`
  &:first-child {
    width: 50%;
  }
  &:last-child {
    width: 50%;
    text-align: right;
  }
`;

// prompt:
// DB에서 조회해온 데이터를 보여주는 컴포넌트인데 아래 텍스트가 한줄에 보일 수 있도록 조정해줄 수 있어?
export const UploadedFileListTableCell = styled(TableCell)`
  &:first-child {
    word-break: break-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &:last-child {
    text-align: right;
  }
`;
