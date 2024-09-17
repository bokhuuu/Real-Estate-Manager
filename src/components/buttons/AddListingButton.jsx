import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const AddListingButton = () => {
  const navigate = useNavigate();

  const handleClickButton = () => {
    navigate("/add-listing");
  };

  return (
    <Button variant="secondary" onClick={handleClickButton}>
      ლისტინგის დამატება
    </Button>
  );
};

export default AddListingButton;
