import React, { useState } from "react";
import Image from "./Image";

const PlaceGallery = ({ title, photos }) => {
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  if (showAllPhotos) {
    return (
      <div className="fixed inset-0 z-20 overflow-auto bg-white text-black font-semibold">
        <div className="bg-white p-8 grid gap-4 justify-center">
          <div>
            <h2 className="text-2xl mr-0 mt-12 xs:mr-48 xs:mt-0 xs:text-[3xl]">Photos of {title}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black hover:scale-105 transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
              Close photos
            </button>
          </div>
          {photos?.length > 0 &&
            photos.map((photo) => (
              <div>
                <Image src={photo} alt="single-photo" />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid gap-2 grid-cols-1 grid-rows-1 overflow-hidden h-[300px] max-h-[600px] md:grid-cols-3 md:grid-rows-2 sm:h-[400px] md:h-[500px]">
        <div className="col-span-2 overflow-hidden row-span-2">
          {photos?.[0] && (
            <div className="w-full h-full overflow-hidden">
              <Image
                onClick={() => setShowAllPhotos(true)}
                className="cursor-pointer object-cover rounded-xl h-full w-full"
                src={photos[0]}
                alt="place-main-photo"
              />
            </div>
          )}
        </div>
        <div className="hidden row-span-1 col-span-1 gap-2 md:block">
          {photos?.[1] && (
            <Image
              onClick={() => setShowAllPhotos(true)}
              className="cursor-pointer object-cover rounded-xl w-full h-full"
              src={photos[1]}
              alt="place-second-photo"
            />
          )}
        </div>
        <div className="hidden md:block">
            {photos?.[2] && (
              <Image
                onClick={() => setShowAllPhotos(true)}
                className="cursor-pointer object-cover rounded-xl h-full w-full"
                src={photos[2]}
                alt="place-third-photo"
              />
            )}
        </div>
        </div>
      <button
        onClick={() => setShowAllPhotos(true)}
        className="flex gap-1 absolute bottom-4 right-4 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500 hover:scale-105 transition-all"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
            clipRule="evenodd"
          />
        </svg>
        Show more photos
      </button>
    </div>

  );
};

export default PlaceGallery;
