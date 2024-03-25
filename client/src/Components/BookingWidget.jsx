import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays, parse, format } from "date-fns";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/userContext";
import DatePickerRange from "./DatePicker";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CancelBookingsWidget from "./CancelBookingsWidget";

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [redirect, setRedirect] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    user && setName(user.name);
    const fetchBookingDetails = async () => {
      const { data } = await axios.get(`/booking/${place._id}`);
      setBookingDetails(data);
    };
    if (user) fetchBookingDetails();
  }, []);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    const date1 = parse(checkIn.toString(), "dd/MM/yyyy", new Date());
    const date2 = parse(checkOut.toString(), "dd/MM/yyyy", new Date());
    numberOfNights = differenceInCalendarDays(date2, date1) + 1;
  }
  const formattedDate = (date) => {
    return format(
      parse(date.toString(), "dd/MM/yyyy", new Date()),
      "dd/MM/yyyy"
    );
  };
  async function bookThisPlace() {
    if (!user) {
      toast.warning("Login is required for booking");
      return setRedirect("/login");
    }
    if (!checkIn || !checkOut)
      toast.error("Sorry!! Place can't be available for the provided dates");
    try {
      const { data } = await axios.post("/booking", {
        checkIn: formattedDate(checkIn),
        checkOut: formattedDate(checkOut),
        numberOfGuests,
        name,
        phone,
        place: place._id,
        price: numberOfNights * place.price,
      });
      await axios.put("/user/bookings", {
        bookingId: data._id,
        bookedPlace: place._id,
      });
      await axios.put(`/place/${place._id}`, {
        checkIn: formattedDate(checkIn),
        checkOut: formattedDate(checkOut),
      });
      toast.success("Place Booked!!");
      navigate(`/account/bookings/${data._id}`);
    } catch (err) {
      console.log(err.message);
    }
  }
  if (redirect)
    navigate(redirect, { state: { prevPath: `/place/${place._id}` } });

  return (
    <>
      {bookingDetails ? (
        <CancelBookingsWidget
          placeId={place._id}
          bookingDetails={bookingDetails}
          setBookingDetails={setBookingDetails}
        />
      ) : (
        <div className="bg-white shadow py-4 rounded-2xl flex flex-col justify-center items-center min-w-[280px]">
          <div className="text-2xl text-center">
            Price: {`₹${place.price.toLocaleString("en-IN")}`} per night
          </div>
          <div className="border rounded-md mt-4">
            <div className="flex justify-center py-1">
              <DatePickerRange
                setCheckIn={setCheckIn}
                setCheckOut={setCheckOut}
                disabledDates={place.bookedDates}
              />
            </div>
            <div className="p-3 border-t flex flex-col gap-1">
              <label>Number of guests:</label>
              <input
                type="number"
                value={numberOfGuests}
                className="py-1 px-2 outline-none border rounded-md border-gray-300"
                onChange={(ev) => setNumberOfGuests(ev.target.value)}
              />
            </div>
            {numberOfNights > 0 && (
              <div className="p-3 border-t flex flex-col gap-1">
                <label>Your full name:</label>
                <input
                  type="text"
                  value={name}
                  className="py-1 px-2 outline-none border rounded-md border-gray-300"
                  onChange={(ev) => setName(ev.target.value)}
                />

                <label>Phone number:</label>
                <input
                  type="tel"
                  value={phone}
                  className="px-2 py-1 outline-none border rounded-md border-gray-300"
                  onChange={(ev) => setPhone(ev.target.value)}
                />
              </div>
            )}
          </div>
          <button
            onClick={bookThisPlace}
            className="px-4 py-2 bg-pink text-white font-semibold rounded-3xl hover:scale-105 
          transition-all my-5"
          >
            Book this place
            {numberOfNights > 0 && (
              <span>
                {" "}
                {`for ₹${(numberOfNights * place.price).toLocaleString(
                  "en-IN"
                )}`}
              </span>
            )}
          </button>
        </div>
      )}
    </>
  );
}
