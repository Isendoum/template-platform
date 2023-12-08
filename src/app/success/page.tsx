"use client";
import CustomButton from "@/components/core/buttons/Button";
import SimpleSpace from "@/components/core/spaces/SimpleSpace";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
export default function SuccessPage() {
   const router = useRouter();
   const params = useSearchParams();

   return (
      <div className="container mx-auto px-6 py-12 h-full flex justify-center items-center">
         <SimpleSpace>
            <div className="flex justify-center mb-6">
               <CheckCircleIcon
                  width={75}
                  height={75}
                  className="self-center align-center"
                  color="green"
               />
            </div>

            <div className="text-black text-center mb-4 min-w-[10rem]">
               {params.get("message")}
            </div>
            <CustomButton onClick={() => router.replace("/")} type="submit">
               {"<--"}
            </CustomButton>
         </SimpleSpace>
      </div>
   );
}
