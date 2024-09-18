import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import downArrow from "../../assets/icons/downArrow.png";
import upArrow from "../../assets/icons/upArrow.png";

const FilterContainer = styled.div`
  margin-bottom: 20px;
`;

const SelectedRegionsContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
`;

const RegionItem = styled.div`
  background-color: #f0f0f0;
  margin-right: 10px;
  padding: 5px;
  border-radius: 3px;
  display: flex;
  align-items: center;
`;

const ArrowButton = styled.img`
  cursor: pointer;
  width: 20px;
`;

const RegionFilter = ({ onFilterChange }) => {
  const [regions, setRegions] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    axios
      .get("https://api.real-estate-manager.redberryinternship.ge/api/regions")
      .then((response) => {
        setRegions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching regions:", error);
      });
  }, []);

  useEffect(() => {
    const savedRegions = JSON.parse(localStorage.getItem("selectedRegions"));
    if (savedRegions && savedRegions.length > 0) {
      setSelectedRegions(savedRegions);
      onFilterChange(savedRegions);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedRegions", JSON.stringify(selectedRegions));
  }, [selectedRegions]);

  const handleRegionToggle = (regionId) => {
    const updatedSelection = selectedRegions.includes(regionId)
      ? selectedRegions.filter((id) => id !== regionId)
      : [...selectedRegions, regionId];
    setSelectedRegions(updatedSelection);
  };

  const handleApplyFilters = () => {
    onFilterChange(selectedRegions);
    setShowFilter(false);
  };

  const handleClearAll = () => {
    setSelectedRegions([]);
    onFilterChange([]);
  };

  const handleRemoveRegion = (regionId) => {
    const updatedSelection = selectedRegions.filter((id) => id !== regionId);
    setSelectedRegions(updatedSelection);
    onFilterChange(updatedSelection);
  };

  return (
    <FilterContainer>
      <div onClick={() => setShowFilter(!showFilter)}>
        <span>რეგიონი</span>
        <ArrowButton src={showFilter ? upArrow : downArrow} />
      </div>

      {showFilter && (
        <div>
          {regions.map((region) => (
            <label key={region.id}>
              <input
                type="checkbox"
                checked={selectedRegions.includes(region.id)}
                onChange={() => handleRegionToggle(region.id)}
              />
              {region.name}
            </label>
          ))}
          <Button onClick={handleApplyFilters}>არჩევა</Button>
        </div>
      )}

      <SelectedRegionsContainer>
        {selectedRegions.map((regionId) => {
          const region = regions.find((r) => r.id === regionId);

          if (!region) return null;

          return (
            <RegionItem key={regionId}>
              {region.name}{" "}
              <span onClick={() => handleRemoveRegion(regionId)}>X</span>
            </RegionItem>
          );
        })}
        {selectedRegions.length > 0 && (
          <Button onClick={handleClearAll}>გასუფთავება</Button>
        )}
      </SelectedRegionsContainer>
    </FilterContainer>
  );
};

export default RegionFilter;
