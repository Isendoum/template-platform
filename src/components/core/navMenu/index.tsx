"use client";
import Link from "next/link";
import NavMobileMenu from "./NavMobileMenu";
import NavMenuItem from "./NavMenuItem";
import { useCallback, useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const menu = [
  {
    label: "Home",
    link: "/",
  },
];

const NavMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const session = useSession();
  const pathname = usePathname();
  const setIsOpenCallback = useCallback((val: boolean) => {
    setIsOpen(val);
  }, []);
  const setIsClosingCallback = useCallback((val: boolean) => {
    setIsClosing(val);
  }, []);

  const renderMenuItems = (
    menuItems: any,
    setIsOpen?: (val: boolean) => void,
    setIsClosing?: (val: boolean) => void
  ) => {
    return menuItems.map((mItem: any) => (
      <NavMenuItem
        key={mItem.link}
        title={mItem.label}
        link={mItem.link}
        setIsClosing={setIsClosing}>
        {mItem.children && (
          <ul className="pl-2">{renderMenuItems(mItem.children)}</ul>
        )}
      </NavMenuItem>
    ));
  };
  if (pathname.includes("/platform")) {
    return null;
  }
  return (
    <div className="w-full">
      <div className="flex flex-row w-full bg-black h-[4rem] justify-between items-center">
        <div>{renderMenuItems(menu)}</div>
        {session?.status !== "authenticated" && (
          <div className="flex flex-row items-center mr-4">
            <Link
              className="inline-block px-6 py-3 text-white shadow-lg hover:text-sky-400"
              href="/signUp">
              <span className="text-1xl ">Sign up</span>
            </Link>
            <Link
              href="/login"
              className="inline-block px-6 py-3 text-white shadow-lg hover:text-sky-400">
              <span className="text-1xl ">Login</span>
            </Link>
          </div>
        )}

        {session?.status === "authenticated" && (
          <div className="flex flex-row items-center mr-4">
            <Link
              className="inline-block px-6 py-3 text-white shadow-lg hover:text-sky-400"
              href="/platform/dashboard">
              <span className="text-1xl ">Dashboard</span>
            </Link>
          </div>
        )}

        <Bars3Icon
          className="w-6 h-6 cursor-pointer lg:hidden mr-4"
          onClick={() => setIsOpen(true)}
        />
      </div>
      <div id="test" className="lg:hidden">
        <NavMobileMenu
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isClosing={isClosing}
          setIsClosing={setIsClosing}>
          {renderMenuItems(menu, setIsOpenCallback, setIsClosingCallback)}
        </NavMobileMenu>
      </div>
    </div>
  );
};

export default NavMenu;
