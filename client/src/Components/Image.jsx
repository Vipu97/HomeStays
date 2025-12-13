import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

const Image = ({ src, className, alt, ...rest }) => {
  src =
    src && src.includes("https://")
      ? src
      : "https://localhost:4000/uploads/" + src;
  return (
    <LazyLoadImage
      className={className}
      src={src}
      alt={alt}
      effect="opacity"
      width={'100%'}
      height={'100%'}
      {...rest}
    />);
};

export default Image;
