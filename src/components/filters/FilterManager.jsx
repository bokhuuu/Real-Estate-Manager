import AreaFilter from "./AreaFilter";
import BedroomFilter from "./BedroomsFilter";
import PriceFilter from "./PriceFilter";
import RegionFilter from "./RegionFilter";

const FilterManager = ({ onFilterChange }) => {
  return (
    <div>
      <RegionFilter onFilterChange={onFilterChange} />
      <PriceFilter onFilterChange={onFilterChange} />
      <AreaFilter onFilterChange={onFilterChange} />
      <BedroomFilter onFilterChange={onFilterChange} />
    </div>
  );
};

export default FilterManager;
