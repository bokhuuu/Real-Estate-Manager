import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import HugeCard from "../components/cards/HugeCard";
import ListingSlider from "../components/ListingSlider";

const InternalListingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    const token = "9d0216df-a6d7-4aba-985c-4256f71f56fc";
    axios
      .get(
        `https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setListing(response.data);
      })
      .catch((error) => console.error("Error fetching listing:", error));
  }, [id]);

  const handleDelete = () => {
    const token = "9d0216df-a6d7-4aba-985c-4256f71f56fc";
    axios
      .delete(
        `https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {});
  };

  if (!listing) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <HugeCard listing={listing} onDelete={handleDelete} />{" "}
      <ListingSlider
        regionId={listing.city.region_id}
        currentListingId={listing.id}
      />
    </>
  );
};

export default InternalListingPage;
