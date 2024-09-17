import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import AddAgentModal from "../modals/AddAgentModal";

const AddAgenButton = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const savedModalState = localStorage.getItem("showModal");
    if (savedModalState === "true") {
      setShowModal(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("showModal", showModal);
  }, [showModal]);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    localStorage.removeItem("showModal");
  };

  return (
    <div>
      <Button variant="primary" onClick={handleOpenModal}>
        აგენტის დამატება
      </Button>

      <AddAgentModal show={showModal} handleClose={handleCloseModal} />
    </div>
  );
};

export default AddAgenButton;
