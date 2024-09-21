import { useState } from "react";
import StyledButton from "../../styles/StyledButton";

const DeleteListingButton = ({ onClick }) => {
  const [buttonVariant, setButtonVariant] = useState("primary");

  const handleButtonClick = () => {
    onClick();
    setButtonVariant("secondary");
  };

  return (
    <StyledButton $variant={buttonVariant} onClick={handleButtonClick}>
      ლისტინგის წაშლა
    </StyledButton>
  );
};

export default DeleteListingButton;
