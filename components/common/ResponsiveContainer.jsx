import React from "react";

const ResponsiveContainer = ({ children, className }) => {
  return (
    <div className={`container mx-auto ${className}`}>{children}</div>
  );
};

export default ResponsiveContainer;
