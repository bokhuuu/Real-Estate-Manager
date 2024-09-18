import styled from "styled-components";

const CardContainer = styled.div`
  width: 22%;
  border: 1px solid #ddd;
  margin: 10px;
  padding: 15px;
`;

const IconFeatureContainer = styled.div`
  display: flex;
`;

const ListingCard = ({ listing }) => {
  return (
    <CardContainer>
      <img src={listing.image} style={{ width: "100%" }} />
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
