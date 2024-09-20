import { useState } from "react";
import styled from "styled-components";
import DeleteListingButton from "../buttons/DeleteListingButton";
import DeleteListingModal from "../modals/DeleteListingModal";

const CardContainer = styled.div`
  width: 20%;
  border: 1px solid #ddd;
  margin: 20px;
  padding: 20px;
`;

const IconFeatureContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AgentInfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const HugeCard = ({ listing, onDelete }) => {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    setShowModal(false);
    onDelete();
  };

  return (
    <CardContainer>
      <img src={listing.image} style={{ width: "100%" }} alt="Listing" />
      <p>{listing.is_rental ? "ქირავდება" : "იყიდება"}</p>
      <IconFeatureContainer>
        <p>{listing.price}</p>
        <p>{`${listing.city.name}, ${listing.address}`}</p>
      </IconFeatureContainer>
      <IconFeatureContainer>
        <p>საფოსტო ინდექსი {listing.zip_code}</p>
        <p>ფართი {listing.area} მ²</p>
        <p>საძინებელი {listing.bedrooms}</p>
      </IconFeatureContainer>
      <p>{listing.description}</p>
      <p>
        გამოქვეყნების თარიღი {new Date(listing.created_at).toLocaleDateString()}
      </p>

      <AgentInfoContainer>
        <img
          src={listing.agent.avatar}
          alt="Agent"
          style={{ width: "50px", borderRadius: "50%" }}
        />
        <div>
          <p>
            {listing.agent.name} {listing.agent.surname}
          </p>
          <p>{listing.agent.email}</p>
          <p>{listing.agent.phone}</p>
        </div>
      </AgentInfoContainer>

      <DeleteListingButton onClick={() => setShowModal(true)} />

      <DeleteListingModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onDelete={handleDelete}
      />
    </CardContainer>
  );
};

export default HugeCard;
