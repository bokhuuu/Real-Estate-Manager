import { Modal, Button } from "react-bootstrap";

const DeleteListingModal = ({ show, onHide, onDelete }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>გსურთ წაშალოთ ლისტინგი?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          გაუქმება
        </Button>
        <Button variant="danger" onClick={onDelete}>
          დადასტურება
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteListingModal;
