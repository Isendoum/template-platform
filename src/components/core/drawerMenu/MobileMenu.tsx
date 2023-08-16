import { Dispatch, SetStateAction } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
const MobileMenu = ({
  isOpen,
  setIsOpen,
  children,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: any;
}) => {
  return (
    <div
      className={`relative z-10 ${isOpen ? `` : `hidden`}`}
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="pointer-events-auto relative w-screen max-w-md">
              <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                <span className="sr-only">Close panel</span>
                <XMarkIcon
                  className="w-6 h-6 cursor-pointer text-gray-300 hover:text-white lg:hidden mr-4"
                  onClick={() => setIsOpen(false)}
                />
              </div>

              <div className="flex h-full flex-col overflow-y-hidden bg-white py-6 shadow-xl bg-gray-50 dark:bg-gray-800">
                <div className="px-4 sm:px-6"></div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
