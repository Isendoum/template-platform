"use client";
import CustomButton from "@/components/core/buttons/Button";
import SimpleSpace from "@/components/core/spaces/SimpleSpace";
import { useRouter } from "next/navigation";

export default function SignUpEmailConfirmPage() {
   const router = useRouter();
   return (
      <div className="container mx-auto px-6 py-12 h-full flex justify-center items-center">
         <SimpleSpace>
            <div className="text-black text-center mb-4">Email have been confirmed successfully</div>
            <CustomButton onClick={() => router.replace("/login")} type="submit">
               go to login
            </CustomButton>
         </SimpleSpace>
      </div>
   );
}
