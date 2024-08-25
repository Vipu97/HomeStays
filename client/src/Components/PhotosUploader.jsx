import React, { useRef, useState } from "react";
import axios from "axios";
import Image from "./Image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PhotosUploader = ({ photoLink, setPhotoLink, addedPhotos, setAddedPhotos }) => {
  const inputRef = useRef();
  const [isUploading, setIsUploading] = useState(false);

  const addPhotoLink = async (e) => {
    e.preventDefault();
    if (photoLink.length === 0) {
      inputRef.current.focus();
      toast.warning("Link to an image is required");
      return;
    }
    setIsUploading(true);
    toast.promise(
      axios.post("/upload_by_link", { imgLink: photoLink })
        .then(({ data }) => {
          setAddedPhotos((prev) => [...prev, data]);
          setPhotoLink("");
        })
        .finally(() => {
          setIsUploading(false);
        }),
      {
        error: 'Error adding photo',
      }
    );
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setIsUploading(true);
    toast.promise(
      uploadPhoto(files).then((filenames) => {
        setAddedPhotos((prev) => [...prev, ...filenames]);
      }).finally(() => {
        setIsUploading(false);
      }),
      {
        error: 'Error while uploading',
      }
    );
  };

  const uploadPhoto = (files) => {
    return new Promise((resolve, reject) => {
      const data = new FormData();
      for (let i = 0; i < files.length; i++) {
        data.append("photos", files[i]);
      }
      axios
        .post("/upload", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          const { data: filenames } = response;
          resolve(filenames);
        })
        .catch((error) => {
          console.error("Error uploading photos:", error);
          reject(error);
        });
    });
  };

  const removePhoto = (ev, fileName) => {
    ev.preventDefault();
    setAddedPhotos(addedPhotos.filter((file) => file !== fileName));
  };

  const setAsMainPhoto = (ev, fileName) => {
    ev.preventDefault();
    const remainingPhotos = addedPhotos.filter((file) => file !== fileName);
    const newOrder = [fileName, ...remainingPhotos];
    setAddedPhotos(newOrder);
  };

  return (
    <>
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Add using a link ... jpg"
          className="w-full rounded-xl py-1.5 px-4 border border-gray-300 mb-4 outline-1 outline-pink"
          value={photoLink}
          onChange={(e) => setPhotoLink(e.target.value)}
          required={addedPhotos.length === 0}
          ref={inputRef}
        />
        <button
          className={`bg-pink text-white w-32 h-10 rounded-2xl font-semibold ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={(e) => addPhotoLink(e)}
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Add Photo"}
        </button>
      </div>
      <div className="mt-2 mb-4 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {addedPhotos.length > 0 &&
          addedPhotos.map((link) => (
            <div className="h-32 flex relative" key={link}>
              <Image
                src={link}
                alt="uploaded-image-link"
                className="rounded-xl w-full object-cover h-full"
              />
              <button
                className="absolute right-2 top-1 cursor-pointer bg-black p-1 rounded-md opacity-60"
                onClick={(ev) => removePhoto(ev, link)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="white"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
              <button className="absolute top-1 left-1 bg-black p-1 opacity-60 rounded-md" onClick={(ev) => setAsMainPhoto(ev, link)}>
                {link !== addedPhotos[0] ?
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="white"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg> :
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="red"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="white"
                    className="w-7 h-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>}
              </button>
            </div>
          ))}
        <label className="h-32 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-xl p-2 text-2xl text-gray-600">
          <input type="file" className="hidden" multiple onChange={(e) => handleFileChange(e)} />
          {isUploading ? (
            <div className="loader"></div>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
              </svg>

              Upload
            </>
          )}
        </label>
      </div>
    </>
  );
};

export default PhotosUploader;
