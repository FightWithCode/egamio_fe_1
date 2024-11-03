import React from "react";

const NewSection = ({ children, className }) => {
  return <section className={`py-12 ${className}`}>{children}</section>;
};

export default NewSection;
