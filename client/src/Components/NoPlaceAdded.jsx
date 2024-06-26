import React from 'react'
import { Link } from 'react-router-dom'

const NoPlaceAdded = () => {
    return (
        <div className="flex flex-col justify-center items-center gap-2 w-full max-w-[500px] mx-auto px-4">
            <div className="flex flex-col justify-start">
                <h1 className="my-4 text-3xl font-semibold">My Places</h1>
                <hr className="border border-gray-300" />
                <h3 className="pt-4 text-2xl font-semibold">No places added... yet!</h3>
                <p>Time to Maximize Your Rental Income and Discover Your Property's True Value
                </p>
                <Link to="/account/places/new" className="my-4">
                    <div className="flex w-40 justify-center rounded-lg border border-black p-2 text-lg font-semibold hover:bg-gray-200 
          hover:scale-105 transition-all">
                        Start now!
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default NoPlaceAdded