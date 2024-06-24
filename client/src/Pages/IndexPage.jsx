import { useEffect, useState } from "react";
import axios from "axios";
import {
  Link,
  useOutletContext,
} from "react-router-dom";
import Spinner from "../Components/Spinner";
import Image from "../Components/Image";
import NoPlaces from "../Components/NoPlaces";

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
  const [originalPlaces, setOriginalPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  const { searchInput} =
    useOutletContext();
  useEffect(() => {
    axios
      .get("/places")
      .then(({ data }) => {
        setAllPlaces(data);
        setOriginalPlaces(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  useEffect(() => {
    const filterPlaces = debounce(() => {
      const regex = new RegExp(searchInput, "i");
      setAllPlaces(
        originalPlaces.filter(
          (place) => regex.test(place.title) || regex.test(place.address)
        )
      );
    });
    filterPlaces();
  },[searchInput,originalPlaces]);

  if (loading) return <Spinner width={200} height={200} />;
  if(allPlaces.length === 0 && searchInput.length > 0){
    return <NoPlaces />;
  }
  return (
    <div className="grid grid-cols-1 justify-items-center py-4 px-3 gap-y-8 sm:grid-cols-2 sm:gap-x-4 md:grid-cols-2 md:gap-x-4 lg:grid-cols-3 lg:gap-x-6 xl:grid-cols-4">
      {allPlaces.length > 0 &&
        allPlaces?.map((place) => {
          return (
            <Link
              to={`/place/${place._id}`}
              key={place._id}
              className="w-full max-w-[400px] xs:max-w-[450px] "
            >
              <div className="bg-gray-500 mb-2 rounded-2xl flex hover:scale-105 transition-all">
                <Image
                  className="rounded-2xl h-[220px] w-[100%] xs:h-[250px] sm:h-[280px] aspect-auto"
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
    </div>
  );
};

export default IndexPage;
