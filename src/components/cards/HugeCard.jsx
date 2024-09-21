import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import DeleteListingButton from "../buttons/DeleteListingButton";
import DeleteListingModal from "../modals/DeleteListingModal";
import priceIcon from "../../assets/icons/priceIcon.png";
import locationIcon from "../../assets/icons/locationIcon.png";
import bedroomIcon from "../../assets/icons/bedroomIcon.png";
import areaIcon from "../../assets/icons/areaIcon.png";
import zipIcon from "../../assets/icons/zipIcon.png";
import arrowBackIcon from "../../assets/icons/arrowBackIcon.png";
import mailIcon from "../../assets/icons/mailIcon.png";
import phoneIcon from "../../assets/icons/phoneIcon.png";

const BackArrowIcon = styled.img`
  width: 35px;
  height: 35px;
  margin: 10px 10px 10px 0px;
  cursor: pointer;
`;

const CardContainer = styled.div`
  width: 1590px;
  height: 715px;
  display: flex;
  position: relative;
`;

const SaleTag = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  width: 145px;
  height: 45px;
  background-color: rgba(2, 21, 38, 0.5);
  color: white;
  font-weight: 500;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;

const ImageSection = styled.div`
  width: 840px;
  height: 670px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 15px;
  }

  p {
    margin-top: 10px;
    font-size: 14px;
  }
`;

const DetailsSection = styled.div`
  margin-top: 20px;
  padding-left: 80px;
`;

const IconFeatureContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 35px;

  img {
    width: 24px;
    height: 24px;
    margin-right: 15px;
  }

  p {
    margin: 0;
    font-size: 24px;
    font-weight: 400;
    font-family: "FiraGO", sans-serif;
  }
`;

const PriceiIcon = styled.img`
  width: 15px;
  height: 40px;
  margin-left: 8px;
`;

const PriceText = styled.span`
  font-size: 28px;
  font-weight: 700;
  font-family: "FiraGO", sans-serif;
`;
const AgentInfoContainer = styled.div`
  width: 500px;
  height: 175px;
  display: flex;
  align-items: center;
  margin-top: 30px;
`;

const AgentDetails = styled.div`
  margin-left: 15px;

  p {
    margin: 12px 0;
    font-size: 20px;
    margin-bottom: 10px;
  }
`;

const EmailIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const PhoneIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const DescriptionContainer = styled.p`
  width: 500px;
  height: 80px;
`;

const HugeCard = ({ listing, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleDelete = () => {
    setShowModal(false);
    onDelete();
  };

  const handleBackClick = () => {
    navigate("/");
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const formatPhoneNumber = (phone) => {
    return phone.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3");
  };

  return (
    <>
      <BackArrowIcon src={arrowBackIcon} onClick={handleBackClick} />

      <CardContainer>
        <SaleTag>{listing.is_rental ? "იყიდება" : "ქირავდება"}</SaleTag>

        <ImageSection>
          <img src={listing.image} />
          <p>
            გამოქვეყნების თარიღი{" "}
            {new Date(listing.created_at).toLocaleDateString()}
          </p>
        </ImageSection>

        <DetailsSection>
          <IconFeatureContainer>
            <PriceText>{formatPrice(listing.price)}</PriceText>
            <PriceiIcon src={priceIcon} />
          </IconFeatureContainer>

          <IconFeatureContainer>
            <img src={locationIcon} />
            <p>{`${listing.city.name}, ${listing.address}`}</p>
          </IconFeatureContainer>

          <IconFeatureContainer>
            <img src={areaIcon} />
            <p>
              ფართი {listing.area} მ<sup>2</sup>
            </p>
          </IconFeatureContainer>

          <IconFeatureContainer>
            <img src={bedroomIcon} />
            <p>საძინებელი {listing.bedrooms} </p>
          </IconFeatureContainer>
          <IconFeatureContainer>
            <img src={zipIcon} />
            <p>საფოსტო ინდექსი {listing.zip_code}</p>
          </IconFeatureContainer>

          <DescriptionContainer>{listing.description}</DescriptionContainer>

          <AgentInfoContainer>
            <img src={listing.agent.avatar} />
            <AgentDetails>
              <p>
                {listing.agent.name} {listing.agent.surname}
              </p>
              აგენტი
              <p>
                <EmailIcon src={mailIcon} />
                {listing.agent.email}
              </p>
              <p>
                <PhoneIcon src={phoneIcon} />
                {formatPhoneNumber(listing.agent.phone)}
              </p>
            </AgentDetails>
          </AgentInfoContainer>

          <DeleteListingButton onClick={() => setShowModal(true)} />
          <DeleteListingModal
            show={showModal}
            onHide={() => setShowModal(false)}
            onDelete={handleDelete}
          />
        </DetailsSection>
      </CardContainer>
    </>
  );
};

export default HugeCard;
