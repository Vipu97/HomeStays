import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import PlaceGallerySkeleton from './PlaceGallerySkeleton';

const SinglePageSkeleton = () => {
    return (
        <div className="mt-4 bg-gray-300 px-4 pt-3 rounded-3xl xs:px-8 xs:pt-8 ">
            {/* Title Skeleton */}
            <Skeleton height={40} width={`60%`} className="mb-4" />

            {/* Address Skeleton */}
            <Skeleton height={30} width={`40%`} className="mb-6" />

            <PlaceGallerySkeleton />
            {/* Description Skeleton */}
            <div className="mt-6">
                <Skeleton height={30} width={`20%`} className="mb-2" />
                <Skeleton count={3} height={20} width={'100%'} className="mb-2 max-w-[700px]" />
            </div>

            {/* Perks Skeleton */}
            <Skeleton height={30} width={`120px`} className="mt-8 mb-4" />
            <Skeleton height={200} width={'100%'} className='rounded-2xl skeleton-box max-w-[500px]'/>
            {/* Extra Info Skeleton */}
            <Skeleton height={30} width={`200px`} className="mt-8 mb-4" />
            <Skeleton count={5} height={20} className='my-1 w-[100%] sm:w-[70%]' />
        </div>
    );
};

export default SinglePageSkeleton;
