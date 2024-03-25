import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../Components/Spinner";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(null);

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post("/user/register", { name, email, password });
      setLoading(false);
      toast.success("Registration Successfull");
      setRedirect("/login");
    } catch (error) {
      if ((error.response.data.code = 11000))
        toast.info("Email Already registered!!Try to Login");
      else
        toast.error(
          "Something Wrong happened at our side!! Try after some time"
        );
    }
  };
  if (redirect) return <Navigate to={redirect} />;
  return (
    <div className="mt-10 pt-6 grow flex-col items-center">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="text-4xl text-center mb-4 font-bold">Register</h1>
          <form className="flex flex-col items-center justify-center" onSubmit={registerUser}>
            <input
              type="text"
              placeholder="John Doe"
              className="w-[90%] border py-2 px-3 my-2 rounded-2xl border-gray-300 xs:w-[400px]"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="your@email.com"
              className="w-[90%] border py-2 px-3 my-2 rounded-2xl border-gray-300 xs:w-[400px]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              className="w-[90%] border py-2 px-3 my-2 rounded-2xl border-gray-300 xs:w-[400px]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="bg-pink p-2 text-white rounded-2xl mt-1 hover:scale-95 transition-all w-[90%] xs:max-w-[400px]">
              Register
            </button>
            <div className="text-center mt-1">
              Already a member?{" "}
              <Link to={"/login"} className="text-pink underline">
                Login
              </Link>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default RegisterPage;
