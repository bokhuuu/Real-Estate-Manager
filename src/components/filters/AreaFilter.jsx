import { useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import downArrow from "../../assets/icons/downArrow.png";
import upArrow from "../../assets/icons/upArrow.png";

const FilterContainer = styled.div`
  margin-bottom: 20px;
`;

const SelectedAreasContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
`;

const AreaItem = styled.div`
  background-color: #f0f0f0;
`;

const ArrowButton = styled.img`
  cursor: pointer;
  width: 20px;
`;

const AreaFilter = ({ onFilterChange }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [area, setArea] = useState({ min: "", max: "" });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const savedArea = JSON.parse(localStorage.getItem("selectedArea"));
    if (savedArea) {
      setArea(savedArea);
      onFilterChange(savedArea);
    }
  }, []);

  useEffect(() => {
    if (area.min || area.max) {
      localStorage.setItem("selectedArea", JSON.stringify(area));
    }
  }, [area]);

  const handleApplyFilters = () => {
    if (area.min && area.max && Number(area.min) > Number(area.max)) {
      setErrorMessage("ჩაწერეთ ვალიდური მონაცემები");
      return;
    }
    setErrorMessage("");
    onFilterChange(area);
    setShowFilter(false);
  };

  const handleRemoveArea = () => {
    setArea({ min: "", max: "" });
    onFilterChange({ min: "", max: "" });
    localStorage.removeItem("selectedArea");
  };

  return (
    <FilterContainer>
      <div onClick={() => setShowFilter(!showFilter)}>
        <span>ფართობი</span>
        <ArrowButton src={showFilter ? upArrow : downArrow} />
      </div>

      {showFilter && (
        <div>
          <input
            type="number"
            placeholder="Min"
            value={area.min}
            onChange={(e) => setArea({ ...area, min: e.target.value })}
          />
          <input
            type="number"
            placeholder="Max"
            value={area.max}
            onChange={(e) => setArea({ ...area, max: e.target.value })}
          />
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

          <div>
            <p>მინ. ფართობი</p>
            <button onClick={() => setArea({ ...area, min: 50 })}>50</button>
            <button onClick={() => setArea({ ...area, min: 100 })}>100</button>
            <button onClick={() => setArea({ ...area, min: 150 })}>150</button>
            <button onClick={() => setArea({ ...area, min: 200 })}>200</button>
            <button onClick={() => setArea({ ...area, min: 300 })}>300</button>
          </div>
          <div>
            <p>მაქს. ფართობი</p>
            <button onClick={() => setArea({ ...area, max: 50 })}>50</button>
            <button onClick={() => setArea({ ...area, max: 100 })}>100</button>
            <button onClick={() => setArea({ ...area, max: 150 })}>150</button>
            <button onClick={() => setArea({ ...area, max: 200 })}>200</button>
            <button onClick={() => setArea({ ...area, max: 300 })}>300</button>
          </div>
          <Button onClick={handleApplyFilters}>არჩევა</Button>
        </div>
      )}

      <SelectedAreasContainer>
        {(area.min || area.max) && (
          <AreaItem>
            {`${area.min || "აირჩიეთ მინ."} - ${area.max || "აირჩიეთ მაქს."}`}{" "}
            <span onClick={handleRemoveArea}>X</span>
          </AreaItem>
        )}
      </SelectedAreasContainer>
    </FilterContainer>
  );
};

export default AreaFilter;
