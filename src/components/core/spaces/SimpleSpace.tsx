import React from "react";
const SimpleSpace: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <div className="md:w-8/12 lg:w-5/12 bg-white px-8 py-10 mb-8 rounded-md">
      {props.children}
    </div>
  );
};

export default SimpleSpace;
