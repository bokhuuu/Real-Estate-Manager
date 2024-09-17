import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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
  cursor: pointer;
`;

const Header = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <HeaderContainer>
      <Logo src="/src/assets/logo.png" onClick={handleLogoClick} />
    </HeaderContainer>
  );
};

export default Header;
