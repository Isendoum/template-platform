import React, {
   useState,
   useRef,
   useCallback,
   MutableRefObject,
   useEffect,
} from "react";
import { UseFormRegister } from "react-hook-form";
import Calendar from "./Calendar";
import { CalendarIcon } from "@heroicons/react/24/solid";
import { formatDate } from "../utils/CalendarUtils";

type DateValueType = Date | string;

type OnChangeType = (
   event: React.ChangeEvent<HTMLInputElement>,
   value: DateValueType,
) => void;

interface DateInputProps
   extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "value" | "onChange"
   > {
   label: string;
   onChange?: OnChangeType;
   value?: string;
   locale?: string;
   error?: string;
}

const DateInput = React.forwardRef<
   HTMLInputElement,
   DateInputProps & ReturnType<UseFormRegister<any>>
>(({ label, onChange, locale = "default", error, ...props }, forwardedRef) => {
   const [isCalendarOpen, setIsCalendarOpen] = useState(false);
   const [selectedDate, setSelectedDate] = useState<Date | string | null>(null);
   const inputRef = useRef<HTMLInputElement>(
      null,
   ) as MutableRefObject<HTMLInputElement>;
   const containerRef = useRef<HTMLDivElement>(null);

   const combinedRef = useCallback(
      (element: HTMLInputElement) => {
         // Set the ref for local usage
         inputRef.current = element;

         // Forward the ref to parent component or hook form
         if (typeof forwardedRef === "function") {
            forwardedRef(element);
         } else if (forwardedRef) {
            forwardedRef.current = element;
         }
      },
      [forwardedRef],
   );

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (
            containerRef.current &&
            !containerRef.current.contains(event.target as Node)
         ) {
            setIsCalendarOpen(false);
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, []);

   const handleDateSelect = (date: Date) => {
      const formattedDate = formatDate(date); // Format the date manually
      setSelectedDate(formattedDate);
      setIsCalendarOpen(false);
      triggerInputChange(formattedDate);
   };

   const triggerInputChange = (newValue: string) => {
      if (inputRef.current) {
         inputRef.current.value = newValue;
         handleInputChange({
            target: inputRef.current,
         } as React.ChangeEvent<HTMLInputElement>);
      }
   };

   const handleInputChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
         const inputValue = event.target.value;
         const newDate = new Date(inputValue);

         // Check if the input value is a valid date string
         if (!isNaN(newDate.getTime())) {
            setSelectedDate(newDate); // Set as Date if valid
         } else {
            setSelectedDate(inputValue); // Keep as string if not a valid date
         }

         // Call the provided onChange with the original event and the new date or string
         if (onChange) {
            onChange(event, inputValue);
         }
      },
      [onChange],
   );

   const toggleCalendar = () => {
      setIsCalendarOpen(!isCalendarOpen);
   };

   const valueGetter = (selectedDate: Date | string | null): string => {
      if (selectedDate instanceof Date && !isNaN(selectedDate.getTime())) {
         // Check if selectedDate is a valid Date object
         return `${selectedDate.getUTCDate()}/${
            selectedDate.getMonth() + 1
         }/${selectedDate.getFullYear()}`;
      } else if (typeof selectedDate === "string") {
         // Return the string if it's a string (might be empty if cleared)
         return selectedDate;
      }
      return "";
   };

   return (
      <div className="w-full min-w-36 relative ">
         <label className="mb-3 block text-base font-medium" htmlFor={label}>
            {label}
         </label>
         <div className="relative w-full mb-5" ref={containerRef}>
            <div className="relative items-center">
               <input
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-sm"
                  onChange={handleInputChange}
                  value={valueGetter(selectedDate)}
                  type="text"
                  {...props}
                  ref={combinedRef}
               />
               <div
                  className="absolute inset-y-0 right-0 items-center flex pr-2 pl-2 cursor-pointer"
                  onClick={!props.disabled ? toggleCalendar : () => {}}
               >
                  <CalendarIcon width={20} height={20} color="gray" />
               </div>
            </div>
            <div className="absolute z-10" ref={containerRef}>
               {isCalendarOpen && (
                  <Calendar
                     date={selectedDate}
                     onSelectDate={handleDateSelect}
                     locale={locale}
                  />
               )}
            </div>
            {error && <p className="text-red-500">{error}</p>}
         </div>
      </div>
   );
});

DateInput.displayName = "DateInput";

export default DateInput;
