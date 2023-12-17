import React, { useState, useRef, useCallback, MutableRefObject } from "react";
import { UseFormRegister } from "react-hook-form";
import Calendar from "./Calendar";
import { CalendarIcon } from "@heroicons/react/24/solid";

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
   const [selectedDate, setSelectedDate] = useState<Date | string | null>("");
   const inputRef = useRef<HTMLInputElement>(
      null,
   ) as MutableRefObject<HTMLInputElement>;

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

   const handleDateSelect = (date: Date) => {
      const formattedDate = date.toISOString().split("T")[0];
      setSelectedDate(formattedDate); // Set the formatted date string as the selected date
      setIsCalendarOpen(false);
      triggerInputChange(formattedDate); // Trigger the input change with the formatted date
   };

   // Adjusted triggerInputChange to directly set the value
   const triggerInputChange = (newValue: string) => {
      if (inputRef.current) {
         inputRef.current.value = newValue; // Set the input value directly
         handleInputChange({
            target: inputRef.current,
         } as React.ChangeEvent<HTMLInputElement>);
      }
   };

   const handleInputChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
         const newDate = new Date(event.target.value);
         setSelectedDate(newDate);
         if (onChange) {
            onChange(event, event.target.value);
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
         return selectedDate.toISOString().split("T")[0];
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
         <div className="relative w-full mb-5">
            <input
               {...props}
               ref={combinedRef}
               className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-sm"
               onChange={handleInputChange}
               value={valueGetter(selectedDate)}
               type="text"
            />
            <div
               className="absolute inset-y-0 right-0 items-center flex pr-2 pl-2 cursor-pointer"
               onClick={!props.disabled ? toggleCalendar : () => {}}
            >
               <CalendarIcon width={20} height={20} color="gray" />
            </div>
            <div className="absolute z-10">
               {isCalendarOpen && (
                  <Calendar
                     date={selectedDate}
                     onSelectDate={handleDateSelect}
                     locale={locale}
                  />
               )}
            </div>
         </div>
         {error && <p className="text-red-500">{error}</p>}
      </div>
   );
});

DateInput.displayName = "DateInput";

export default DateInput;
