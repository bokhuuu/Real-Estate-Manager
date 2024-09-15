import React from "react";
import { Modal } from "react-bootstrap";
import AddAgentForm from "../forms/AddAgentForm";

const AddAgentModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop={show} centered>
      <Modal.Header>
        <Modal.Title>აგენტის დამატება</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddAgentForm handleClose={handleClose} />
      </Modal.Body>
    </Modal>
  );
};

export default AddAgentModal;
