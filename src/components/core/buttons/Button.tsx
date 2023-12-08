import React, { ButtonHTMLAttributes } from "react";
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "success";
};
const CustomButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  switch (props.variant) {
    case "primary":
      return (
        <button
          type="button"
          className="border bg-primary text-white rounded-md px-4 transition duration-500 ease select-none hover:bg-primary-hover focus:outline-none focus:shadow-outline"
          {...props}
        >
          <div className="flex flex-row justify-center">{children}</div>
        </button>
      );

    case "success":
      return (
        <button
          type="button"
          className="border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
          {...props}
        >
          <div className="flex flex-row justify-center">{children}</div>
        </button>
      );

    default:
      return (
        <button {...props}>
          <div className="flex flex-row justify-center items-center">
            {React.Children.map(children, (child) => (
              <div className="">{child}</div>
            ))}
          </div>
        </button>
      );
  }
};
export default CustomButton;
