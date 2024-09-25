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

const SelectedPriceContainer = styled.div`
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  width: max-content;
  top: 50px;
  gap: 10px;
  padding: 5px;
  z-index: 10;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const PriceGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 10px;

  input {
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
    border: 1px solid #ddd;
    border-radius: 5px;
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
  border: 1px solid #ddd;
  border-radius: 10px;
  z-index: 100;
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const SelectedPriceItem = styled.div`
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

const PriceFilter = ({ onFilterChange, clearAll }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [price, setPrice] = useState({ min: "", max: "" });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const savedPrice = JSON.parse(localStorage.getItem("selectedPrice"));
    if (savedPrice) {
      setPrice(savedPrice);
      onFilterChange(savedPrice);
    }
  }, []);

  useEffect(() => {
    if (price.min || price.max) {
      localStorage.setItem("selectedPrice", JSON.stringify(price));
    }
  }, [price]);

  useEffect(() => {
    if (clearAll) {
      setPrice({ min: "", max: "" });
      onFilterChange({ min: "", max: "" });
      localStorage.removeItem("selectedPrice");
    }
  }, [clearAll]);

  const handleApplyFilters = () => {
    if (price.min && price.max && Number(price.min) > Number(price.max)) {
      setErrorMessage("ჩაწერეთ ვალიდური მონაცემები");
      return;
    }
    setErrorMessage("");
    onFilterChange(price);
    setShowFilter(false);
  };

  const handleRemovePrice = () => {
    setPrice({ min: "", max: "" });
    onFilterChange({ min: "", max: "" });
    localStorage.removeItem("selectedPrice");
  };

  return (
    <FiltersContainer>
      <FilterContainer>
        <div onClick={() => setShowFilter(!showFilter)}>
          <span>საფასო კატეგორია</span>
          <ArrowButton src={showFilter ? upArrow : downArrow} />
        </div>

        {showFilter && (
          <FilterCard>
            <FilterHeader>
              <HeaderTitle>ფასის მიხედვით</HeaderTitle>
            </FilterHeader>
            <PriceGrid>
              <span>მინ. ფასი</span>
              <span>მაქს. ფასი</span>

              <input
                type="number"
                placeholder="დან"
                value={price.min}
                onChange={(e) => setPrice({ ...price, min: e.target.value })}
              />
              <input
                type="number"
                placeholder="მდე"
                value={price.max}
                onChange={(e) => setPrice({ ...price, max: e.target.value })}
              />

              <span onClick={() => setPrice({ ...price, min: 50000 })}>
                50 000
              </span>
              <span onClick={() => setPrice({ ...price, max: 50000 })}>
                50 000
              </span>

              <span onClick={() => setPrice({ ...price, min: 100000 })}>
                100 000
              </span>
              <span onClick={() => setPrice({ ...price, max: 100000 })}>
                100 000
              </span>

              <span onClick={() => setPrice({ ...price, min: 150000 })}>
                150 000
              </span>
              <span onClick={() => setPrice({ ...price, max: 150000 })}>
                150 000
              </span>

              <span onClick={() => setPrice({ ...price, min: 200000 })}>
                200 000
              </span>
              <span onClick={() => setPrice({ ...price, max: 200000 })}>
                200 000
              </span>

              <span onClick={() => setPrice({ ...price, min: 300000 })}>
                300 000
              </span>
              <span onClick={() => setPrice({ ...price, max: 300000 })}>
                300 000
              </span>
            </PriceGrid>

            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            <StyledButtonContainer>
              <StyledButton $variant="primary" onClick={handleApplyFilters}>
                არჩევა
              </StyledButton>
            </StyledButtonContainer>
          </FilterCard>
        )}

        <SelectedPriceContainer>
          {(price.min || price.max) && (
            <SelectedPriceItem>
              {`${price.min || "აირჩიეთ მინ."} - ${
                price.max || "აირჩიეთ მაქს."
              }`}{" "}
              <RemoveButton onClick={handleRemovePrice}>X</RemoveButton>
            </SelectedPriceItem>
          )}
        </SelectedPriceContainer>
      </FilterContainer>
    </FiltersContainer>
  );
};

export default PriceFilter;
