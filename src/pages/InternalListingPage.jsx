import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import HugeCard from "../components/cards/HugeCard";
import ListingSlider from "../components/ListingSlider";

const PageContainer = styled.div`
  width: 1596px;
  height: auto;
  margin: 10px 162px 0 162px;
`;

const InternalListingPage = () => {
  const [listing, setListing] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = "9d0216df-a6d7-4aba-985c-4256f71f56fc";

    axios
      .get(
        `https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setListing(response.data);
      })
      .catch((error) => console.error("Error fetching listing:", error));
  }, [id]);

  const handleDelete = () => {
    const token = "9d0216df-a6d7-4aba-985c-4256f71f56fc";

    axios
      .delete(
        `https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        navigate("/");
      });
  };

  if (!listing) {
    return <p>Loading...</p>;
  }

  return (
    <PageContainer>
      <HugeCard listing={listing} onDelete={handleDelete} />{" "}
      <ListingSlider
        regionId={listing.city.region_id}
        currentListingId={listing.id}
      />
    </PageContainer>
  );
};

export default InternalListingPage;
