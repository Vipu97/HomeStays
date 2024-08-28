import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  Link,
  useOutletContext,
} from "react-router-dom";
import Image from "../Components/Image";
import 'react-loading-skeleton/dist/skeleton.css'
import SkeletonLoader from "../Components/IndexSkeleton";
import "../utils/skeletonBox.css";

const debounce = (func, delay = 500) => {
  let timeoutId;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

const IndexPage = () => {
  const [allPlaces, setAllPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false); // For infinite scroll loading
  const [page, setPage] = useState(1);  // For pagination
  const [isSearching, setIsSearching] = useState(false); // New state to track search mode
  const [allFetched, setAllFetched] = useState(false);

  const { searchInput } = useOutletContext();

  const fetchPlaces = async (currentPage) => {
    try {
      setLoadingMore(true);
      const { data } = await axios.get(`/places?page=${currentPage}`);
      if (data.length === 0) {
        setAllFetched(true);
      }
      setAllPlaces((prevPlaces) => [...prevPlaces, ...data]);
    } catch (err) {
      console.error("Error while fetching places ", err.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const fetchSearchResults = async (query) => {
    try {
      setLoading(true);
      setIsSearching(true);
      const { data } = await axios.get(`/places?query=${query}`);
      setFilteredPlaces(data); // Replace the entire list with search results
    } catch (err) {
      console.error("Error while searching places ", err.message);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchSearchResults = useCallback(
    debounce((query) => fetchSearchResults(query), 500),
    []
  );
  useEffect(() => {
    if (searchInput.trim().length > 2) {
      debouncedFetchSearchResults(searchInput);
    } else {
      setIsSearching(false); // Exit search mode when searchInput is cleared'
      // setPage(page => page+1);
      // fetchPlaces(page);
    }
  }, [searchInput]);

  useEffect(() => {
    if (!isSearching && !allFetched) {
      fetchPlaces(page);
    }
  }, [page]);

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.scrollHeight;

    if (!loadingMore && !isSearching && scrollPosition + windowHeight >= documentHeight / 2) {
      setPage((prevPage) => prevPage + 1); // Load the next page if not searching
    }
  },[loadingMore, isSearching]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const currentList = isSearching ? filteredPlaces : allPlaces;
  return (
    <>
      <div className="grid grid-cols-1 justify-items-center py-4 px-3 gap-y-8 sm:grid-cols-2 sm:gap-x-4 md:grid-cols-2 md:gap-x-4 lg:grid-cols-3 lg:gap-x-6 xl:grid-cols-4 2xl:grid-cols-5 mt-3">
        {(loading) ?
          Array(8).fill().map((_, index) => (
            <SkeletonLoader key={index} />
          ))
          :
          currentList?.map((place) => {
            return (
              <Link
                to={`/place/${place._id}`}
                key={place._id}
                className="w-full max-w-[420px] sm:max-w-[470px]"
              >
                <div className="bg-gray-500 mb-2 rounded-2xl flex hover:scale-102 transition-all">
                  <Image
                    className="rounded-2xl h-[220px] w-[100%] xs:h-[250px] sm:h-[280px] aspect-auto shadow-2xl"
                    src={place.photos?.[0]}
                    alt="place-main-photo"
                  />
                </div>
                <h2 className="font-bold">{place.address}</h2>
                <h3 className="text-sm text-gray-500">
                  {place.title.length > 44
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
        {!isSearching && loadingMore && (
          <div className="col-span-full flex justify-center py-4">
            <SkeletonLoader />
          </div>
        )}
      </div>
      {(currentList.length === 0 && !loading && searchInput) &&
        <h3 className="text-2xl text-pink font-semibold text-center mx-auto w-[400px] sm:w-[700px] mt-8">Oops, we couldn’t find any results for your search. How about trying again with different keywords?</h3>
      }
    </>
  );
};

export default IndexPage;
