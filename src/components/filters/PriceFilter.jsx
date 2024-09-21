import { useState, useEffect } from "react";
import styled from "styled-components";
import StyledButton from "../../styles/StyledButton";
import downArrow from "../../assets/icons/downArrow.png";
import upArrow from "../../assets/icons/upArrow.png";

const FilterContainer = styled.div`
  margin-bottom: 20px;
  position: relative;
`;

const SelectedPricesContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
`;

const PriceItem = styled.div`
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
    <FilterContainer>
      <div onClick={() => setShowFilter(!showFilter)}>
        <span>ფასი</span>
        <ArrowButton src={showFilter ? upArrow : downArrow} />
      </div>

      {showFilter && (
        <FilterCard>
          <ColumnContainer>
            <Column>
              <p>მინ. ფასი</p>
              <Input
                type="number"
                placeholder="Min"
                value={price.min}
                onChange={(e) => setPrice({ ...price, min: e.target.value })}
              />
              <button onClick={() => setPrice({ ...price, min: 50000 })}>
                50 000
              </button>
              <button onClick={() => setPrice({ ...price, min: 100000 })}>
                100 000
              </button>
              <button onClick={() => setPrice({ ...price, min: 150000 })}>
                150 000
              </button>
              <button onClick={() => setPrice({ ...price, min: 200000 })}>
                200 000
              </button>
              <button onClick={() => setPrice({ ...price, min: 300000 })}>
                300 000
              </button>
            </Column>

            <Column>
              <p>მაქს. ფასი</p>
              <Input
                type="number"
                placeholder="Max"
                value={price.max}
                onChange={(e) => setPrice({ ...price, max: e.target.value })}
              />
              <button onClick={() => setPrice({ ...price, max: 50000 })}>
                50 000
              </button>
              <button onClick={() => setPrice({ ...price, max: 100000 })}>
                100 000
              </button>
              <button onClick={() => setPrice({ ...price, max: 150000 })}>
                150 000
              </button>
              <button onClick={() => setPrice({ ...price, max: 200000 })}>
                200 000
              </button>
              <button onClick={() => setPrice({ ...price, max: 300000 })}>
                300 000
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

      <SelectedPricesContainer>
        {(price.min || price.max) && (
          <PriceItem>
            {`${price.min || "აირჩიეთ მინ."} - ${price.max || "აირჩიეთ მაქს."}`}{" "}
            <span onClick={handleRemovePrice}>X</span>
          </PriceItem>
        )}
      </SelectedPricesContainer>
    </FilterContainer>
  );
};

export default PriceFilter;
