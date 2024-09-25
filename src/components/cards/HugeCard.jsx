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
  position: relative;
  width: 1590px;
  height: 715px;
  display: flex;
  gap: 68px;
`;

const SaleTag = styled.div`
  position: absolute;
  width: 145px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 25px;
  left: 25px;
  font-weight: 500;
  font-size: 20px;
  border-radius: 20px;
  background-color: rgba(2, 21, 38, 0.5);
  color: white;
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

  span {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    font-size: 14px;
    color: rgba(103, 110, 118, 1);
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
    font-family: "FiraGO", sans-serif;
    font-weight: 400;
    font-size: 24px;
    margin: 0;
  }
`;

const PriceiIcon = styled.img`
  width: 15px;
  height: 40px;
  margin-left: 8px;
`;

const PriceText = styled.span`
  font-family: "FiraGO", sans-serif;
  font-weight: 700;
  font-size: 28px;
`;

const DescriptionContainer = styled.p`
  width: 500px;
  height: 80px;
  padding: 5px;
  border: 3px dotted #000;
`;

const AgentInfoContainer = styled.div`
  width: 500px;
  height: 175px;
  margin-top: 20px;
`;

const AgentDetails = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 72px;
    height: 72px;
    margin: 17px 10px 17px 0;
  }

  p {
    font-family: "FiraGO", sans-serif;
    font-weight: 400;
    font-size: 16px;
    margin: 12px 0;
    color: rgba(2, 21, 38, 1);
  }

  span {
    display: block;
    font-family: "FiraGO", sans-serif;
    font-weight: 400;
    font-size: 16px;
    margin-top: 4px;
    color: rgba(103, 110, 118, 1);
  }
`;

const EmailIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

const PhoneIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
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
          <span>
            გამოქვეყნების თარიღი{" "}
            {new Date(listing.created_at).toLocaleDateString()}
          </span>
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
            <AgentDetails>
              <img src={listing.agent.avatar} />
              <div>
                <p>
                  {listing.agent.name} {listing.agent.surname}
                  <span>აგენტი</span>
                </p>
              </div>
            </AgentDetails>

            <p>
              <EmailIcon src={mailIcon} />
              {listing.agent.email}
            </p>
            <p>
              <PhoneIcon src={phoneIcon} />
              {formatPhoneNumber(listing.agent.phone)}
            </p>
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
