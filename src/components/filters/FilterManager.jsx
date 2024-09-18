import { useState } from "react";
import styled from "styled-components";
import AreaFilter from "./AreaFilter";
import BedroomFilter from "./BedroomFilter";
import PriceFilter from "./PriceFilter";
import RegionFilter from "./RegionFilter";

const FiltersContainer = styled.div``;

const FilterManager = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    regions: [],
  });

  const handleRegionFilterChange = (selectedRegions) => {
    const updatedFilters = { ...filters, regions: selectedRegions };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };
  return (
    <div>
      <FiltersContainer>
        <RegionFilter onFilterChange={handleRegionFilterChange} />
        <PriceFilter onFilterChange={onFilterChange} />
        <AreaFilter onFilterChange={onFilterChange} />
        <BedroomFilter onFilterChange={onFilterChange} />
      </FiltersContainer>
    </div>
  );
};

export default FilterManager;
