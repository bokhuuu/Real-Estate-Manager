import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.header`
  width: 1920px;
  height: 100px;
  padding: 38px 162px;
  background: #ffffff;
  border-bottom: 1px solid #dbdbdb;
`;

const Logo = styled.img`
  width: 150px;
  height: 24px;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Logo src="/src/assets/logo.png" />
    </HeaderContainer>
  );
};

export default Header;
