import styled from "styled-components";

const CardContainer = styled.div`
  width: 22%;
  border: 1px solid #ddd;
  margin: 10px;
  padding: 15px;
`;

const IconTextContainer = styled.div`
  display: flex;
`;

const ListingCard = ({ listing }) => {
  return (
    <CardContainer>
      <img src={listing.image} style={{ width: "100%" }} />
      <p>{listing.is_rental ? "იყიდება" : "ქირავდება"}</p>

      <IconTextContainer>
        <p>{listing.price}</p>
      </IconTextContainer>

      <IconTextContainer>
        <p>{`${listing.city.name}, ${listing.address}`}</p>
      </IconTextContainer>

      <IconTextContainer>
        <p>{listing.bedrooms}</p>
        {listing.area} მ<sup>2</sup>
        <p>{listing.zip_code}</p>
      </IconTextContainer>
    </CardContainer>
  );
};

export default ListingCard;
