import React from "react";
import axios from "axios";

const PhotosUploader = ({InputHeading, InputDesc,photoLink,setPhotoLink,addedPhotos,setAddedPhotos,}) => {
  const addPhotoLink = async (e) => {
    e.preventDefault();
    const {data} = await axios.post('/upload_by_link' , {link : photoLink})
    setAddedPhotos(prev => [...prev , data]);
    setPhotoLink('');
  }
   
  const uploadPhoto = (e) => {
    console.log('evt trigeering')
    const files = e.target.files;
    const data = new FormData();
    for(let i=0;i<files.length;i++){
      data.append('photos',files[i]);
    }
    axios.post('/upload' , data , {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }) 
    .then(response => {
      const {data:filenames}  = response;
      setAddedPhotos(prev => [...prev , ...filenames]);
    })
    .catch(error => {
      console.error('Error uploading photos:', error);
  });
  }
  return (
    <>
      <InputHeading text="Photos" />
      <InputDesc text={"more = better"} />
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Add using a link ... jpg"
          className="w-full rounded-xl py-1.5 px-4 border border-gray-300 mb-4"
          value={photoLink}
          onChange={(e) => setPhotoLink(e.target.value)}
        />
        <button
          className="bg-pink text-white w-32 h-10 rounded-2xl font-semibold"
          onClick={(e) => addPhotoLink(e)}
        >
          Add Photo
        </button>
      </div>
      <div className="mt-2 mb-4 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {addedPhotos.length > 0 &&
          addedPhotos.map((link) => (
            <div className="h-32 flex" key={link}>
              <img
                src={"http://localhost:4000/uploads/" + link}
                alt="uploaded-image-link"
                className="rounded-xl w-full object-cover"
              />
            </div>
          ))}
        <label className="h-32 border bg-transparent rounded-2xl p-8 text-2xl flex items-center gap-2 justify-center cursor-pointer">
          <input
            type="file"
            className="hidden"
            multiple
            onChange={uploadPhoto}
          />
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
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>{" "}
          Upload
        </label>
      </div>
    </>
  );
};

export default PhotosUploader;
