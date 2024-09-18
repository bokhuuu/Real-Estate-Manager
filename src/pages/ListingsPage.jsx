import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import AddListingButton from "../components/buttons/AddListingButton";
import AddAgenButton from "../components/buttons/AddAgenButton";
import ListingCard from "../components/cards/ListingCard";
import FilterManager from "../components/filters/FilterManager";

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
  const [filteredListings, setFilteredListings] = useState([]);
  const [filters, setFilters] = useState({
    regions: [],
  });

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
        const fetchedListings = response.data;
        setListings(response.data);

        const savedRegions = JSON.parse(
          localStorage.getItem("selectedRegions")
        );

        const savedFilters = {
          regions: savedRegions || [],
        };

        setFilters(savedFilters);
        filterListings(fetchedListings, savedFilters);
      })
      .catch((error) => {
        console.error("Error fetching listings:", error);
      });
  }, []);

  useEffect(() => {
    filterListings(listings, filters);
  }, [filters, listings]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    filterListings(listings, newFilters);
  };

  const filterListings = (allListings, activeFilters) => {
    let updatedListings = allListings;

    if (activeFilters.regions.length > 0) {
      updatedListings = updatedListings.filter((listing) =>
        activeFilters.regions.includes(listing.city.region_id)
      );
    }

    setFilteredListings(updatedListings);
  };

  return (
    <PageContainer>
      <ButtonsContainer>
        <AddAgenButton />
        <AddListingButton />
      </ButtonsContainer>

      <FilterManager onFilterChange={handleFilterChange} />

      <ListingsContainer>
        {filteredListings.length > 0 ? (
          filteredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))
        ) : (
          <p>According to the mentioned data, no application was found</p>
        )}
      </ListingsContainer>
    </PageContainer>
  );
};

export default ListingsPage;
