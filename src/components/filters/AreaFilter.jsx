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

const SelectedAreaContainer = styled.div`
  position: absolute;
  width: max-content;
  display: flex;
  flex-wrap: wrap;
  top: 50px;
  gap: 10px;
  padding: 5px;
  z-index: 10;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const AreaGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 10px;

  input {
    width: 100%;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-sizing: border-box;
  }

  span {
    display: inline-block;
    margin-left: 5px;
    text-align: start;
    cursor: pointer;
  }

  input:nth-child(3),
  span:nth-child(5),
  span:nth-child(7),
  span:nth-child(9),
  span:nth-child(11),
  span:nth-child(13) {
    grid-column: 1;
  }

  input:nth-child(4),
  span:nth-child(6),
  span:nth-child(8),
  span:nth-child(10),
  span:nth-child(12),
  span:nth-child(14) {
    grid-column: 2;
  }
`;

const FilterCard = styled.div`
  position: absolute;
  width: 382px;
  height: 372px;
  top: 95px;
  padding: 25px;
  z-index: 100;
  background-color: white;
  border-radius: 10px;
  border: 1px solid #ddd;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const SelectedAreaItem = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
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
  margin-top: 20px;
`;

const AreaFilter = ({ onFilterChange, clearAll }) => {
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

  useEffect(() => {
    if (clearAll) {
      setArea({ min: "", max: "" });
      onFilterChange({ min: "", max: "" });
      localStorage.removeItem("selectedArea");
    }
  }, [clearAll]);

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
    <FiltersContainer>
      <FilterContainer>
        <div onClick={() => setShowFilter(!showFilter)}>
          <span>ფართობი</span>
          <ArrowButton src={showFilter ? upArrow : downArrow} />
        </div>

        {showFilter && (
          <FilterCard>
            <FilterHeader>
              <HeaderTitle>ფართობის მიხედვით</HeaderTitle>
            </FilterHeader>
            <AreaGrid>
              <span>მინ. ფართობი</span>
              <span>მაქს. ფართობი</span>

              <input
                type="number"
                placeholder="დან"
                value={area.min}
                onChange={(e) => setArea({ ...area, min: e.target.value })}
              />
              <input
                type="number"
                placeholder="მდე"
                value={area.max}
                onChange={(e) => setArea({ ...area, max: e.target.value })}
              />

              <span onClick={() => setArea({ ...area, min: 50 })}>50</span>
              <span onClick={() => setArea({ ...area, max: 50 })}>50</span>

              <span onClick={() => setArea({ ...area, min: 100 })}>100</span>
              <span onClick={() => setArea({ ...area, max: 100 })}>100</span>

              <span onClick={() => setArea({ ...area, min: 150 })}>150</span>
              <span onClick={() => setArea({ ...area, max: 150 })}>150</span>

              <span onClick={() => setArea({ ...area, min: 200 })}>200</span>
              <span onClick={() => setArea({ ...area, max: 200 })}>200</span>

              <span onClick={() => setArea({ ...area, min: 300 })}>300</span>
              <span onClick={() => setArea({ ...area, max: 300 })}>300</span>
            </AreaGrid>

            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            <StyledButtonContainer>
              <StyledButton $variant="primary" onClick={handleApplyFilters}>
                არჩევა
              </StyledButton>
            </StyledButtonContainer>
          </FilterCard>
        )}

        <SelectedAreaContainer>
          {(area.min || area.max) && (
            <SelectedAreaItem>
              {`${area.min || "აირჩიეთ მინ."} - ${area.max || "აირჩიეთ მაქს."}`}{" "}
              <RemoveButton onClick={handleRemoveArea}>X</RemoveButton>
            </SelectedAreaItem>
          )}
        </SelectedAreaContainer>
      </FilterContainer>
    </FiltersContainer>
  );
};

export default AreaFilter;
