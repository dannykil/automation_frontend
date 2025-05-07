// prompt:
// 너가 만들어준 Header.js 파일이야.
// 여기서 각 헤더 아이템에 마우스를 올렸을 때 dropdownlist가 나오게 하고 싶은데
// 이전에 너가 만들어준 .css와 비슷한 디자인과 패턴으로 구현해줘.

import React from 'react';
import {
  HeaderContainer,
  HeaderItems,
  HeaderItem,
  Logo,
  HeaderItemWithDropdown,
  HeaderLink,
  DropdownContainer,
  DropdownItem,
} from '../../styles'; // 경로에 맞게 수정

const Header = () => {
  return (
    <HeaderContainer>
      <Logo to="/">Play-Ground</Logo> {/* 로고 (선택 사항) */}
      <HeaderItems>
        {/* <HeaderItem to="/log">로그</HeaderItem>
        <HeaderItem to="/ar">AR</HeaderItem>
        <HeaderItem to="/userinfo">사용자</HeaderItem>
        <HeaderItem to="/fileupload">파일업로드</HeaderItem> */}

        {/* <HeaderItemWithDropdown>
          <HeaderLink to="/ar">유하나 차장</HeaderLink>
          <DropdownContainer>
            <DropdownItem to="/log">My First Item</DropdownItem>
          </DropdownContainer>
        </HeaderItemWithDropdown> */}

        {/* <HeaderItemWithDropdown>
          <HeaderLink to="/ar">현고니 차장</HeaderLink>
          <DropdownContainer>
            <DropdownItem to="/log">My First Item</DropdownItem>
          </DropdownContainer>
        </HeaderItemWithDropdown> */}

        {/* <HeaderItemWithDropdown>
          <HeaderLink to="/ar">현고니 차장</HeaderLink>
          <DropdownContainer>
            <DropdownItem to="/log">My First Item</DropdownItem>
          </DropdownContainer>
        </HeaderItemWithDropdown> */}

        <HeaderItemWithDropdown>
          <HeaderLink to="/ar">길과장</HeaderLink>
          <DropdownContainer>
            <DropdownItem to="/log">logs</DropdownItem>
            <DropdownItem to="/ar">AR</DropdownItem>
            <DropdownItem to="/userinfo">Users</DropdownItem>
            {/* <DropdownItem to="/fileupload">File Uploader</DropdownItem> */}
            <DropdownItem to="/board">Board</DropdownItem>
          </DropdownContainer>
        </HeaderItemWithDropdown>

        {/* <HeaderItemWithDropdown>
          <HeaderLink to="/ar">이강희 대리</HeaderLink>
          <DropdownContainer>
            <DropdownItem to="/log">My First Item</DropdownItem>
          </DropdownContainer>
        </HeaderItemWithDropdown> */}
      </HeaderItems>
    </HeaderContainer>
  );
};

export default Header;
