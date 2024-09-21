import { useState, useEffect } from "react";
import styled from "styled-components";
import StyledButton from "../../styles/StyledButton";
import downArrow from "../../assets/icons/downArrow.png";
import upArrow from "../../assets/icons/upArrow.png";

const FilterContainer = styled.div`
  margin-bottom: 20px;
  position: relative;
`;

const SelectedAreasContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
`;

const AreaItem = styled.div`
  background-color: #f0f0f0;
  padding: 5px;
  margin-right: 10px;
`;

const ArrowButton = styled.img`
  cursor: pointer;
  width: 20px;
  margin-left: 10px;
`;

const FilterCard = styled.div`
  position: absolute;
  top: 35px;
  left: 0;
  width: 400px;
  background-color: white;
  border: 1px solid #ddd;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
`;

const ColumnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  width: 60px;
  padding: 5px;
  margin-top: 5px;
  margin-bottom: 10px;
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
    <FilterContainer>
      <div onClick={() => setShowFilter(!showFilter)}>
        <span>ფართობი</span>
        <ArrowButton src={showFilter ? upArrow : downArrow} />
      </div>

      {showFilter && (
        <FilterCard>
          <ColumnContainer>
            <Column>
              <p>მინ. ფართობი</p>
              <Input
                type="number"
                placeholder="Min"
                value={area.min}
                onChange={(e) => setArea({ ...area, min: e.target.value })}
              />
              <button onClick={() => setArea({ ...area, min: 50 })}>50</button>
              <button onClick={() => setArea({ ...area, min: 100 })}>
                100
              </button>
              <button onClick={() => setArea({ ...area, min: 150 })}>
                150
              </button>
              <button onClick={() => setArea({ ...area, min: 200 })}>
                200
              </button>
              <button onClick={() => setArea({ ...area, min: 300 })}>
                300
              </button>
            </Column>

            <Column>
              <p>მაქს. ფართობი</p>
              <Input
                type="number"
                placeholder="Max"
                value={area.max}
                onChange={(e) => setArea({ ...area, max: e.target.value })}
              />
              <button onClick={() => setArea({ ...area, max: 50 })}>50</button>
              <button onClick={() => setArea({ ...area, max: 100 })}>
                100
              </button>
              <button onClick={() => setArea({ ...area, max: 150 })}>
                150
              </button>
              <button onClick={() => setArea({ ...area, max: 200 })}>
                200
              </button>
              <button onClick={() => setArea({ ...area, max: 300 })}>
                300
              </button>
            </Column>
          </ColumnContainer>

          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

          <StyledButton
            $variant="primary"
            style={{ width: "70px", height: "25px" }}
            onClick={handleApplyFilters}
          >
            არჩევა
          </StyledButton>
        </FilterCard>
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
