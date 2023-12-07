"use client";
import { useState } from "react";
import NavMenuItemTitle from "./NavMenuItemTitle";
import { useRouter } from "next/navigation";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const NavMenuItemMobile = ({
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
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const handleClick = () => {
    setIsClosing ? setIsClosing(true) : null;
    router.push(link);
  };
  const handleOpenMenuItem = () => {
    setIsOpen(!isOpen);
  };
  return (
    <li id={title} className={`flex flex-col w-full`}>
      <div className={`flex flex-row items-center`}>
        <div className="flex flex-row w-full justify-between p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white">
          <div onClick={handleClick} className="flex">
            <NavMenuItemTitle title={title} />
          </div>
          {children && (
            <div
              className="flex self-end cursor-pointer"
              onClick={handleOpenMenuItem}
            >
              <ChevronDownIcon className={`w-6 h-6`} />
            </div>
          )}
        </div>
      </div>

      {isOpen && children}
    </li>
  );
};

export default NavMenuItemMobile;
