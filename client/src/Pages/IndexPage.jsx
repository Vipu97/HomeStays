import { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { Link, useOutletContext } from "react-router-dom";
import Image from "../Components/Image";
import 'react-loading-skeleton/dist/skeleton.css';
import SkeletonLoader from "../Components/IndexSkeleton";
import "../utils/skeletonBox.css";

const debounce = (func) => {
  let timeoutId;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, 500);
  };
};

const IndexPage = () => {
  const [allPlaces, setAllPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const page = useRef(1);
  const allPlaceFetched = useRef(false);

  const { searchInput } = useOutletContext();

  const fetchAllPlaces = async () => {
    try {
      const { data } = await axios.get(`/places?page=${page.current}`);
      if (data.length === 0) {
        allPlaceFetched.current = true;
        return;
      }
      setAllPlaces((places) => [...new Set([...places, ...data])]);
      page.current += 1;
    } catch (err) {
      console.error("Error while fetching places ", err.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const filterPlaces = useCallback(
    debounce(async () => {
      if (searchInput.length > 0) {
        const { data } = await axios.get(`/places?searchKey=${searchInput}`);
        setAllPlaces(data);
      } else {
        setAllPlaces([]);
        page.current = 1;
        allPlaceFetched.current = false;
        fetchAllPlaces();
      }
    }),
    [searchInput]
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const clientHeight = window.innerHeight;
      const scrolledPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;

      if (scrolledPercentage >= 50 && !loadingMore && !allPlaceFetched.current) {
        setLoadingMore(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadingMore]);

  useEffect(() => {
    if (!allPlaceFetched.current) {
      fetchAllPlaces();
    }
  }, []);

  useEffect(() => {
    if (loadingMore) {
      fetchAllPlaces();
    }
  }, [loadingMore]);

  useEffect(() => {
    filterPlaces();
  }, [searchInput]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 justify-items-center py-4 px-3 gap-y-8 sm:grid-cols-2 sm:gap-x-4 md:grid-cols-2 md:gap-x-4 lg:grid-cols-3 lg:gap-x-6 xl:grid-cols-4">
        {Array(8).fill().map((_, index) => (
          <SkeletonLoader key={index} />
        ))}
      </div>
    );
  }

  return (
    <>
      {(allPlaces.length === 0 && searchInput) &&
        <div className="flex justify-center m-auto w-full max-w-[600px]">
          <h1 className="text-center text-pink font-semibold text-2xl mt-12">No places found. Please adjust your search terms and try again.</h1>
        </div>
      }
      <div className="mt-6 grid grid-cols-1 justify-items-center py-4 px-3 gap-y-8 sm:grid-cols-2 sm:gap-x-4 md:grid-cols-2 md:gap-x-4 lg:grid-cols-3 lg:gap-x-6 xl:grid-cols-4">
        {allPlaces.length > 0 &&
          allPlaces.map((place) => {
            return (
              <Link
                to={`/place/${place._id}`}
                key={place._id}
                className="w-full max-w-[400px] xs:max-w-[450px]"
              >
                <div className="bg-gray-500 mb-2 rounded-2xl flex hover:scale-105 shadow-2xl transition-all">
                  <Image
                    className="rounded-2xl h-[220px] w-[100%] xs:h-[250px] sm:h-[280px] aspect-auto"
                    src={place.photos?.[0]}
                    alt="place-main-photo"
                  />
                </div>
                <h2 className="font-bold">{place.address}</h2>
                <h3 className="text-sm text-gray-500">
                  {place.title?.length > 44
                    ? `${place.title.substr(0, 44)}....`
                    : `${place.title}`}
                </h3>
                <div className="font-semibold">
                  <span className="font-bold">
                    ₹{place.price?.toLocaleString("en-IN")}
                  </span>{" "}
                  per night
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
};

export default IndexPage;
