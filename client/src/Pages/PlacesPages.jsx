import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import AddPlacePage from "./AddPlacePage";
import axios from "axios";
import Spinner from "../Components/Spinner";
import Image from "../Components/Image";
import NoPlaceAdded from "../Components/NoPlaceAdded";
import {Button,Modal} from "antd";
import { toast } from "react-toastify";

const PlacesPages = () => {
  const { action } = useParams();
  const [redirect, setRedirect] = useState("");
  const [places, setPlaces] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalOpen,setModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/place/account").then(({ data }) => {
      setPlaces(data);
      setLoading(false);
    });
  }, [refresh]);

  const removePlace = async (placeId) => {
    try {
      await axios.delete(`/place`, { data: { placeId } });
      toast.success("Place removed successfully")
      setRefresh(!refresh);
    } catch (err) {
      console.log(err.message);
    }
  };
  function handleOkModalButton(placeId){
    removePlace(placeId);
    setModalOpen(false);
  }
  if (redirect) return <Navigate to={redirect} />;
  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="bg-pink text-white rounded-full inline-flex py-2 
            px-6 mb-4 border-gray-100 
            font-semibold text-xl items-center hover:scale-105 transition-all"
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
      {loading && <Spinner />}
      {!loading &&
        places.length === 0 ?
        <NoPlaceAdded />
        : (places.map((place) => {
          return (
            <div className="w-[95%] bg-gray-100 rounded-xl p-2 mt-5 flex-col max-w-[750px] mx-auto"
              key={place._id}>
              <div className="flex flex-col gap-2 cursor-pointer sm:flex-row sm:gap-5 items-center">
                <div className="h-36 w-[270px] bg-gray-200 rounded-xl mx-auto shrink-0 sm:w-[200px] md:h-32">
                  <Image
                    src={place.photos[0]}
                    alt="preview-photo"
                    className="rounded-xl object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="font-semibold text-[18px] text-center mb-2">{place.title}</h2>
                  <p className="text-sm hidden sm:inline-block">
                    {place.description.substr(0, 300)}
                    {place.description.length > 300 && "......"}
                  </p>
                </div>
              </div>
              <div className="flex justify-center gap-x-8 gap-y-2 mt-2 sm:gap-24 flex-wrap sm:mt-3">
                <Button className="px-4 py-2 bg-pink text-white font-semibold rounded-3xl flex justify-center items-center text-[18px] h-10"
                  onClick={() => navigate(`/place/${place._id}`)}>
                  Preview Place
                </Button>
                <Button className="px-4 py-2 bg-pink text-white font-semibold rounded-3xl flex justify-center items-center text-[18px] h-10"
                  onClick={() => navigate(`/account/places/${place._id}`)}>
                  Edit Your Place
                </Button>
                <Button className="px-4 py-2 bg-pink text-white font-semibold rounded-3xl flex justify-center items-center text-[18px] h-10"
                  onClick={() => setModalOpen(true)}>
                  Remove Place
                </Button>
                <Modal
                  title="Are you sure you want to remove your place?"
                  open={modalOpen}
                  centered
                  onOk={() => handleOkModalButton(place._id)}
                  onCancel={() => setModalOpen(false)}
                  cancelButtonProps={{ className: "custom-cancel-button" }}
                  okButtonProps={{ className: "custom-ok-button" }}
                >
                  <p className="text-[15px]">Once removed, your place won't be visible to potential visitors for booking.</p>
                </Modal>
              </div>
            </div>
          );
        }))}
    </div>
  );
};
export default PlacesPages;
