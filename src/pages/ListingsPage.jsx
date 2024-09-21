import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import AddListingButton from "../components/buttons/AddListingButton";
import AddAgenButton from "../components/buttons/AddAgenButton";
import ListingCard from "../components/cards/ListingCard";
import FilterManager from "../components/filters/FilterManager";

const PageContainer = styled.div`
  padding: 10px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const ListingsContainer = styled.div`
  height: auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 cards in a row */
  gap: 20px;
`;

const ListingsPage = () => {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [filters, setFilters] = useState({
    regions: [],
    price: { min: "", max: "" },
    area: { min: "", max: "" },
    bedrooms: "",
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
        setListings(fetchedListings);

        const savedRegions = JSON.parse(
          localStorage.getItem("selectedRegions")
        );

        const savedPrice = JSON.parse(localStorage.getItem("selectedPrice"));
        const savedArea = JSON.parse(localStorage.getItem("selectedArea"));
        const savedBedrooms = localStorage.getItem("selectedBedrooms");

        const savedFilters = {
          regions: savedRegions || [],
          price: savedPrice || { min: "", max: "" },
          area: savedArea || { min: "", max: "" },
          bedrooms: savedBedrooms || "",
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
  };

  const filterListings = (allListings, activeFilters) => {
    let updatedListings = allListings;

    if (activeFilters.regions.length > 0) {
      updatedListings = updatedListings.filter((listing) =>
        activeFilters.regions.includes(listing.city.region_id)
      );
    }

    if (activeFilters.price.min || activeFilters.price.max) {
      updatedListings = updatedListings.filter(
        (listing) =>
          (activeFilters.price.min
            ? listing.price >= activeFilters.price.min
            : true) &&
          (activeFilters.price.max
            ? listing.price <= activeFilters.price.max
            : true)
      );
    }

    if (activeFilters.area.min || activeFilters.area.max) {
      updatedListings = updatedListings.filter(
        (listing) =>
          (activeFilters.area.min
            ? listing.area >= activeFilters.area.min
            : true) &&
          (activeFilters.area.max
            ? listing.area <= activeFilters.area.max
            : true)
      );
    }

    if (activeFilters.bedrooms) {
      updatedListings = updatedListings.filter(
        (listing) => listing.bedrooms === Number(activeFilters.bedrooms)
      );
    }

    setFilteredListings(updatedListings);
  };

  return (
    <PageContainer>
      <HeaderContainer>
        <FilterManager onFilterChange={handleFilterChange} />
        <ButtonsContainer>
          <AddAgenButton />
          <AddListingButton />
        </ButtonsContainer>
      </HeaderContainer>

      <ListingsContainer>
        {filteredListings.length > 0 ? (
          filteredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))
        ) : (
          <p>აღნიშნული მონაცემებით განცხადება არ მოიძებნა</p>
        )}
      </ListingsContainer>
    </PageContainer>
  );
};

export default ListingsPage;
