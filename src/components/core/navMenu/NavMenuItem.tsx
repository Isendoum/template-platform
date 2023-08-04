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
}: {
  title: string;
  link: string;
  icon?: any;
  setIsClosing?: (val: boolean) => void;
  children?: any[];
}) => {
  const router = useRouter();
  const handleClick = () => {
    setIsClosing ? setIsClosing(true) : null;
    router.push(link);
  };
  return (
    <li id={title} className={`flex flex-col w-full`}>
      <div className={`flex flex-row items-center`}>
        <div className="flex flex-row w-full justify-between p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white">
          <div onClick={handleClick} className="flex">
            <MenuItemTitle title={title} />
          </div>
          {children && (
            <div className="flex self-end cursor-pointer">
              <ChevronDownIcon className={`w-6 h-6`} />
            </div>
          )}
        </div>
      </div>
      {children}
    </li>
  );
};

export default NavMenuItem;
