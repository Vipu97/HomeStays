import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BookingDates from "../Components/BookingDates";
import NoBookings from "../Components/NoBookings";
import Spinner from '../Components/Spinner';

const BookingsPage = () => {
  const [bookings, setBookings] = useState(null);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    const getBookings = async () => {
      try {
        const { data } = await axios.get('/booking/account');
        setBookings(data);
        setLoading(false);
      } catch (error) {
        console.log('Error: ', error);
        setLoading(false);
      }
    };
    getBookings();
  },[]);
  
  if(loading)
     return <Spinner width={200} height={200}/>
  return (
    <div className="flex flex-col justify-center items-center w-[100%] px-2">
      {(bookings && bookings.length > 0) ? (
        bookings.map(booking => (
          <Link
            to={`/place/${booking.place._id}`}
            className="flex gap-2 bg-gray-200 rounded-2xl max-w-[750px] md:w-full xs:gap-4"
            key = {bookings._id}
          >
            <div className="w-28 xs:w-32 sm:w-48">
              <img
                src={`http://localhost:4000/uploads/${booking.place.photos[0]}`}
                alt="booking-perview-photo"
                className="rounded-xl h-full w-full"
              />
            </div>
            <div className="py-1 pr-2 xs:py-3 md:ml-4">
              <h2 className="text-sm sm:text-xl leading-4">{booking.place.title}</h2>
              <div className="text-md sm:text-xl">
                <BookingDates
                  booking={booking}
                  className="mb-2 mt-2 text-gray-500 text-[15px]"
                />
                <div className="flex gap-1 mt-[-5px] xs:mt-[0px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 md:w-8 sm:h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                    />
                  </svg>
                  <span className="text-sm sm:text-lg md:text-xl">
                    Total price: ₹{booking.price}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        )) ) :
        <NoBookings />}
    </div>
  );
};

export default BookingsPage;
