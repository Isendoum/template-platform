"use client";

import CustomButton from "@/components/core/buttons/Button";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export const LoginForm = () => {
   const [error, setError] = useState("");
   const [loggingIn, setLoggingIn] = useState(false);

   const searchParams = useSearchParams();
   const callbackUrl = searchParams.get("callbackUrl") || "/platform/dashboard";

   const onSubmit = async () => {
      try {
         setLoggingIn(true);
         await signIn("google", { callbackUrl: callbackUrl });
      } catch (error: any) {
         setError(error?.message);
      } finally {
         setLoggingIn(false);
      }
   };

   return (
      <div>
         {error && (
            <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
         )}

         <CustomButton
            disabled={loggingIn}
            loading={!loggingIn}
            onClick={onSubmit}
            iconRight={<ArrowRightOnRectangleIcon className="w-6 h-6" />}
         >
            Sign In with Google
         </CustomButton>
      </div>
   );
};
