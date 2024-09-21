import { useEffect, useState } from "react";
import axios from "axios";
import ListingCard from "../components/cards/ListingCard";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
      <h5>ბინები მსგავს ლოკაციაზე</h5>
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
    </>
  );
};

export default ListingsSlider;
