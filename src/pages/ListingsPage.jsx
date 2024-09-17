import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import AddListingButton from "../components/buttons/AddListingButton";
import AddAgenButton from "../components/buttons/AddAgenButton";
import ListingCard from "../components/ListingCard";

const PageContainer = styled.div`
  padding: 20px;
`;

const ButtonsContainer = styled.div`
  display: flex;
`;

const ListingsContainer = styled.div`
  display: flex;
`;

const ListingsPage = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const token = "9d0216df-a6d7-4aba-985c-4256f71f56fc";
    axios
      .get(
        "https://api.real-estate-manager.redberryinternship.ge/api/real-estates",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setListings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching listings:", error);
      });
  }, []);

  return (
    <PageContainer>
      <ButtonsContainer>
        <AddAgenButton />
        <AddListingButton />
      </ButtonsContainer>

      <ListingsContainer>
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </ListingsContainer>
    </PageContainer>
  );
};

export default ListingsPage;
