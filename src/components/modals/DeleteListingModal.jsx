import { Modal } from "react-bootstrap";
import StyledButton from "../../styles/StyledButton";

const DeleteListingModal = ({ show, onHide, onDelete }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Title className="text-center w-100">
        გსურთ წაშალოთ ლისტინგი?
      </Modal.Title>
      <Modal.Footer className="d-flex justify-content-center">
        <StyledButton $variant="secondary" onClick={onHide}>
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
