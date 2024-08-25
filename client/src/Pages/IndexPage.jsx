import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link, useOutletContext } from "react-router-dom";
import Image from "../Components/Image";
import 'react-loading-skeleton/dist/skeleton.css';
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
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false); // For infinite scroll loading
  const [page, setPage] = useState(1);  // For pagination
  const [isSearching, setIsSearching] = useState(false); // Track search mode
  const [allFetched, setAllFetched] = useState(false);

  const { searchInput } = useOutletContext();

  const fetchPlaces = async (currentPage) => {
    try {
      setLoadingMore(true);
      const { data } = await axios.get(`/places?page=${currentPage}`);
      if(data.length === 0){
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
      setAllPlaces(data); // Replace the entire list with search results
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
    if (searchInput.trim().length > 0) {
      debouncedFetchSearchResults(searchInput);
    } else {
      setIsSearching(false); // Exit search mode when searchInput is cleared
      setAllPlaces([]); // Clear previous data to start fresh
      setPage(1); // Reset pagination
      fetchPlaces(1); // Fetch the first page of results
    }
  }, [searchInput]);

  useEffect(() => {
    if (!isSearching && !allFetched) {
      fetchPlaces(page);
    }
  }, [page]);

  const handleScroll = useCallback(
    debounce(() => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.scrollHeight;

      if (!loadingMore && !isSearching && scrollPosition + windowHeight >= documentHeight / 2) {
        setPage((prevPage) => prevPage + 1); // Load the next page if not searching
      }
    }, 300),
    [loadingMore, isSearching]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  if (loading && !loadingMore) {
    return (
      <div className="grid grid-cols-1 justify-items-center py-4 px-3 gap-y-8 sm:grid-cols-2 sm:gap-x-4 md:grid-cols-2 md:gap-x-4 lg:grid-cols-3 lg:gap-x-6 xl:grid-cols-4">
        {Array(8).fill().map((_, index) => (
          <SkeletonLoader key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 justify-items-center py-4 px-3 gap-y-8 sm:grid-cols-2 sm:gap-x-4 md:grid-cols-2 md:gap-x-4 lg:grid-cols-3 lg:gap-x-6 xl:grid-cols-4 mt-3">
      {allPlaces.length > 0 ? (
        allPlaces.map((place) => {
          return (
            <Link
              to={`/place/${place._id}`}
              key={place._id}
              className="w-full max-w-[400px] xs:max-w-[450px]"
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
        })
      ) : (
        !loading && <div className="col-span-full text-center mt-10 text-pink text-2xl xs:text-3xl font-semibold w-[90%] max-w-[600px]">No matching places available. Please adjust your search.</div>
      )}
      {!isSearching && loadingMore && (
        <div className="col-span-full flex justify-center py-4">
          <SkeletonLoader />
        </div>
      )}
    </div>
  );
};

export default IndexPage;
