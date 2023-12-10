"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

const BasicInfoForm = () => {
   const { data } = useSession();
   const [error] = useState("");

   return (
      <form>
         {error && (
            <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
         )}
         <div className="min-h-[200px]">
            {data?.user ? (
               <div>
                  <label className="font-semibold">Username</label>
                  <div className="mb-6">{data?.user?.name}</div>
                  <label className="font-semibold">Email</label>
                  <div className="mb-6">{data?.user?.email}</div>
               </div>
            ) : (
               <div className="mb-6">loading info...</div>
            )}
         </div>
      </form>
   );
};

export default BasicInfoForm;
