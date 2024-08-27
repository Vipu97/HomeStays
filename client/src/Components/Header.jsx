import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../Context/userContext";

const Header = ({ searchInput, handleQueryChange }) => {
  const { user } = useContext(UserContext);
  const { pathname } = useLocation();

  return (
    <>
      <header className="py-5 flex justify-between xs:px-2 sm:px-4 lg:px-18 flex-wrap sm:flex-nowrap gap-y-3 gap-x-3">
        <div className="logo order-0 pl-3">
          <Link
            to="/"
            className="flex items-center gap-1 relative top-1.5 xs:top-0.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 -rotate-90 text-pink xs:h-10 xs:w-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
            <span className="font-bold text-xl text-pink xs:text-2xl">
              HomeStays
            </span>
          </Link>
        </div>
        {
          pathname === "/" &&
          <div className="order-2 sm:order-1 flex items-center border-2 border-gray-300 rounded-full px-2 gap-1 shadow-lg
       shadow-gray-300 sm:gap-3 sm:flex sm:px-4 w-full max-w-[400px] lg:max-w-[500px] justify-between h-12 mx-4 xxs:mx-auto">
            <input
              type="text"
              placeholder="Search by any title or location"
              className="outline-none w-full pl-2 h-full rounded-full"
              value={searchInput}
              onChange={handleQueryChange}
            />
          </div>
        }
        <div className="sm:order-2">
          <Link
            to={user == null ? "/login" : "/account"}
            className="user-widget flex items-center py-2 px-4 gap-2 rounded-full border-gray-500 hover:scale-105 transition-all md:border"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 hidden md:block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            <div className="user-icon bg-gray-500 text-white border rounded-full border-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-7 h-7 relative top-1"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
