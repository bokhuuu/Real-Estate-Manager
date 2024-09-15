import React, { useState } from "react";
import { Button } from "react-bootstrap";
import AddAgentModal from "../modals/AddAgentModal";

const AddAgenButton = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

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
