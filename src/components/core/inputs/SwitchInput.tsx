import React, { HTMLProps } from "react";
import { UseFormRegister } from "react-hook-form";
interface SwitchProps extends HTMLProps<HTMLInputElement> {
   label: string;
}

const SwitchInput = React.forwardRef<
   HTMLInputElement & SwitchProps,
   { label: string; error?: any } & ReturnType<UseFormRegister<any>>
>(({ onChange, name, label, error }, ref) => {
   return (
      <div className="w-full min-w-36">
         <div className="flex items-center">
            <input
               type="checkbox"
               id={name}
               name={name}
               ref={ref}
               className="switch-checkbox" // Add your own styling
               onChange={onChange}
            />
            <label htmlFor={name} className="switch-label ml-2">
               {label}
            </label>
         </div>
         {error && <p className="text-red-500">{error}</p>}
      </div>
   );
});

SwitchInput.displayName = "SwitchInput";

export default SwitchInput;