import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const registerUser = async(e) => {
        e.preventDefault();
        try{
          await axios.post('/register',{name,email,password});
          alert('Registration Successfull')
        }catch(error){
          alert('Registration Failed')
        }
    }
  return (
    <div className="mt-10 pt-6 grow flex-col items-center">
      <h1 className="text-4xl text-center mb-4 font-bold">Register</h1>
      <form className="max-w-sm mx-auto" onSubmit={registerUser}>
        <input
          type="text"
          placeholder="John Doe"
          className="w-full border py-2 px-3 my-2 rounded-2xl border-gray-300"
          value={name}
          onChange = {(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="your@email.com"
          className="w-full border py-2 px-3 my-2 rounded-2xl border-gray-300"
          value={email}
          onChange = {(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="w-full border py-2 px-3 my-2 rounded-2xl border-gray-300"
          value={password}
          onChange = {(e) => setPassword(e.target.value)}
        />
        <button className="bg-pink p-2 w-full text-white rounded-2xl mt-1">
          Register
        </button>
        <div className="text-center mt-1">
          Already a member?{" "}
          <Link to={"/login"} className="text-pink underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
