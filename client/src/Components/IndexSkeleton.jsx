import React from 'react'
import Skeleton,{SkeletonTheme} from 'react-loading-skeleton';
import "../utils/skeletonBox.css";

const IndexSkeleton = () => {
    return (
        <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
            <div className="w-full max-w-[400px] xs:max-w-[450px] transition-opacity duration-500">
                <div className="bg-gray-500 mb-2 rounded-2xl flex skeleton-box" >
                    <Skeleton height={270} width="100%" className="rounded-2xl" />
                </div>
                <Skeleton height={15} width="60%" />
                <Skeleton height={10} width="80%" style={{ marginTop: 5 }} />
                <Skeleton height={15} width="50%" style={{ marginTop: 5 }} />
            </div>
        </SkeletonTheme>
    )
}

export default IndexSkeleton;