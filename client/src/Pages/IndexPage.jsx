import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../Components/Spinner";
import Image from "../Components/Image";

const IndexPage = () => {
  const [allPlaces, setAllPlaces] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    axios.get("/places").then(({ data }) => {
      setAllPlaces(data);
      setLoading(false);
    });
  }, []);
  
  if(loading)
   return <Spinner width={200} height={200}/>;
  return (
    <div className="grid grid-cols-1 justify-items-center py-4 px-3 gap-y-8 sm:grid-cols-2 sm:gap-x-4 md:grid-cols-2 md:gap-x-4 lg:grid-cols-3 lg:gap-x-6 xl:grid-cols-4">
      {allPlaces.length > 0 &&
        allPlaces.map((place) => {
          return (
            <Link to={`/place/${place._id}`} key={place._id} className="w-full max-w-[400px] ">
              <div className="bg-gray-500 mb-2 rounded-2xl flex hover:scale-105 transition-all">
                <Image 
                  className="rounded-2xl h-[220px] w-[100%] xs:h-[250px] sm:h-[280px]"
                  src={place.photos?.[0]}
                  alt="place-main-photo"
                />
              </div>
              <h2 className="font-bold">{place.address}</h2>
              <h3 className="text-sm text-gray-500">{place.title.length > 44 ? `${place.title.substr(0,44)}....` 
              : `${place.title}`}</h3>
              <div className="font-semibold">
                <span className="font-bold">₹{place.price?.toLocaleString('en-IN')}</span> per night
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default IndexPage;
