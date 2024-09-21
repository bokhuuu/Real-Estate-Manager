import StyledButton from "../../styles/StyledButton";
import { Modal } from "react-bootstrap";

const DeleteListingModal = ({ show, onHide, onDelete }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>გსურთ წაშალოთ ლისტინგი?</Modal.Body>
      <Modal.Footer>
        <StyledButton $variant="primary" onClick={onHide}>
          გაუქმება
        </StyledButton>
        <StyledButton $variant="primary" onClick={onDelete}>
          დადასტურება
        </StyledButton>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteListingModal;
