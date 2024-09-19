import { useState } from "react";
import styled from "styled-components";
import RegionFilter from "./RegionFilter";
import PriceFilter from "./PriceFilter";
import AreaFilter from "./AreaFilter";

const FiltersContainer = styled.div``;

const FilterManager = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    regions: [],
    price: { min: "", max: "" },
    area: { min: "", max: "" },
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

        <AreaFilter
          onFilterChange={(area) => handleFilterChange("area", area)}
        />
      </FiltersContainer>
    </div>
  );
};

export default FilterManager;
