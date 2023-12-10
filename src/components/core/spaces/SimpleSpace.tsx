import React from "react";
const SimpleSpace: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
   return (
      <div className={"space px-8 py-10 mb-8" + " " + props.className}>
         {props.children}
      </div>
   );
};

export default SimpleSpace;
