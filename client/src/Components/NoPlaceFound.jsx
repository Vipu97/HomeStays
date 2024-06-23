import React from 'react';
import { Link } from "react-router-dom";


const NoPlaceFound = () => {
    return (
        <div className='flex justify-center gap-8'>
            <div className='flex justify-center flex-col items-center max-w-[500px] text-center gap-y-1'>
                <h1 className='text-[100px] font-extrabold text-[#484848]'>Oops!</h1>
                <p className='text-[35px] text-[#6c6b6b] leading-10 '>We can't seem to find the page you're looking for.</p>
                <Link className='border-2 border-pink py-2 px-4 rounded-xl mt-4 cursor-pointer hover:scale-105 transition-all font-medium text-[#484848] text-[18px]' to={"/"}>
                    Back to home page
                </Link>
            </div>
            <img src="/place-not-found.gif" alt="not-found-image" className='hidden sm:block'/>
        </div>
    )
}

export default NoPlaceFound