import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../Context/userContext";

const LoginPage = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [redirect,setRedirect] = useState(false);
  const {setUser} = useContext(UserContext);

  const handleLogin = async(e) => {
    e.preventDefault();
    try{
      const {data} = await axios.post('/login',{email,password});
      setUser(data);
      setRedirect(true);
    }catch(e){
      alert('Login Failed')
      console.log(e);
    }
  }
  if(redirect)
    return <Navigate to={'/'} />
  return (
    <div className="mt-10 pt-6 grow flex-col items-center">
      <h1 className="text-4xl text-center mb-4 font-bold">Login</h1>
      <form className="max-w-sm mx-auto" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="your@email.com"
          className="w-full border py-2 px-3 my-2 rounded-2xl border-gray-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="w-full border py-2 px-3 my-2 rounded-2xl border-gray-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-pink p-2 w-full text-white rounded-2xl mt-1">Login</button>
        <div className="text-center mt-1">Didn't have an account yet?  <Link to={'/register'} className="text-pink underline">Register now</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
