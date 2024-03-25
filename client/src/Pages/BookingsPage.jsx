import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BookingDates from "../Components/BookingDates";
import NoBookings from "../Components/NoBookings";
import Spinner from '../Components/Spinner';
import Image from "../Components/Image";

const BookingsPage = () => {
  const [bookings, setBookings] = useState(null);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    const getBookings = async () => {
      try {
        const { data } = await axios.get('/booking/account');
        setBookings(data);
        console.log(bookings)
        setLoading(false);
      } catch (error) {
        console.log('Error: ', error);
        setLoading(false);
      }
    };
    getBookings();
  },[]);
  
  if(loading)
     return <Spinner />
  return (
    <div className="flex flex-col justify-center items-center w-full px-2">
      {(bookings && bookings.length > 0) ? (
        bookings.map(booking => (
          <Link
            to={`/place/${booking.place._id}`}
            className="flex gap-3 w-full bg-gray-200 rounded-2xl 
            max-w-[650px] xs:gap-4 md:gap-1"
            key = {booking._id}
          >
            <div className="w-48 sm:w-64 h-full">
              <Image
                src={booking.place.photos[0]}
                alt="booking-perview-photo"
                className="rounded-xl max-h-[120px] w-full object-cover xs:max-h-[130px] sm:max-h-[160px]"
              />
            </div>
            <div className="py-1 pr-2 md:ml-4">
              <h2 className="text-[15px] font-semibold xs:text-[18px] sm:text-xl leading-5 sm:leading-6">{booking.place.title}</h2>
              <div className="text-md sm:text-xl">
                <BookingDates
                  booking={booking}
                  className="mb-2 mt-2 text-gray-500 text-[15px]"
                />
                <div className="flex gap-1 mt-[-5px] items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 sm:w-8 sm:h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                    />
                  </svg>
                  <span className="text-sm sm:text-xl">
                    Total price: ₹{booking.price?.toLocaleString('en-IN')}
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
