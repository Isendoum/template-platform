import React, { useState, useEffect, HTMLProps, useRef } from "react";
import { UseFormRegister } from "react-hook-form";
import debounce from "lodash/debounce";

type AutoCompleteProps = HTMLProps<HTMLInputElement> & {
   options: { label: string; value: string }[];
};

const AutoCompleteInput = React.forwardRef<
   HTMLInputElement,
   { label: string; error?: any } & ReturnType<UseFormRegister<any>> &
      AutoCompleteProps
>(({ onChange, onBlur, name, label, error, options }, ref) => {
   const [autoCompleteOptions, setAutoCompleteOptions] =
      useState<{ label: string; value: string }[]>(options);
   const [value, setValue] = useState("");
   const [showOptions, setShowOptions] = useState(false);
   const [highlightedIndex, setHighlightedIndex] = useState(0);
   const containerRef = useRef<HTMLDivElement>(null);
   useEffect(() => {
      if (!showOptions) {
         setHighlightedIndex(0);
      }
   }, [showOptions]);

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (
            containerRef.current &&
            !containerRef.current.contains(event.target as Node)
         ) {
            setShowOptions(false);
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, []);

   const filterOptions = (searchValue: string) => {
      if (!searchValue) {
         setAutoCompleteOptions(options);
      } else {
         const filtered = options.filter((option) =>
            option.label.toLowerCase().includes(searchValue.toLowerCase()),
         );
         setAutoCompleteOptions(filtered);
      }
   };

   // Debounce filter function
   const debouncedFilterOptions = debounce(filterOptions, 300);

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
      setShowOptions(true);
      debouncedFilterOptions(event.target.value);
   };

   const handleSelectOption = (option: { label: string; value: string }) => {
      setValue(option.label);
      setShowOptions(false);
      // Manually invoke the onChange prop with the selected value
      if (onChange) {
         onChange({ target: { name, value: option.value } } as any);
      }
   };

   const handleKeyDown = (event: React.KeyboardEvent) => {
      switch (event.key) {
         case "ArrowDown":
            setHighlightedIndex((prev) =>
               Math.min(prev + 1, autoCompleteOptions.length - 1),
            );
            break;
         case "ArrowUp":
            setHighlightedIndex((prev) => Math.max(prev - 1, 0));
            break;
         case "Enter":
            handleSelectOption(autoCompleteOptions[highlightedIndex]);
            break;
         case "Escape":
            setShowOptions(false);
            break;
         default:
            break;
      }
   };

   return (
      <div className="w-full min-w-36 relative">
         <label className="mb-3 block text-base font-medium" htmlFor={name}>
            {label}
         </label>
         <div className="mb-5" ref={containerRef}>
            <input
               className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-sm"
               name={name}
               ref={ref}
               value={value}
               onChange={handleChange}
               onBlur={onBlur}
               onKeyDown={handleKeyDown}
               onClick={() => setShowOptions(true)}
            />
            {showOptions && (
               <div
                  style={{ scrollbarWidth: "thin" }}
                  className="absolute z-10 w-full max-h-[200px] overflow-y-auto bg-white border border-[#e0e0e0] rounded-md py-2 mt-1"
               >
                  {autoCompleteOptions.length > 0 ? (
                     autoCompleteOptions.map((option, index) => (
                        <p
                           onClick={() => handleSelectOption(option)}
                           key={index}
                           className={`px-4 py-2 text-black hover:bg-[#e0e0e0] cursor-pointer ${
                              index === highlightedIndex ? "bg-gray-200" : ""
                           }`}
                        >
                           {option.label}
                        </p>
                     ))
                  ) : (
                     <p className="px-4 py-2 text-black">No options</p>
                  )}
               </div>
            )}
            {error && <p className="text-red-500">{error}</p>}
         </div>
      </div>
   );
});

AutoCompleteInput.displayName = "AutoCompleteInput";

export default AutoCompleteInput;
