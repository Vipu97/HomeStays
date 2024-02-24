import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import AddPlacePage from "./AddPlacePage";
import axios from "axios";
import Spinner from "../Components/Spinner";

const PlacesPages = () => {
  const { action } = useParams();
  const [redirect, setRedirect] = useState("");
  const [places, setPlaces] = useState([]);
  const [refresh,setRefresh] = useState(false);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    axios.get("/place/account").then(({ data }) => {
      setPlaces(data);
      setLoading(false);
    });
  },[refresh]);
  
  const removePlace = async(placeId) => {
    await axios.delete(`/${placeId}`)
    setRefresh(!refresh);
  } 
  if (redirect) return <Navigate to={redirect} />;
  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="bg-pink text-white rounded-full inline-flex py-2 px-6 mb-4 border-gray-100 font-semibold text-xl items-center hover:scale-105 transition-all"
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new place
          </Link>
        </div>
      )}
      {action === "new" && <AddPlacePage />}
      {loading && <Spinner width={150} height={150} />}
      {!loading && places.length > 0 &&
        places.map((place) => {
          return (
            <div className="w-full bg-gray-100 rounded-md p-4 mt-5 m-auto max-w-screen-md flex-col" >
              <div
                className="flex gap-5 cursor-pointer"
              >
                <div className="flex grow shrink-0 w-1/5 h-36 bg-gray-200 rounded-3xl">
                  <img
                    src={`http://localhost:4000/uploads/${place.photos[0]}`}
                    alt="preview-photo"
                    className="w-full rounded-3xl h-full"
                  />
                </div>
                <div className="grow-0 shrink">
                  <h2 className="font-semibold text-xl">{place.title}</h2>
                  <p className="text-sm mt-2">{place.description.substr(0,400)}{place.description.length > 400 && '......'}</p>
                </div>
              </div>
              <div className="flex justify-center gap-20 mt-4">
                <Link to={`/place/${place._id}`} className="px-4 py-2 bg-pink text-white font-semibold rounded-3xl hover:scale-105 transition-all">Preview Place</Link>
                <Link to = {`/account/places/${place._id}`} className="px-4 py-2 bg-pink text-white font-semibold rounded-3xl hover:scale-105 transition-all" >Edit Your Place</Link>
                <button className="px-4 py-2 bg-pink text-white font-semibold rounded-3xl hover:scale-105 transition-all" 
                onClick={() => removePlace(place._id)}>Remove Place
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};
export default PlacesPages;
