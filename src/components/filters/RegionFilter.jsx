import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import StyledButton from "../../styles/StyledButton";
import downArrow from "../../assets/icons/downArrow.png";
import upArrow from "../../assets/icons/upArrow.png";

const FiltersContainer = styled.div`
  position: relative;
  display: flex;
  margin-bottom: 50px;
  align-items: flex-start;
  gap: 20px;
`;

const FilterContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const ArrowButton = styled.img`
  width: 20px;
  margin-left: 10px;
  cursor: pointer;
`;

const SelectedRegionsContainer = styled.div`
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  width: max-content;
  top: 20px;
  padding: 5px;
  gap: 10px;
  z-index: 10;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const RegionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-bottom: 20px;
  gap: 10px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
`;

const RegionCheckbox = styled.input`
  margin-right: 10px;
`;

const SelectedRegionItem = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  font-size: 14px;
  border-radius: 3px;
  background-color: #f0f0f0;
`;

const FilterCard = styled.div`
  position: absolute;
  width: 730px;
  height: 285px;
  top: 95px;
  padding: 25px;
  z-index: 100;
  border: 1px solid #ddd;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const HeaderTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  text-align: right;
`;

const RemoveButton = styled.span`
  margin-left: 5px;
  color: red;
  cursor: pointer;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const RegionFilter = ({ onFilterChange, clearAll }) => {
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

  useEffect(() => {
    if (clearAll) {
      setSelectedRegions([]);
      onFilterChange([]);
      localStorage.removeItem("selectedRegions");
    }
  }, [clearAll]);

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

  const handleRemoveRegion = (regionId) => {
    const updatedSelection = selectedRegions.filter((id) => id !== regionId);
    setSelectedRegions(updatedSelection);
    onFilterChange(updatedSelection);
  };

  return (
    <FiltersContainer>
      <FilterContainer>
        <div onClick={() => setShowFilter(!showFilter)}>
          <span>რეგიონი</span>
          <ArrowButton src={showFilter ? upArrow : downArrow} />
        </div>

        {showFilter && (
          <FilterCard>
            <FilterHeader>
              <HeaderTitle>რეგონის მიხედვით</HeaderTitle>
            </FilterHeader>
            <RegionGrid>
              {regions.map((region) => (
                <CheckboxLabel key={region.id}>
                  <RegionCheckbox
                    type="checkbox"
                    checked={selectedRegions.includes(region.id)}
                    onChange={() => handleRegionToggle(region.id)}
                  />
                  {region.name}
                </CheckboxLabel>
              ))}
            </RegionGrid>

            <StyledButtonContainer>
              <StyledButton $variant="primary" onClick={handleApplyFilters}>
                არჩევა
              </StyledButton>
            </StyledButtonContainer>
          </FilterCard>
        )}

        <SelectedRegionsContainer>
          {selectedRegions.map((regionId) => {
            const region = regions.find((r) => r.id === regionId);

            if (!region) return null;

            return (
              <SelectedRegionItem key={regionId}>
                {region.name}{" "}
                <RemoveButton onClick={() => handleRemoveRegion(regionId)}>
                  X
                </RemoveButton>
              </SelectedRegionItem>
            );
          })}
        </SelectedRegionsContainer>
      </FilterContainer>
    </FiltersContainer>
  );
};

export default RegionFilter;
