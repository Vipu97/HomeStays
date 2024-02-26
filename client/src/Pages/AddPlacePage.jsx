import { React, useEffect, useState } from "react";
import Perks from "../Components/Perks";
import PhotosUploader from "../Components/PhotosUploader";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InputHeading = ({ text }) => {
  return (
    <label htmlFor="title" className="font-semibold text-2xl">
      {text}
    </label>
  );
};

const InputDesc = ({ text, isRequired }) => {
  return (
    <p className="text-gray-500 text-sm font-semibold mb-1">
      {text}
      {isRequired && (
        <sup>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="red"
            className="w-2 h-2 inline-block"
          >
            <path
              fill-rule="evenodd"
              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
              clip-rule="evenodd"
            />
          </svg>
        </sup>
      )}
    </p>
  );
};
const AddPlacePage = () => {
  const { id } = useParams();
  const [redirect, setRedirect] = useState(false);
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [photoLink, setPhotoLink] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price,setPrice] = useState();
  
  useEffect(() => {
    if (id) {
      axios.get(`/place/${id}`).then(({ data }) => {
        setTitle(data.title);
        setAddress(data.address);
        setDescription(data.description);
        setAddedPhotos(data.photos);
        setPerks(data.perks);
        setExtraInfo(data.extraInfo);
        setMaxGuests(data.maxGuests);
        setPrice(data.price);
      });
    }
  }, [id]);
  const addNewPlace = async (e) => {
    e.preventDefault();
    try {
      if (addedPhotos.length < 3) {
        toast.info("Upload atleast 3 photos for your place");
        return;
      }
      const data = { title, address, addedPhotos, description,
        perks, extraInfo, maxGuests, price,
      };
      if(id){
        await axios.put('/place',{id,...data});
        toast.success("Place Updated Successfully!!");
      }
      else{
        await axios.post("/place", data);
        toast.success("Place Added Successfully!!");
      } 
      setRedirect(true);
    } catch (e) {
      toast.error("Something Wrong happened!!");
    }
  };

  if (redirect) return <Navigate to={"/account/places"} />;
  return (
    <form onSubmit={addNewPlace} className="px-2 md:px-8">
      <InputHeading text="Title" />
      <InputDesc
        text={
          "Title for your place, should be short and catchy as in advertisement"
        }
        isRequired={true}
      />
      <input
        type="text"
        placeholder="title, for example: My lovely Villa"
        className="w-full rounded-xl py-1.5 px-4 border border-gray-300 mb-4"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <InputHeading text="Address" />
      <InputDesc text={"Address to this place"} isRequired={true} />
      <input
        type="text"
        placeholder="Address"
        id="address"
        className="w-full rounded-xl py-1.5 px-4 border border-gray-300 mb-4"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      <InputHeading text="Photos" />
      <InputDesc text={"more = better"} isRequired={true} />
      <PhotosUploader
        photoLink={photoLink}
        setPhotoLink={setPhotoLink}
        addedPhotos={addedPhotos}
        setAddedPhotos={setAddedPhotos}
      />

      <InputHeading text={"Description"} />
      <InputDesc text={"Description of the place"} isRequired={true} />
      <textarea
        rows={5}
        className="w-full rounded-xl py-1.5 px-4 border border-gray-300 mb-4"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <label className="font-semibold text-2xl">Perks</label>
      <InputDesc text={"Select all the perks of your place"} />
      <Perks perks={perks} setPerks={setPerks} />

      <InputHeading text={"Extra Info"} />
      <InputDesc text={"house rules, etc"} />
      <textarea
        rows={5}
        className="w-full rounded-xl py-1.5 px-4 border border-gray-300 mb-4"
        value={extraInfo}
        onChange={(e) => setExtraInfo(e.target.value)}
        required
      />
      <div className="flex flex-col w-full gap-x-16 md:flex-row">
        <div className="w-full md:w-1/2">
          <h3 className="mt-2 mb-1 font-semibold text-xl">Maximum guests</h3>
          <p className="text-sm font-medium text-gray-500 mb-2">Maximum capacity of place for staying of guests at a same time</p>
          <input
            type="number"
            className="w-full rounded-xl py-1.5 px-4 border border-gray-300 mb-4"
            value={maxGuests}
            onChange={(e) => setMaxGuests(e.target.value)}
            required
          />
        </div>
        <div className="w-full md:w-1/2">
            <h3 className="mt-2 mb-1 font-semibold text-xl">Price per night</h3>
            <p className="text-sm font-medium text-gray-500 mb-2">Try to give reasonable price considering all the factors.(in Rupees)</p>
            <input type="number" value={price} 
            className="w-full rounded-xl py-1.5 px-4 border border-gray-300 mb-4"
            onChange={ev => setPrice(ev.target.value)}/>
        </div>
      </div>
      <button
        className="bg-pink w-full rounded-2xl text-white py-2 font-semibold text-xl mt-3 mb-5 hover:scale-95 transition-all" onClick={(e) => addNewPlace} >
        Save Your Place
      </button>
    </form>
  );
};

export default AddPlacePage;
