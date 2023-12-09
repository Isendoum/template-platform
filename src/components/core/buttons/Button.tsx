import React, { ButtonHTMLAttributes } from "react";
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
   variant?: "primary" | "success";
};
const CustomButton: React.FC<ButtonProps> = ({
   children,
   className,
   variant,
   ...props
}) => {
   const btnClassname = () => {
      switch (variant) {
         case "primary":
            return "border bg-primary text-white transition duration-500 ease select-none hover:bg-primary-hover focus:outline-none focus:shadow-outline";
         case "success":
            return "border border-green-500 bg-green-500 text-white transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline";
         default:
            return "";
      }
   };

   const combinedClassName = `${btnClassname()} ${className || ""}`.trim();

   return (
      <button className={combinedClassName} {...props}>
         <div className="flex flex-row justify-center">
            {React.Children.map(children, (child) => (
               <div className="px-4">{child}</div>
            ))}
         </div>
      </button>
   );
};
export default CustomButton;
