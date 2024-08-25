import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

const Image = ({ src, className, alt, ...rest }) => {
  console.log(src);
  src =
    src && src.includes("https://")
      ? src
      : "https://localhost:4000/uploads/" + src;
  return (
    <LazyLoadImage
      className={className} src={src} alt={alt} 
      {...rest} effect="blur" 
      width={'100%'} height={'100%'} 
      />);
};

export default Image;
