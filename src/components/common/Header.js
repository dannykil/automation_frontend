import React from 'react';
import { HeaderContainer, HeaderItems, HeaderItem, Logo } from '../../styles'; // 경로에 맞게 수정

const Header = () => {
  return (
    <HeaderContainer>
      <Logo to="/">Your App Name</Logo> {/* 로고 (선택 사항) */}
      <HeaderItems>
        <HeaderItem to="/log">로그</HeaderItem>
        <HeaderItem to="/ar">AR</HeaderItem>
        <HeaderItem to="/userinfo">사용자</HeaderItem>
      </HeaderItems>
    </HeaderContainer>
  );
};

export default Header;
