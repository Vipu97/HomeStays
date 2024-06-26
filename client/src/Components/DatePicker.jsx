import React from "react";
import { DatePicker } from "antd";
import moment from "moment";
import {parse,format} from 'date-fns';
const { RangePicker } = DatePicker;
import {toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const formattedDate = (date) => {
  return format(
    parse(date.toString(), "dd/MM/yyyy", new Date()),
    "dd/MM/yyyy"
  );
};

const footer = () => {
  return(
    <div className="text-gray-500 font-semibold overflow-hidden">
      <p className="md:inline mt-3 text-wrap whitespace-normal leading-3">
        <span className="text-pink xs:inline">*</span>
        Dates in red are either already booked by other
      </p>
      <p className="inline"> visitors or they are past dates.</p>
    </div>
  ) 
}
const DatePickerRange = ({ setCheckIn, setCheckOut, disabledDates }) => {

  const updateDates = (dates) => {
    const checkin = formattedDate(dates[0].$d.toLocaleDateString("en-IN"));
    const checkout = formattedDate(dates[1].$d.toLocaleDateString("en-IN"));
    const validDates = disabledDates.some(
      (date) =>
        moment(date, "DD/MM/YYYY").isBetween(
          moment(checkin, "DD/MM/YYYY"),
          moment(checkout, "DD/MM/YYYY"),
          null,
          "[]"
        )
    )
    if (validDates) {
      // If the selected range includes disabled dates, handle it accordingly
      toast.error("Place is already booked by someone else for that particular period");
      // You can display a message, reset the date range, or handle it based on your requirements
      setCheckIn("");
      setCheckOut("");
    } else {
      // If the selected range is valid, update the state
      setCheckIn(checkin);
      setCheckOut(checkout);
    }
  };

  const disabledDate = (current) => {
    const today = moment();
    // Disable dates before today
    if (current.isBefore(today, "day")) {
      return true;
    }
    // Disable specific dates from the array
    if (disabledDates && disabledDates.length > 0) {
      return disabledDates.some(
        (date) => current.isSame(moment(date, "DD/MM/YYYY"), "day")
      );
    }
    return false;
  };

  return (
    <>
      <RangePicker
        placeholder={["CheckIn", "CheckOut"]}
        onChange={(dates) => updateDates(dates)}
        className="border-none cursor-pointer bg-white
         text-black font-medium"
        disabledDate={disabledDate}
        renderExtraFooter={footer}
        inputReadOnly
        allowClear = {false}
      />
    </>
  );
};

export default DatePickerRange;
