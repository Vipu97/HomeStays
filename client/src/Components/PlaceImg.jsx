import React, { useEffect, useState } from "react";
import axios from "axios";

const PlaceImg = ({ place }) => {
    const [mainPhoto,setMainPhoto] = useState(null);
  useEffect(() => {
      axios.get(`/place/${place}`).then(res => {
        setMainPhoto(res.data.photos[0])
      })
  },[]);
  return (
    
  );
};

export default PlaceImg;
