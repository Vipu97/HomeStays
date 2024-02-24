import React from "react";
import axios from "axios";
import { differenceInCalendarDays , parse} from "date-fns";

const calculateNumberOfNights = (checkIn, checkOut) => {
    const date1 = parse(checkIn.toString(), 'dd/MM/yyyy', new Date());
    const date2 = parse(checkOut.toString(), 'dd/MM/yyyy', new Date());
    return differenceInCalendarDays( date2,date1) + 1;
};

const CancelBookingsWidget = ({placeId,bookingDetails,setBookingDetails}) => {
  const {checkIn,checkOut,name,price,phone} = bookingDetails;
  const bookingId = bookingDetails._id;
  const nights = calculateNumberOfNights(checkIn, checkOut);
  const pricePerNight = (price / nights).toLocaleString("en-IN");

  const cancelBooking = async () => {
    try{
      await axios.delete(`/place/${placeId}`,{data : {checkIn,checkOut}});
      await axios.delete('/user/bookings',{data : {placeId,bookingId}});
      await axios.delete('/booking',{data : {bookingId}});
      setBookingDetails(null);
    }catch(e){
      console.log(e.message);
    }
  }
  return (
    <div className="bg-white shadow p-4 rounded-2xl flex flex-col justify-center items-center gap-2 text-lg">
      <h2 className="font-semibold pb-2 text-center">
        This Place is already reserved by You. Here is the brief summary of your
        booking :-
      </h2>
      <div className="flex items-center">
        <p className="font-semibold">
          Primary Guest :<span className="font-bold text-pink"> {name}</span>
        </p>
      </div>
      <div className="flex items-center">
        <p className="font-semibold">
          Stay Period :<span className="font-bold text-pink"> {nights} Nights</span>
        </p>
      </div>
      <div className="flex items-center">
        <p className="font-semibold">
          Total Price :{" "}
          <span className="font-bold text-pink">
            {`₹${pricePerNight} X ${nights} = ₹${price?.toLocaleString(
              "en-IN"
            )}`}
          </span>
        </p>
      </div>
      <div className="flex-col justify-center items-center gap-1 text-semibold flex-1">
        <p className="font-semibold text-center">CheckIn/CheckOut Date : </p>
        <div className="flex items-center justify-center gap-2">
          <span className="font-bold text-pink flex-1">
            {checkIn}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
          <span className="font-bold text-pink flex-1">
            {checkOut}
          </span>
        </div>
      </div>
      <button className="bg-pink text-white rounded-3xl m-3 px-3 py-2 font-semibold hover:scale-105 transition-all w-full max-w-[350px]" onClick={cancelBooking}>
        Cancel Booking
      </button>
        <p className="text-sm text-gray-500 text-semibold">
        <sup className="text-pink">*</sup>
          All the future updates will be shared to you on your provided phone
          number <span className="text-pink">{phone}</span>
        </p>
    </div>
  );
};

export default CancelBookingsWidget;
