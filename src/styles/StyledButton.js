import styled from "styled-components";

const StyledButton = styled.button`
  background-color: ${(props) =>
    props.$variant === "primary" ? "#DF3014" : "#fff"};
  color: ${(props) => (props.$variant === "primary" ? "#fff" : "#DF3014")};
  border: 2px solid #df3014;
  width: 200px;
  height: 40px;
  border-radius: 10px;
  font-family: "FiraGO", sans-serif;
  font-weight: 400;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${(props) =>
      props.$variant === "primary" ? "#ff5640" : "#f0f0f0"};
  }
`;

export default StyledButton;
