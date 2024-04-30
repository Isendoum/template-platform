"use client";

import AiCover from "@/components/ai/AiCover";
import AiDescription from "@/components/ai/AiDescription";
import AiFeatures from "@/components/ai/AiFeatures";
import AiTitle from "@/components/ai/AiTitle";
import { useAiContext } from "@/context/AiProvider";

export default function Home() {
   const { allLoaded } = useAiContext();
   // Track loading states for each component

   return (
      <div className="flex flex-col w-[100%] items-center">
         {allLoaded ? (
            <div className="flex flex-col w-[100%] items-center">
               <AiCover>
                  <div className="bg-[#11111150] flex h-[30rem] flex align-center align-center justify-center items-center">
                     <AiTitle />
                  </div>
               </AiCover>
               <div className="animate-fade-in flex flex-col text-center p-8 rounded-lg w-[80%] mb-16">
                  <div className="flex flex-col lg:flex-row justify-around w-[100%]">
                     <AiDescription />
                  </div>
               </div>
               <AiFeatures />
            </div>
         ) : (
            <div className="flex flex-col w-[100%] h-[100vh] justify-center items-center">
               Login and generate static content
            </div>
         )}
      </div>
   );
}
