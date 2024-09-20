import { Button } from "react-bootstrap";

const DeleteListingButton = ({ onClick }) => {
  return (
    <Button variant="danger" onClick={onClick}>
      ლისტინგის წაშლა
    </Button>
  );
};

export default DeleteListingButton;
