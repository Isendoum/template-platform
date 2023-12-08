import { useState, useEffect } from "react";
import MenuItemTitle from "./NavMenuItemTitle";
import { useRouter } from "next/navigation";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const NavMenuItem = ({
   title,
   link,
   //  icon,
   setIsClosing,
   children,
   expandedMenu,
   setExpandedMenu,
}: {
   title: string;
   link: string;
   // icon?: any;
   expandedMenu?: string | null;
   setExpandedMenu?: (val: string | null) => void;
   setIsClosing?: (val: boolean) => void;
   children?: React.ReactNode;
}) => {
   const router = useRouter();
   const isExpanded = expandedMenu === title;
   const handleClick = () => {
      setIsClosing ? setIsClosing(true) : null;
      router.push(link);
   };

   const handleExpandClick = () => {
      setExpandedMenu && setExpandedMenu(isExpanded ? null : title);
   };

   const [transitionDuration, setTransitionDuration] = useState("duration-500");

   useEffect(() => {
      if (isExpanded) {
         setTransitionDuration("duration-500"); // fade-in when opening
      } else {
         setTransitionDuration("duration-500"); // fade-out when closing
      }
   }, [isExpanded]);

   return (
      <li id={title} className={"flex flex-col w-full"}>
         <div className={"flex flex-row items-center relative"}>
            <div className="flex flex-row w-full justify-between p-2 text-base font-normal">
               <div onClick={handleClick} className="flex">
                  <MenuItemTitle title={title} />
               </div>
               {children && (
                  <div className="flex self-end ml-2 cursor-pointer">
                     <ChevronDownIcon
                        onClick={handleExpandClick}
                        className={"w-5 h-5"}
                     />
                  </div>
               )}
            </div>
            <div
               className={`nav-submenu transition-opacity ${transitionDuration} ${
                  isExpanded ? "opacity-100" : "opacity-0"
               }`}
            >
               {children}
            </div>
         </div>
      </li>
   );
};

export default NavMenuItem;
