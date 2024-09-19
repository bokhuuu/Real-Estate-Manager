import { useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import downArrow from "../../assets/icons/downArrow.png";
import upArrow from "../../assets/icons/upArrow.png";

const FilterContainer = styled.div`
  margin-bottom: 20px;
`;

const ArrowButton = styled.img`
  cursor: pointer;
  width: 20px;
`;

const BedroomFilter = ({ onFilterChange }) => {
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
    <FilterContainer>
      <div onClick={() => setShowFilter(!showFilter)}>
        <span>საძინებლების რაოდენობა</span>
        <ArrowButton src={showFilter ? upArrow : downArrow} />
      </div>

      {showFilter && (
        <div>
          <input
            type="number"
            placeholder="-"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
          />
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <Button onClick={handleApplyFilters}>არჩევა</Button>
        </div>
      )}

      {bedrooms && (
        <div>
          <span>{bedrooms} საძინებელი</span>{" "}
          <span onClick={handleRemoveBedrooms}>X</span>
        </div>
      )}
    </FilterContainer>
  );
};

export default BedroomFilter;
