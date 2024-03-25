import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AddressLink from "../Components/AddressLink";
import PlaceGallery from "../Components/PlaceGallery";
import PerksOffers from "../Components/PerksOffers";
import { UserContext } from "../Context/userContext";
import BookingWidget from "../Components/BookingWidget";
import Spinner from "../Components/Spinner";

const SinglePlacePage = () => {
  const [place, setPlace] = useState(null);
  const [alreadyBooked, setAlreadyBooked] = useState(false);
  const [showFullExtraInfo, setShowFullExtraInfo] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      const { data } = await axios.get(`/place/${id}`);
      setPlace(data);
      setLoading(false);
    };
    //function to check whether current place is already booked by user
    const fetchUserDetails = async () => {
      const { data } = await axios.get(`/user`);
      data.bookedPlaces.includes(id) && setAlreadyBooked(true);
      setLoading(false);
    };
    fetchPlaceDetails();
    if (user) fetchUserDetails();
  }, []);

  if (!loading && !place) return;
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="mt-4 bg-gray-200 px-4 pt-3 rounded-3xl xs:px-8 xs:pt-8">
          <h1 className="text-3xl">{place.title}</h1>
          <AddressLink address={place.address} />
          <PlaceGallery title={place.title} photos={place.photos} />
          <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
            <div>
              <div>
                <h2 className="font-semibold text-2xl mb-1">Description</h2>
                {place.description}
              </div>
              <h2 className="font-semibold text-[17px] mt-4">
                Maximum number of guests allowed : {place.maxGuests}
              </h2>
              <div className="mt-6">
                <h2 className="text-2xl font-semibold">
                  What this place offers:
                </h2>
                <PerksOffers perks={place.perks} />
              </div>
            </div>
            <div className="mt-2 h-fi">
              {(!user || (user && user.id !== place.owner)) && (
                <BookingWidget place={place} alreadyBooked={alreadyBooked} />
              )}
            </div>
          </div>
          <div className="bg-white -mx-8 px-8 py-8 border-t">
            <div>
              <h2 className="font-semibold text-2xl">Extra info</h2>
            </div>
            <div className="mb-4 mt-2 text-[14px] text-gray-700 leading-5">
              {showFullExtraInfo ? (
                <p>
                  {place.extraInfo}
                  <span
                    className="text-pink cursor-pointer font-semibold"
                    onClick={() => setShowFullExtraInfo(false)}
                  >
                    ...show less
                  </span>
                </p>
              ) : (
                <p>
                  {place.extraInfo.substring(0, 600)}
                  <span
                    className="text-pink cursor-pointer font-semibold"
                    onClick={() => setShowFullExtraInfo(true)}
                  >
                    ..show more
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SinglePlacePage;
