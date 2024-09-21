import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import ListingCard from "../components/cards/ListingCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderContainer = styled.div`
  width: 1595px;
  height: 455px;
  margin-top: 30px;
`;

const SliderTitle = styled.h5`
  font-family: "FiraGO", sans-serif;
  font-size: 32px;
  font-weight: 700;
  text-align: left;
`;

const ListingsSlider = ({ regionId, currentListingId }) => {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = "9d0216df-a6d7-4aba-985c-4256f71f56fc";
    axios
      .get(
        `https://api.real-estate-manager.redberryinternship.ge/api/real-estates?region_id=${regionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const regionFilteredListings = response.data.filter(
          (listing) => listing.city.region_id === regionId
        );

        const finalFilteredListings = regionFilteredListings.filter(
          (listing) => listing.id !== currentListingId
        );
        setListings(finalFilteredListings);
      })
      .catch((error) =>
        console.error("Error fetching slider listings:", error)
      );
  }, [regionId, currentListingId]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <>
      <SliderTitle>ბინები მსგავს ლოკაციაზე</SliderTitle>
      <SliderContainer>
        <Slider {...settings}>
          {listings.map((listing) => (
            <div
              key={listing.id}
              onClick={() => navigate(`/listing/${listing.id}`)}
              style={{ padding: "10px" }}
            >
              <ListingCard listing={listing} />
            </div>
          ))}
        </Slider>
      </SliderContainer>
    </>
  );
};

export default ListingsSlider;
