import { useState, useEffect } from "react";
import AddAgentModal from "../modals/AddAgentModal";
import StyledButton from "../../styles/StyledButton";

const AddAgenButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [buttonVariant, setButtonVariant] = useState("primary");

  useEffect(() => {
    const savedModalState = localStorage.getItem("showModal");
    if (savedModalState === "true") {
      setShowModal(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("showModal", showModal);
  }, [showModal]);

  const handleOpenModal = () => {
    setShowModal(true);
    setButtonVariant("secondary");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setButtonVariant("primary");
    localStorage.removeItem("showModal");
  };

  return (
    <div>
      <StyledButton $variant={buttonVariant} onClick={handleOpenModal}>
        აგენტის დამატება
      </StyledButton>

      <AddAgentModal show={showModal} handleClose={handleCloseModal} />
    </div>
  );
};

export default AddAgenButton;
