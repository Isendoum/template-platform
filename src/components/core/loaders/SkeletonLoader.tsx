import React from "react";

const SkeletonLoader = ({
   width = "100%",
   height = "1em",
   style = {},
   children = <></>,
}) => {
   return (
      <div
         className="skeleton"
         style={{
            width, // Set the width of the skeleton
            height, // Set the height of the skeleton
            ...style, // Additional styles can be passed as props
         }}
      >
         {children}
      </div>
   );
};

export default SkeletonLoader;
