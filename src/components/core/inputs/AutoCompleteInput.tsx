import React, { useState, HTMLProps } from "react";
import { UseFormRegister } from "react-hook-form";

type AutoCompleteProps = HTMLProps<HTMLInputElement> & {
   options: { label: string; value: string }[];
};

const AutoCompleteInput = React.forwardRef<
   HTMLInputElement,
   { label: string; error?: any } & ReturnType<UseFormRegister<any>> &
      AutoCompleteProps
>(({ onChange, onBlur, name, label, error, options }, ref) => {
   const [autoCompleteOptions, setAutoCompleteOptions] = useState<
      { label: string; value: string }[]
   >([]);
   const [value, setValue] = useState("");
   const [showOptions, setShowOptions] = useState(false);

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
      if (onChange) onChange(event);

      setShowOptions(true);

      const searchValue = event.target.value;
      if (searchValue) {
         const filteredOptions = options.filter((option) =>
            option.label.toLowerCase().includes(searchValue.toLowerCase()),
         );
         setAutoCompleteOptions(filteredOptions);
      } else {
         setAutoCompleteOptions(options);
      }
   };

   const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      if (onBlur) onBlur(event);

      // Remove autocomplete options after leaving the input
      setTimeout(() => setShowOptions(false), 100);
   };

   return (
      <div className="w-full min-w-36 relative">
         <div className="mb-5">
            <label className="mb-3 block text-base font-medium " htmlFor={name}>
               {label}
            </label>
            <input
               className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-sm"
               name={name}
               ref={ref}
               value={value}
               onChange={handleChange}
               onBlur={handleBlur}
            />
            {autoCompleteOptions?.length > 0 && showOptions && (
               <div className="absolute z-10 w-full bg-white border border-[#e0e0e0] rounded-md py-2 mt-1">
                  {autoCompleteOptions?.map((option, index) => (
                     <p
                        onClick={() => setValue(option.label)}
                        key={index}
                        className="px-4 py-2 text-black hover:bg-[#e0e0e0] cursor-pointer"
                     >
                        {option.label}
                     </p>
                  ))}
               </div>
            )}
            {autoCompleteOptions?.length === 0 && showOptions && (
               <div className="absolute z-10 w-full bg-white border border-[#e0e0e0] rounded-md py-2 mt-1">
                  <p className="px-4 py-2 text-black">No options</p>
               </div>
            )}
            {error && <p className="text-red-500">{error.message}</p>}
         </div>
      </div>
   );
});

AutoCompleteInput.displayName = "AutoCompleteInput";

export default AutoCompleteInput;
