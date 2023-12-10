type Size = "small" | "medium" | "large";
const ButtonLoader = ({
   size = "medium",
   color = "#3498db",
}: {
   size?: Size;
   color?: string;
}) => {
   const sizeClasses: Record<Size, number> = {
      small: 14,
      medium: 18,
      large: 26,
   };
   return (
      <div
         className="loading-indicator"
         style={{
            borderColor: color ? color : "currentColor",
            width: sizeClasses[size],
            height: sizeClasses[size],
         }}
      ></div>
   );
};
export default ButtonLoader;
