import React from "react";

import { XMarkIcon } from "@heroicons/react/24/solid";

interface ModalProps {
   show: boolean;
   onClose?: () => void;
   children?: React.ReactNode;
}

const Modal = ({ show, onClose, children }: ModalProps) => {
   if (!show) {
      return null;
   }

   const okButtonActions = () => {
      onClose && onClose();
   };

   return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
         <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
               <div className="cursor-pointer" onClick={onClose}>
                  <XMarkIcon width={20} color="black" height={20} />
               </div>
            </div>
            <div className="px-4 py-5 sm:p-6">{children}</div>
            <div className="grid grid-cols-2 p-2">
               <button
                  onClick={okButtonActions}
                  className="bg-transparent text-gray-700 hover:bg-transparent"
               >
                  cancel
               </button>
               <button
                  onClick={okButtonActions}
                  className="bg-transparent text-gray-700 hover:bg-transparent"
               >
                  ok
               </button>
            </div>
         </div>
      </div>
   );
};

export default Modal;
