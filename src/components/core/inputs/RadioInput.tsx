import React, { HTMLProps } from "react";
import { UseFormRegister } from "react-hook-form";

type RadioOption = {
   label: string;
   value: string;
};

interface RadioInputProps extends HTMLProps<HTMLInputElement> {
   options: RadioOption[];
   label: string;
   error?: any;
}

const RadioInput = React.forwardRef<
   HTMLInputElement,
   RadioInputProps & ReturnType<UseFormRegister<any>>
>(({ onChange, onBlur, name, label, error, options }, ref) => {
   return (
      <div className="w-full min-w-36">
         <label className="mb-3 block text-base font-medium" htmlFor={name}>
            {label}
         </label>
         <div className="mb-5 inline-flex gap-4">
            {options.map((option) => (
               <div key={option.value} className="flex items-center mb-2">
                  <input
                     ref={ref}
                     className="rounded border-[#e0e0e0] bg-white text-[#6B7280] outline-none focus:border-[#6A64F1]"
                     type="radio"
                     name={name}
                     id={`${name}-${option.value}`}
                     value={option.value}
                     onChange={onChange}
                     onBlur={onBlur}
                  />
                  <label
                     htmlFor={`${name}-${option.value}`}
                     className="ml-2 text-base font-medium"
                  >
                     {option.label}
                  </label>
               </div>
            ))}
            {error && <p className="text-red-500">{error}</p>}
         </div>
      </div>
   );
});

RadioInput.displayName = "RadioInput";

export default RadioInput;
