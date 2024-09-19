import { useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import downArrow from "../../assets/icons/downArrow.png";
import upArrow from "../../assets/icons/upArrow.png";

const FilterContainer = styled.div`
  margin-bottom: 20px;
`;

const SelectedPricesContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
`;

const PriceItem = styled.div`
  background-color: #f0f0f0;
`;

const ArrowButton = styled.img`
  cursor: pointer;
  width: 20px;
`;

const PriceFilter = ({ onFilterChange }) => {
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
        <div>
          <input
            type="number"
            placeholder="Min"
            value={price.min}
            onChange={(e) => setPrice({ ...price, min: e.target.value })}
          />
          <input
            type="number"
            placeholder="Max"
            value={price.max}
            onChange={(e) => setPrice({ ...price, max: e.target.value })}
          />
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

          <div>
            <p>მინ.ფასი</p>
            <button onClick={() => setPrice({ ...price, min: 50000 })}>
              50000
            </button>
            <button onClick={() => setPrice({ ...price, min: 100000 })}>
              100000
            </button>
            <button onClick={() => setPrice({ ...price, min: 150000 })}>
              150000
            </button>
            <button onClick={() => setPrice({ ...price, min: 200000 })}>
              200000
            </button>
            <button onClick={() => setPrice({ ...price, min: 300000 })}>
              300000
            </button>
          </div>
          <div>
            <p>მაქს.ფასი</p>
            <button onClick={() => setPrice({ ...price, max: 50000 })}>
              50000
            </button>
            <button onClick={() => setPrice({ ...price, max: 100000 })}>
              100000
            </button>
            <button onClick={() => setPrice({ ...price, max: 150000 })}>
              150000
            </button>
            <button onClick={() => setPrice({ ...price, max: 200000 })}>
              200000
            </button>
            <button onClick={() => setPrice({ ...price, max: 300000 })}>
              300000
            </button>
          </div>
          <Button onClick={handleApplyFilters}>არჩევა</Button>
        </div>
      )}

      <SelectedPricesContainer>
        {(price.min || price.max) && (
          <PriceItem>
            {`${price.min || "აირჩიეთ"} - ${price.max || "აირჩიეთ"}`}{" "}
            <span onClick={handleRemovePrice}>X</span>
          </PriceItem>
        )}
      </SelectedPricesContainer>
    </FilterContainer>
  );
};

export default PriceFilter;
