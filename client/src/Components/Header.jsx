import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/userContext";

const Header = () => {
  const {user} = useContext(UserContext);
  return (
      <header className="py-5 flex justify-between">
        <div className="logo">
          <Link to="/" className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
              stroke="currentColor" className="w-9 h-9 -rotate-90 text-pink" >
              <path strokeLinecap="round"  strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/>
            </svg>
            <span className="font-bold text-2xl text-pink">airbnb</span>
          </Link>
        </div>
        <div className="search-part flex items-center border border-gray-300 rounded-full py-2 px-4 gap-3 shadow-md shadow-gray-300">
          <div className="font-bold">Anywhere</div>
          <div className="border border-gray-300 h-6"></div>
          <div className="font-bold">Any week</div>
          <div className="border border-gray-300 h-6"></div>
          <div>Add guests</div>
          <button className="bg-pink border rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-white font-bold">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
            </svg>
          </button>
        </div>
        <Link to={user?'/account':'/login'} className="user-widget flex items-center border border-gray-300 rounded-full py-2 px-4 gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
          </svg>
          <div className="user-icon bg-gray-500 text-white border rounded-full border-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 relative top-1">
              <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd"/>
            </svg>
          </div>
          {user && (
            <div>
              {user.name}
            </div>
          )}
        </Link>

      </header>
  );
};

export default Header;
