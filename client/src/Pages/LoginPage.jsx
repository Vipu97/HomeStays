import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../Context/userContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../Components/Spinner";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/user/login", { email, password });
      setUser(data);
      setRedirect(true);
    } catch (e) {
      if (e.response.status == 422) toast.error("Wrong Password!!");
      else if (e.response.status == 404)
        toast.info("Email does not Exist.Go register first");
      else
        toast.info("Something Wrong happen at our end.Try after some moment");
    } finally {
      setLoading(false);
    }
  };
  if (redirect)
    location.state
      ? navigate(location.state.prevPath,{state: {prevPath:'login'}})
      : navigate("/");
  return (
    <div className="mt-10 pt-6 grow flex-col items-center">
      {loading ? (
        <Spinner width={200} height={200} />
      ) : (
        <>
          <h1 className="text-4xl text-center mb-4 font-bold">Login</h1>
          <form className="max-w-sm mx-auto" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full border py-2 px-3 my-2 rounded-2xl border-gray-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="password"
              className="w-full border py-2 px-3 my-2 rounded-2xl border-gray-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="bg-pink p-2 w-full text-white rounded-2xl mt-1 hover:scale-95 transition-all">
              Login
            </button>
            <div className="text-center mt-1">
              Didn't have an account yet?
              <Link to={"/register"} className="text-pink underline">
                Register now
              </Link>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default LoginPage;
