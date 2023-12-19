import React, { HTMLProps } from "react";
import { UseFormRegister } from "react-hook-form";

interface NumberInputProps extends HTMLProps<HTMLInputElement> {
   label: string;
   error?: string;
   type?: string;
   min?: number | string;
   max?: number | string;
   step?: string;
}

const NumberInput = React.forwardRef<
   HTMLInputElement,
   ReturnType<UseFormRegister<any>> & NumberInputProps
>(({ onChange, onBlur, name, label, error, min, max, step }, ref) => {
   return (
      <div className="w-full min-w-36">
         <div className="mb-5">
            <label className="mb-3 block text-base font-medium" htmlFor={label}>
               {label}
            </label>
            <input
               min={min}
               max={max}
               step={step}
               className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-sm"
               type={"number"}
               name={name}
               ref={ref}
               onChange={onChange}
               onBlur={onBlur}
            />
            {error && <p className="text-red-500">{error}</p>}
         </div>
      </div>
   );
});

NumberInput.displayName = "NumberInput";

export default NumberInput;
