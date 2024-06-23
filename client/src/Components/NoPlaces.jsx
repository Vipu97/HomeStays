import React from "react";

const NoPlaces = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 px-6 mt-6">
      <div className="flex flex-col justify-start items-center max-w-[500px] text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-16 h-16 xs:w-24 xs:h-24 text-pink font-bold"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        <hr className="border border-gray-300 w-full" />
        <h3 className="pt-1 xs:pt-4 text-xl xs:text-2xl font-semibold">
          Sorry, no matches found. Try adjusting your search.
        </h3>
        <p className="hidden xs:block text-pink font-semibold">
          Time to dust off your bags and start planning your next adventure</p>
      </div>
    </div>
  );
};

export default NoPlaces;
