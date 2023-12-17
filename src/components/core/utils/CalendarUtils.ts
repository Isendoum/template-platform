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
