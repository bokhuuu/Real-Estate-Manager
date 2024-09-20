import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const CardContainer = styled.div`
  width: 200px;
  border: 1px solid #ddd;
  margin: 10px;
  padding: 15px;
`;

const IconFeatureContainer = styled.div`
  display: flex;
`;

const ListingCard = ({ listing }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/listing/${listing.id}`);
  };
  return (
    <CardContainer onClick={handleCardClick}>
      <img src={listing.image} style={{ width: "50%" }} />
      <p>{listing.is_rental ? "იყიდება" : "ქირავდება"}</p>

      <IconFeatureContainer>
        <p>{listing.price}</p>
      </IconFeatureContainer>

      <IconFeatureContainer>
        <p>{`${listing.city.name}, ${listing.address}`}</p>
      </IconFeatureContainer>

      <IconFeatureContainer>
        <p>{listing.bedrooms}</p>
        {listing.area} მ<sup>2</sup>
        <p>{listing.zip_code}</p>
      </IconFeatureContainer>
    </CardContainer>
  );
};

export default ListingCard;
