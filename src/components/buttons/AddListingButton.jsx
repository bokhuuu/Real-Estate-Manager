import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const AddListingButton = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/add-listing");
  };

  return (
    <Button variant="secondary" onClick={handleButtonClick}>
      ლისტინგის დამატება
    </Button>
  );
};

export default AddListingButton;
