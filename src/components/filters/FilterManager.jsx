import { useState } from "react";
import styled from "styled-components";
import RegionFilter from "./RegionFilter";
import PriceFilter from "./PriceFilter";

const FiltersContainer = styled.div``;

const FilterManager = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    regions: [],
    price: { min: "", max: "" },
  });

  const handleFilterChange = (type, value) => {
    const updatedFilters = { ...filters, [type]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div>
      <FiltersContainer>
        <RegionFilter
          onFilterChange={(selectedRegions) =>
            handleFilterChange("regions", selectedRegions)
          }
        />

        <PriceFilter
          onFilterChange={(price) => handleFilterChange("price", price)}
        />
      </FiltersContainer>
    </div>
  );
};

export default FilterManager;
