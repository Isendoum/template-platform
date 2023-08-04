"use client";
import Link from "next/link";
import NavMobileMenu from "./NavMobileMenu";
import NavMenuItem from "./NavMenuItem";
import {
  DetailedHTMLProps,
  HTMLAttributes,
  LegacyRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const menu = [
  {
    label: "Home",
    link: "/",
    children: [
      {
        label: "Other",
        link: "/1",
      },
      {
        label: "Other 2 Other 2 Other 2",
        link: "/2",
      },
    ],
  },
  {
    label: "Services",
    link: "/3",
    children: [
      {
        label: "Service 1",
        link: "/4",
      },
      {
        label: "Service 2",
        link: "/5",
      },
    ],
  },
];

const NavMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<String | null>(null);
  const session = useSession();
  const pathname = usePathname();
  const navMenuRef = useRef<HTMLDivElement>(null);
  const setIsOpenCallback = useCallback((val: boolean) => {
    setIsOpen(val);
  }, []);
  const setIsClosingCallback = useCallback((val: boolean) => {
    setIsClosing(val);
  }, []);
  const setIsExpandedCallback = useCallback((val: string) => {
    setExpandedMenu(val);
  }, []);
  const renderMenuItems = (
    menuItems: any,
    setIsClosing?: (val: boolean) => void,
    expandedMenu?: any,
    setExpandedMenu?: any
  ) => {
    return menuItems.map((mItem: any) => (
      <NavMenuItem
        key={mItem.link}
        title={mItem.label}
        link={mItem.link}
        expandedMenu={expandedMenu} // pass down the state
        setExpandedMenu={setExpandedMenu} // pass down the setter
        setIsClosing={setIsClosing}>
        {mItem.children && (
          <ul className="pl-2">{renderMenuItems(mItem.children)}</ul>
        )}
      </NavMenuItem>
    ));
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      //@ts-ignore
      if (navMenuRef.current && !navMenuRef.current.contains(event.target)) {
        setExpandedMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (pathname.includes("/platform")) {
    return null;
  }
  return (
    <div className="w-full" ref={navMenuRef}>
      <div className="flex flex-row w-full bg-[#4169E1] h-[4rem] justify-between items-center">
        <div className="max-lg:hidden flex flex-row pl-6 items-center">
          <p className="pr-6">Logo</p>
          {renderMenuItems(
            menu,
            () => null,
            expandedMenu,
            setIsExpandedCallback
          )}
        </div>
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
