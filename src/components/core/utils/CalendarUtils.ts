export const getLocalizedMonths = (locale: string) => {
   const formatter = new Intl.DateTimeFormat(locale, { month: "long" });
   return Array.from({ length: 12 }, (_, i) =>
      formatter.format(new Date(0, i)),
   );
};

export const getLocalizedDays = (locale: string) => {
   const formatter = new Intl.DateTimeFormat(locale, { weekday: "short" });
   return Array.from({ length: 7 }, (_, i) =>
      formatter.format(new Date(2021, 5, 6 + i)),
   ); // Use a fixed date known to be a Sunday
};

export const getDaysInMonth = (year: number, month: number) => {
   return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = (year: number, month: number) => {
   return new Date(year, month, 1).getDay();
};

export const adjustDateForTimezone = (date: Date) => {
   const timezoneOffsetInMinutes = date.getTimezoneOffset();
   return new Date(date.getTime() - timezoneOffsetInMinutes * 60000); // 60000 milliseconds in a minute
};

export const dateEquality = (date: Date, curDate: Date | null) => {
   if (date && curDate) {
      return (
         adjustDateForTimezone(date).toISOString().split("T")[0] ===
         adjustDateForTimezone(curDate).toISOString().split("T")[0]
      );
   }
   return false;
};

export const formatDate = (date: Date) => {
   if (!(date instanceof Date)) return "";

   const day = date.getDate().toString().padStart(2, "0");
   const month = (date.getMonth() + 1).toString().padStart(2, "0");
   const year = date.getFullYear();

   return `${day}/${month}/${year}`;
};

// Parses a string in "dd/mm/yyyy" format to a Date object
export const parseDate = (dateStr: string) => {
   const parts = dateStr.match(/(\d+)/g);
   if (!parts || parts.length !== 3) return null;

   const [day, month, year] = parts.map((part) => parseInt(part, 10));
   const date = new Date(year, month - 1, day);
   return date &&
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
      ? date
      : null;
};
