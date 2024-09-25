import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";

const HeaderContainer = styled.header`
  width: 1920px;
  height: 100px;
  padding: 38px 162px;
  border-bottom: 1px solid #dbdbdb;
  background: #ffffff;
`;

const Logo = styled.img`
  width: 150px;
  height: 24px;
  cursor: pointer;
`;

const Header = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <HeaderContainer>
      <Logo src={logo} onClick={handleLogoClick} />
    </HeaderContainer>
  );
};

export default Header;
