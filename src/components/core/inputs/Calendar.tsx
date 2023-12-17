import React, { useState, useEffect } from "react";
import {
   adjustDateForTimezone,
   dateEquality,
   getDaysInMonth,
   getFirstDayOfMonth,
   getLocalizedDays,
   getLocalizedMonths,
} from "../utils/CalendarUtils";
export interface CalendarProps {
   date?: Date | string | null;
   onSelectDate: (date: Date) => void;
   //   fullsize?: boolean;
   //   monthsLocalized?: string[];
   //   daysLocalized?: string[];
   locale?: string; // Add this line
}

export const Calendar = ({
   date,
   onSelectDate,
   locale = "default",
}: CalendarProps) => {
   const [currentDate, setCurrentDate] = useState(
      date && !isNaN(new Date(date).getTime()) ? new Date(date) : null,
   );
   const [currentMonth, setCurrentMonth] = useState(
      currentDate ? currentDate.getMonth() : new Date().getMonth(),
   );
   const [currentYear, setCurrentYear] = useState(
      currentDate ? currentDate.getFullYear() : new Date().getFullYear(),
   );
   const [calendarDays, setCalendarDays] = useState<(Date | null)[]>([]);
   const [isMonthOpen, setIsMonthOpen] = useState(false);
   const [isYearOpen, setIsYearOpen] = useState(false);

   const monthsLocalized = getLocalizedMonths(locale);
   const daysLocalized = getLocalizedDays(locale);

   const toggleMonths = () => {
      setIsMonthOpen(!isMonthOpen);
   };

   const toggleYears = () => {
      setIsYearOpen(!isYearOpen);
   };

   const handleSetCurrentMonthIncrease = () => {
      if (currentMonth === 11) {
         setCurrentYear(currentYear + 1);
         setCurrentMonth(0);
         return;
      }
      setCurrentMonth(currentMonth + 1);
   };

   const handleSetCurrentMonthDencrease = () => {
      if (currentMonth === 0) {
         setCurrentYear(currentYear - 1);
         setCurrentMonth(11);
         return;
      }
      setCurrentMonth(currentMonth - 1);
   };

   useEffect(() => {
      const daysInMonth = getDaysInMonth(currentYear, currentMonth);
      const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

      const newCalendarDays = [];
      for (let i = 0; i < firstDay; i++) {
         newCalendarDays.push(null); // Push null for empty cells
      }
      for (let day = 1; day <= daysInMonth; day++) {
         newCalendarDays.push(new Date(currentYear, currentMonth, day));
      }
      setCalendarDays(newCalendarDays);
   }, [currentMonth, currentYear, currentDate]); // Removed currentDate from dependencies

   return (
      <div data-testid={"calendar"} className="calendar-container">
         <div
            onClick={() => {
               setIsMonthOpen(false);
               toggleYears();
            }}
            className="calendar-year-text"
         >
            {currentYear}
         </div>
         <div className={"caldendar-month-action-container"}>
            <div
               className={`arrow ${isYearOpen ? "arrow-invisible" : ""}`}
               onClick={handleSetCurrentMonthDencrease}
            >
               {"<"}
            </div>

            <div
               onClick={() => {
                  setIsYearOpen(false);
                  toggleMonths();
               }}
               className="cursor-pointer"
            >
               {monthsLocalized[currentMonth]}
            </div>

            <div
               className={`arrow ${isYearOpen ? "arrow-invisible" : ""}`}
               onClick={handleSetCurrentMonthIncrease}
            >
               {">"}
            </div>
         </div>
         {isMonthOpen && (
            <div className="month-container" style={{ scrollbarWidth: "none" }}>
               {monthsLocalized.map((month) => (
                  <div
                     key={month}
                     className="month-text"
                     onClick={() => {
                        setCurrentMonth(
                           monthsLocalized.findIndex((val) => val === month),
                        );
                        toggleMonths();
                     }}
                  >
                     {month}
                  </div>
               ))}
            </div>
         )}
         {isYearOpen && (
            <div className="year-container" style={{ scrollbarWidth: "none" }}>
               {Array.from({ length: 2100 - 1900 + 1 }, (_, i) => 1900 + i).map(
                  (year) => (
                     <div
                        key={year}
                        className="year-text"
                        onClick={() => {
                           setCurrentYear(year);
                           toggleYears();
                        }}
                     >
                        {year}
                     </div>
                  ),
               )}
            </div>
         )}
         <div
            className={`days-container ${
               isMonthOpen || isYearOpen ? "days-container-hidden" : ""
            }`}
         >
            {daysLocalized.map((day) => (
               <div key={day} className="day-text-box">
                  {day}
               </div>
            ))}
            {calendarDays?.map((dt, index) =>
               dt ? (
                  <div
                     key={index}
                     className={`${
                        dateEquality(dt, currentDate)
                           ? "day-number-box-equal"
                           : "day-number-box-not-equal"
                     } day-number-box`}
                     onClick={() => {
                        onSelectDate(adjustDateForTimezone(dt));
                        setCurrentDate(dt);
                     }}
                  >
                     {dt.getDate()}
                  </div>
               ) : (
                  <div key={index}></div> // Render an empty cell
               ),
            )}
         </div>
      </div>
   );
};

export default Calendar;
