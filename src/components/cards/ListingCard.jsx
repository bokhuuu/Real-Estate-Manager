import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import priceIcon from "../../assets/icons/priceIcon.png";
import locationIcon from "../../assets/icons/locationIcon.png";
import bedroomIcon from "../../assets/icons/bedroomIcon.png";
import areaIcon from "../../assets/icons/areaIcon.png";
import zipIcon from "../../assets/icons/zipIcon.png";

const CardContainer = styled.div`
  width: 385px;
  height: 455px;
  border: 1px solid #ddd;
  margin: 10px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const ListingImage = styled.img`
  width: 385px;
  height: 305px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
`;

const SaleTag = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  width: 70px;
  height: 15px;
  background-color: rgba(2, 21, 38, 0.5);
  color: white;
  font-weight: 500;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
`;

const IconFeatureContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 90%;
  margin: 13px;
  align-items: center;
`;

const PriceiIcon = styled.img`
  width: 15px;
  height: 20px;
  margin-left: 8px;
`;

const PriceText = styled.span`
  font-size: 28px;
  font-weight: 700;
  font-family: "FiraGO", sans-serif;
`;

const Superscript = styled.sup`
  vertical-align: middle;
  font-size: 0.8em;
`;

const IconTextContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 400;

  img {
    width: 25px;
    height: 25px;
    margin-right: 10px;
  }

  p {
    margin: 0 45px 0 0;
  }
`;

const ListingCard = ({ listing }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/listing/${listing.id}`);
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <CardContainer onClick={handleCardClick}>
      <ImageWrapper>
        <ListingImage src={listing.image} />
        <SaleTag>{listing.is_rental ? "იყიდება" : "ქირავდება"}</SaleTag>
      </ImageWrapper>

      <IconFeatureContainer>
        <PriceContainer>
          <PriceText>{formatPrice(listing.price)}</PriceText>
          <PriceiIcon src={priceIcon} />
        </PriceContainer>
      </IconFeatureContainer>

      <IconFeatureContainer>
        <IconTextContainer>
          <img src={locationIcon} alt="Location Icon" />
          <p>{`${listing.city.name}, ${listing.address}`}</p>
        </IconTextContainer>
      </IconFeatureContainer>

      <IconFeatureContainer>
        <IconTextContainer>
          <img src={bedroomIcon} alt="Bedroom Icon" />
          <p>{listing.bedrooms}</p>
        </IconTextContainer>

        <IconTextContainer>
          <img src={areaIcon} alt="Area Icon" />
          <p>
            {listing.area} მ<Superscript>2</Superscript>
          </p>
        </IconTextContainer>

        <IconTextContainer>
          <img src={zipIcon} alt="ZIP Code Icon" />
          <p>{listing.zip_code}</p>
        </IconTextContainer>
      </IconFeatureContainer>
    </CardContainer>
  );
};

export default ListingCard;
