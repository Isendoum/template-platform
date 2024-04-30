"use client";

import { usePathname } from "next/navigation";

export default function Page() {
   const pathname = usePathname();

   // Track loading states for each component

   return (
      <div className="flex flex-col w-[100%] items-center">
         {pathname?.replace("/", "")}
      </div>
   );
}
