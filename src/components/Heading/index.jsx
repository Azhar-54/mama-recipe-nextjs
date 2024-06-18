'use client'
import React from "react";

const sizes = {
  s: "text-3xl font-bold md:text-[28px] sm:text-[26px]",
  md: "text-7xl font-bold md:text-5xl",
  xs: "text-lg font-bold",
};

const Heading = ({ children, className = "", size = "s", as, ...restProps }) => {
  const Component = as || "h6";

  return (
    <Component className={`text-amber-400 font-inter ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Heading };
