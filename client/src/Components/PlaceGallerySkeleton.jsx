import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import "../utils/skeletonBox.css";

const PlaceGallerySkeleton = () => {
  return (
    <div className="relative">
      <div className="grid gap-2 grid-cols-1 grid-rows-1 overflow-hidden h-[300px] max-h-[600px] md:grid-cols-3 md:grid-rows-2 sm:h-[400px] md:h-[500px]">
        <div className="col-span-2 overflow-hidden row-span-2">
          <Skeleton className="w-full h-full rounded-xl" />
        </div>
        <div className="hidden row-span-1 col-span-1 gap-2 md:block">
          <Skeleton className="w-full h-full rounded-xl" />
        </div>
        <div className="hidden md:block">
          <Skeleton className="w-full h-full rounded-xl" />
        </div>
      </div>
      <button
        className="flex gap-1 absolute bottom-4 right-4 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500 hover:scale-105 transition-all"
        disabled
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
        <Skeleton width={120} height={20} />
      </button>
    </div>
  );
};

export default PlaceGallerySkeleton;
