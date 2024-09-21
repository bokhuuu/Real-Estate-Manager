import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StyledButton from "../../styles/StyledButton";

const AddListingButton = () => {
  const [buttonVariant, setButtonVariant] = useState("primary");
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/add-listing");
    setButtonVariant("secondary");
  };

  return (
    <StyledButton $variant={buttonVariant} onClick={handleButtonClick}>
      ლისტინგის დამატება
    </StyledButton>
  );
};

export default AddListingButton;
