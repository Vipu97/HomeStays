import React, { useContext, useState } from "react";
import { UserContext } from "../Context/userContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AccountNav from "../Components/AccountNav";
import Spinner from "../Components/Spinner";
import BookingsPage from "./BookingsPage";
import PlacesPages from "./PlacesPages";
import Popover from "../Components/Popover";

const ProfilePage = () => {
  const [redirect, setRedirect] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(UserContext);

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }
  
  if (!user && !redirect) return <Navigate to={"/login"} />;

  const logout = async () => {
    setLoading(true);
    await axios.post("/user/logout");
    toast.info("Logout Successfully!!");
    setUser(null);
    setLoading(false);
    setRedirect("/");
  };
  if (redirect) return <Navigate to={redirect} />;

  return (
    <div>
      <AccountNav subpage={subpage} />
      {loading ? (
        <Spinner width={200} height={200} />
      ) : (
        <>
          {subpage === "profile" && (
            <div className="text-center w-full max-w-[700px] mx-auto flex flex-col justify-center items-center xs:flex-row">
                <img
                  src={"/profileIcon.jpg"}
                  alt="profile-icon"
                  className="w-[200px] sm:w-[300px]"
                />
              <div className="flex flex-col gap-6 sm:gap-16">
                <div className="flex flex-col gap-3">
                  <div className="flex gap-2 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>
                    <h1 className="text-[20px] font-medium sm:text-[22px]">
                      Name : <span className="text-gray-500">{user.name}</span>
                    </h1>
                  </div>
                  <div className="flex gap-2 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                      />
                    </svg>
                    <h1 className="text-[20px] font-medium sm:text-[22px]">
                      Email :{" "}
                      <span className="text-gray-500">{user.email}</span>
                    </h1>
                  </div>
                </div>
                <div className="flex gap-8 justify-center xs:justify-normal">
                  <button
                    onClick={logout}
                    className="bg-gray-400 font-medium text-[17px] rounded-3xl px-5 py-2 flex gap-2 
                    items-center justify-center hover:scale-105 transition-all sm:px-6"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                      />
                    </svg>
                    Logout
                  </button>
                   <Popover name={user.name} setRedirect={setRedirect} />
                </div>
              </div>
            </div>
          )}
          {subpage === "bookings" && <BookingsPage />}
          {subpage === "places" && <PlacesPages />}
        </>
      )}
    </div>
  );
};

export default ProfilePage;
