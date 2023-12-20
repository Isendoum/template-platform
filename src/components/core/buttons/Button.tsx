import React, { ButtonHTMLAttributes } from "react";
import ButtonLoader from "../loaders/LoadingIndicator";
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
   variant?: "primary" | "success" | "text";
   loading?: boolean;
   iconRight?: React.ReactNode;
};
const CustomButton: React.FC<ButtonProps> = ({
   children,
   className,
   variant,
   loading,
   iconRight,
   ...props
}) => {
   const btnClassname = () => {
      switch (variant) {
         case "primary":
            return "cbutton border bg-primary text-white transition duration-500 ease select-none hover:bg-primary-hover focus:outline-none focus:shadow-outline";
         case "success":
            return "cbutton border border-green-500 bg-green-500 text-white transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline";
         case "text":
            return "cbutton bg-transparent";
         default:
            return "cbutton border bg-primary text-white transition duration-500 ease select-none hover:bg-primary-hover focus:outline-none focus:shadow-outline";
      }
   };

   const combinedClassName = `${btnClassname()} ${className || ""}`.trim();

   return (
      <button className={combinedClassName} {...props}>
         <div className="flex flex-row justify-center items-center">
            {React.Children.map(children, (child) => (
               <div className="px-2">{child}</div>
            ))}
            {iconRight && !loading && iconRight}
            {loading && <ButtonLoader />}
         </div>
      </button>
   );
};
export default CustomButton;
