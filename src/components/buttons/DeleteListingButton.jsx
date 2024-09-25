import StyledButton from "../../styles/StyledButton";

const DeleteListingButton = ({ onClick }) => {
  const handleButtonClick = () => {
    onClick();
  };

  return (
    <StyledButton
      $variant="primary"
      onClick={handleButtonClick}
      style={{ marginTop: "35px" }}
    >
      ლისტინგის წაშლა
    </StyledButton>
  );
};

export default DeleteListingButton;
