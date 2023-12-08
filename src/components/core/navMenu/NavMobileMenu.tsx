"use client";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Dispatch, SetStateAction, useEffect } from "react";

const NavMobileMenu = ({
   isOpen,
   setIsOpen,
   isClosing,
   setIsClosing,
   children,
}: {
   isOpen: boolean;
   setIsOpen: Dispatch<SetStateAction<boolean>>;
   isClosing: boolean;
   setIsClosing: Dispatch<SetStateAction<boolean>>;
   children: React.ReactNode[];
}) => {
   useEffect(() => {
      if (isClosing) {
         const timer = setTimeout(() => {
            setIsOpen(false);
            setIsClosing(false);
         }, 500); // this is the duration of your transition in milliseconds
         return () => clearTimeout(timer);
      }
   }, [isClosing, setIsOpen]);
   return (
      <div
         className={`relative z-10 ${isOpen ? "" : "hidden"} ${
            isClosing ? "opacity-0 transition-opacity duration-500" : ""
         }`}
         aria-labelledby="slide-over-title"
         role="dialog"
         aria-modal="true"
      >
         <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

         <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
               <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                  <div className="pointer-events-auto relative w-screen max-w-md">
                     <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                        <XMarkIcon
                           className="w-6 h-6 cursor-pointer text-gray-300 hover:text-white lg:hidden mr-4"
                           onClick={() => setIsClosing(true)}
                        />

                        <span className="sr-only">Close panel</span>
                     </div>

                     <nav className="flex h-full flex-col overflow-y-hidden py-6 shadow-xl">
                        <div className="px-4 sm:px-6"></div>
                        <div className="relative mt-6 flex-1 px-4 sm:px-6">
                           {children}
                        </div>
                     </nav>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default NavMobileMenu;
