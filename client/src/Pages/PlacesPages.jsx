import React, { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Perks from "../Components/Perks";
import axios from "axios";
import PhotosUploader from "../Components/PhotosUploader";

const PlacesPages = () => {
  const { action } = useParams();
  const [title,setTitle] = useState('');
  const [address,setAddress] = useState('')
  const [photoLink,setPhotoLink] = useState('');
  const [addedPhotos,setAddedPhotos] = useState([]);
  const [description,setDescription] = useState('');
  const [perks,setPerks] = useState([]);
  const [extraInfo,setExtraInfo] = useState('');
  const [checkIn,setCheckIn] = useState('');
  const [checkOut,setCheckOut] = useState('')
  const [maxGuests,setMaxGuests] = useState(1); 
  const [redirect,setRedirect] = useState('');

  const InputHeading = ({text}) =>  <label htmlFor="title" className="font-semibold text-2xl">{text}</label>
  const InputDesc = ({text}) =>  <p className="text-gray-500 text-sm font-semibold mb-1">{text}</p>

  const addNewPlace = async(e) => {
    e.preventDefault();
    const data = {title,address,addedPhotos,description,perks,extraInfo,checkIn,checkOut,maxGuests}
    await axios.post('/places',data);
    setRedirect('/account/places');
  }

  if(redirect)
     return <Navigate to={redirect} />
  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="bg-pink text-white rounded-full inline-flex py-2 px-6 border-gray-100 font-semibold text-xl items-center" to={"/account/places/new"} >
            <svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6" >
              <path strokeLinecap="round"  strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add new place
          </Link>
        </div>
      )}
      {action === 'new' &&(
        <form onSubmit={addNewPlace}>
            <InputHeading text="Title" />
            <InputDesc text={'Title for your place, should be short and catchy as in advertisement'} />
            <input type="text" placeholder="title, for example: My lovely Villa" className="w-full rounded-xl py-1.5 px-4 border border-gray-300 mb-4" id="title" value={title} 
            onChange={(e) => setTitle(e.target.value)} />

            <InputHeading text='Address'/>
            <InputDesc text={'Address to this place'}/>
            <input type="text" placeholder="Address" id="address" className="w-full rounded-xl py-1.5 px-4 border border-gray-300 mb-4" value={address} onChange={(e) => setAddress(e.target.value)}/>
            <PhotosUploader InputHeading={InputHeading} InputDesc={InputDesc} photoLink={photoLink} setPhotoLink={setPhotoLink} addedPhotos={addedPhotos} setAddedPhotos={setAddedPhotos}/>
            
            <InputHeading text={'Description'} />
            <InputDesc text={'Description of the place'} />
            <textarea className="w-full rounded-xl py-1.5 px-4 border border-gray-300 mb-4" value={description}
            onChange={(e) => setDescription(e.target.value)} />

            <label className="font-semibold text-2xl">Perks</label>
            <InputDesc text={'Select all the perks of your place'} />
            <Perks perks={perks} setPerks={setPerks} />

            <InputHeading text={'Extra Info'} />
            <InputDesc text={'house rules, etc'} />
            <textarea className="w-full rounded-xl py-1.5 px-4 border border-gray-300 mb-4" value={extraInfo}
            onChange={(e) => setExtraInfo(e.target.value)} />

            <InputHeading text='Check in&out times'/>
            <InputDesc text={'Add check in and check out times, remember to have some time window for cleaning the room between guests and'} />
            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <h3 className="mt-2 mb-1">Check in time</h3>
                <input type="text" placeholder="15" className="w-full rounded-xl py-1.5 px-4 border border-gray-300 mb-4" value={checkIn} onChange={(e) => setCheckIn(e.target.value)}/>
              </div>
              <div>
                <h3 className="mt-2 mb-1">Check out time</h3>
                <input type="text" placeholder="23" className="w-full rounded-xl py-1.5 px-4 border border-gray-300 mb-4" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
              </div>
              <div>
                <h3 className="mt-2 mb-1">Max number if guests</h3>
                <input type="number" className="w-full rounded-xl py-1.5 px-4 border border-gray-300 mb-4" 
                value={maxGuests} onChange={(e) => setMaxGuests(e.target.value)} />
              </div>
            </div>
            <button className="bg-pink w-full rounded-2xl text-white py-2 font-semibold mt-2 mb-3">Save
            </button>
        </form>
      )}
    </div>
  );
};
export default PlacesPages;
