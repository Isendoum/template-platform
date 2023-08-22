"use client";
import { useRouter } from "next/navigation";
import "../../../app/globals.css";
import { useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import CustomButton from "../buttons/Button";
import { signOut, useSession } from "next-auth/react";
import MobileMenu from "./MobileMenu";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Logo from "../../../../public/logo.svg";

const menu = [
  {
    label: "Dashboard",
    link: "platform/dashboard",
  },
  { label: "Settings", link: "platform/settings" },
  { label: "Account", link: "platform/account" },
];

const DrawerMenu = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useSession();
  const [isClosing, setIsClosing] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const renderMenuItems = (menuItems: any) => {
    return menuItems.map((mItem: any) => (
      <MenuItem
        key={mItem.link}
        title={mItem.label}
        link={mItem.link}
        setIsClosing={setIsClosing}>
        {mItem.children && (
          <ul className="pl-2">{renderMenuItems(mItem.children)}</ul>
        )}
      </MenuItem>
    ));
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsOpen(false);
      }
    };

    // Attach the event listener when the component mounts
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const imageLoader = ({ src }: any) => {
    return src;
  };

  return (
    <div className={`lg:relative`}>
      <aside
        className={`lg:h-[100%] lg:w-64 flex lg:flex-col w-[100%] px-3 py-4 overflow-y-auto lg:rounded-r lg:h-[100%]`}
        aria-label="Sidebar">
        <div className="flex flex-row lg:justify-center items-center">
          <Bars3Icon
            className="w-8 h-8 cursor-pointer lg:hidden ml-4 mr-4"
            onClick={() => setIsOpen(true)}
          />
          <div
            className="ml-4 lg:mb-4 lg:ml-0 cursor-pointer font-sans"
            onClick={() => router.push("/")}>
            <Image width={36} height={36} alt="logo" src={Logo} />
          </div>

          <div id="test" className="lg:hidden">
            <MobileMenu
              isClosing={isClosing}
              setIsClosing={setIsClosing}
              isOpen={isOpen}
              setIsOpen={setIsOpen}>
              {renderMenuItems(menu)}
            </MobileMenu>
          </div>
        </div>

        <div className="flex lg:flex-col w-[100%] overflow-y-auto lg:rounded-r lg:h-[100%]">
          <div className="flex-col justify-between w-[100%] hidden lg:flex lg:h-[100%]">
            <ul
              className="flex flex-row items-center lg:items-start lg:flex-col overflow-x-auto w-[100%]"
              style={{ scrollbarWidth: "thin" }}>
              {renderMenuItems(menu)}
            </ul>
            <div>
              <div className="flex flex-row justify-around mb-2 items-center">
                <div>{data?.user?.name}</div>
                {data?.user?.image && (
                  <Image
                    className="rounded-2xl"
                    width={30}
                    height={30}
                    placeholder="empty"
                    src={data?.user?.image}
                    alt="profile pic"
                  />
                )}
              </div>
              <CustomButton
                onClick={async () => {
                  try {
                    // await axiosInstance.post("auth/signOut");
                  } catch (error) {
                  } finally {
                    signOut();
                  }
                }}>
                Logout
                <ArrowLeftOnRectangleIcon className="w-6 h-6 flex self-end flex-col" />
              </CustomButton>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default DrawerMenu;
