"use client";
import React from "react";
import Image from "next/image";

const BASE_URL = "/public/images";

const Img = ({ className, src = "/img_ellipse_127.png", alt = "testImg", isStatic = false, ...restProps }) => {
  const [imgSrc, setImgSrc] = React.useState(src);

  return (
    <Image
      className={className}
      src={isStatic ?`${BASE_URL}/${imgSrc}` : imgSrc}
      alt={alt}
      {...restProps}
      onError={() => {
        setImgSrc("/img_ellipse_127.png");
      }}
    />
  );
};
export { Img };
