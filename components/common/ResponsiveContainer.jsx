import React from "react";

const ResponsiveContainer = ({ children, className }) => {
  return (
    <div className={`container mx-auto px-2 sm:px-4 ${className}`}>{children}</div>
  );
};

export default ResponsiveContainer;
