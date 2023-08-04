"use client";
import { useState } from "react";
import MenuItemTitle from "./NavMenuItemTitle";
import { useRouter } from "next/navigation";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const NavMenuItem = ({
  title,
  link,
  icon,
  setIsClosing,
  children,
  expandedMenu, // receive the state
  setExpandedMenu, // receive the setter
}: {
  title: string;
  link: string;
  icon?: any;
  expandedMenu: any;
  setExpandedMenu: (val: any) => void | undefined;
  setIsClosing?: (val: boolean) => void;
  children?: any[];
}) => {
  const router = useRouter();
  const isExpanded = expandedMenu === title;
  const handleClick = () => {
    setIsClosing ? setIsClosing(true) : null;
    router.push(link);
  };

  const handleExpandClick = () => {
    // if this menu is already expanded, collapse it, otherwise expand it
    setExpandedMenu(isExpanded ? null : title);
  };

  return (
    <li id={title} className={`flex flex-col w-full`}>
      <div className={`flex flex-row items-center relative`}>
        <div className="flex flex-row w-full justify-between p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white">
          <div onClick={handleClick} className="flex">
            <MenuItemTitle title={title} />
          </div>
          {children && (
            <div className="flex self-end ml-2 cursor-pointer">
              <ChevronDownIcon
                onClick={handleExpandClick} // toggle expansion here
                className={`w-6 h-6`}
              />
            </div>
          )}
        </div>
        <div className="absolute -bottom-[5.7rem] flex flex-col">
          <div className="bg-[#000080] rounded-b-lg">
            {isExpanded && children}
          </div>
        </div>
      </div>
    </li>
  );
};

export default NavMenuItem;
