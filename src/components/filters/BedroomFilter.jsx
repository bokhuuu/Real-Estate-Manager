import { useState, useEffect } from "react";
import styled from "styled-components";
import StyledButton from "../../styles/StyledButton";
import downArrow from "../../assets/icons/downArrow.png";
import upArrow from "../../assets/icons/upArrow.png";

const FiltersContainer = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  margin-bottom: 50px;
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

const SelectedBedroomContainer = styled.div`
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  width: max-content;
  top: 50px;
  padding: 5px;
  gap: 10px;
  z-index: 10;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const FilterCard = styled.div`
  position: absolute;
  width: 282px;
  height: 198px;
  top: 95px;
  padding: 25px;
  z-index: 100;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const SelectedBedroomItem = styled.div`
  display: flex;
  padding: 5px;
  align-items: center;
  font-size: 14px;
  border-radius: 3px;
  background-color: #f0f0f0;
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const HeaderTitle = styled.h3`
  font-weight: bold;
  font-size: 16px;
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
  margin-top: 20px;
`;

const BedroomFilter = ({ onFilterChange, clearAll }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [bedrooms, setBedrooms] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const savedBedrooms = localStorage.getItem("selectedBedrooms");
    if (savedBedrooms) {
      setBedrooms(savedBedrooms);
      onFilterChange(savedBedrooms);
    }
  }, []);

  useEffect(() => {
    if (bedrooms) {
      localStorage.setItem("selectedBedrooms", bedrooms);
    }
  }, [bedrooms]);

  useEffect(() => {
    if (clearAll) {
      setBedrooms("");
      onFilterChange("");
      localStorage.removeItem("selectedBedrooms");
    }
  }, [clearAll]);

  const handleApplyFilters = () => {
    if (bedrooms === "" || bedrooms < 1) {
      setErrorMessage("გთხოვთ, შეიყვანოთ ვალიდური საძინებლების რაოდენობა");
      return;
    }
    setErrorMessage("");
    onFilterChange(bedrooms);
    setShowFilter(false);
  };

  const handleRemoveBedrooms = () => {
    setBedrooms("");
    onFilterChange("");
    localStorage.removeItem("selectedBedrooms");
  };

  return (
    <FiltersContainer>
      <FilterContainer>
        <div onClick={() => setShowFilter(!showFilter)}>
          <span>საძინებლების რაოდენობა</span>
          <ArrowButton src={showFilter ? upArrow : downArrow} />
        </div>

        {showFilter && (
          <FilterCard>
            <FilterHeader>
              <HeaderTitle>საძინებლების რაოდენობა</HeaderTitle>
            </FilterHeader>
            <input
              type="number"
              placeholder="0"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              style={{ width: "40px", textAlign: "center" }}
            />
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            <StyledButtonContainer>
              <StyledButton $variant="primary" onClick={handleApplyFilters}>
                არჩევა
              </StyledButton>
            </StyledButtonContainer>
          </FilterCard>
        )}

        {bedrooms && (
          <SelectedBedroomContainer>
            <SelectedBedroomItem>
              {`${bedrooms} საძინებელი`}{" "}
              <RemoveButton onClick={handleRemoveBedrooms}>X</RemoveButton>
            </SelectedBedroomItem>
          </SelectedBedroomContainer>
        )}
      </FilterContainer>
    </FiltersContainer>
  );
};

export default BedroomFilter;
