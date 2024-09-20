import { useState } from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import RegionFilter from "./RegionFilter";
import PriceFilter from "./PriceFilter";
import AreaFilter from "./AreaFilter";
import BedroomFilter from "./BedroomFilter";

const FiltersContainer = styled.div``;

const FilterManager = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    regions: [],
    price: { min: "", max: "" },
    area: { min: "", max: "" },
    bedrooms: "",
  });

  const [clearAll, setClearAll] = useState(false);

  const handleFilterChange = (type, value) => {
    const updatedFilters = { ...filters, [type]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleClearAll = () => {
    setClearAll(true);
    setTimeout(() => setClearAll(false), 100);
    setFilters({
      regions: [],
      price: { min: "", max: "" },
      area: { min: "", max: "" },
      bedrooms: "",
    });
    onFilterChange({
      regions: [],
      price: { min: "", max: "" },
      area: { min: "", max: "" },
      bedrooms: "",
    });
  };

  return (
    <div>
      <FiltersContainer>
        <RegionFilter
          onFilterChange={(selectedRegions) =>
            handleFilterChange("regions", selectedRegions)
          }
          clearAll={clearAll}
        />
        <PriceFilter
          onFilterChange={(price) => handleFilterChange("price", price)}
          clearAll={clearAll}
        />
        <AreaFilter
          onFilterChange={(area) => handleFilterChange("area", area)}
          clearAll={clearAll}
        />

        <BedroomFilter
          onFilterChange={(bedrooms) =>
            handleFilterChange("bedrooms", bedrooms)
          }
          clearAll={clearAll}
        />

        <Button variant="danger" onClick={handleClearAll}>
          გასუფთავება
        </Button>
      </FiltersContainer>
    </div>
  );
};

export default FilterManager;
