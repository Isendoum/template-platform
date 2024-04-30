"use client";

import AiCover from "@/components/ai/AiCover";
import AiDescription from "@/components/ai/AiDescription";
import AiFeatures from "@/components/ai/AiFeatures";
import AiTitle from "@/components/ai/AiTitle";
import { useAiContext } from "@/context/AiProvider";
import { useRouter } from "next/navigation";

export default function Home() {
   const { allLoaded } = useAiContext();
   const router = useRouter();
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
               <div className="max-w-2xl mx-auto text-center">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                     Welcome to <span className="text-blue-600">Demo</span>!
                  </h1>
                  <p className="mb-6 text-white-700">
                     Unlock your creative potential with the ultimate platform
                     for digital creation. Here at{" "}
                     <span className="font-semibold">Demo</span>,{" "}
                     {`we empower you
                     to seamlessly design and customize your own home pages
                     using cutting-edge AI technology, including LLMS and other
                     models. Whether you're a professional looking to streamline
                     your projects or a beginner eager to explore the world of
                     web design, our user-friendly interface and powerful tools
                     are designed to enhance your creative journey.`}
                  </p>
                  <span
                     onClick={() => router.push("/login")}
                     className="inline-block bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                  >
                     Get Started Now!
                  </span>
                  <p className="mt-8 text-white-600">
                     Explore, create, and share your vision with the world
                     today. The future of web design is just a click away.
                  </p>
               </div>
            </div>
         )}
      </div>
   );
}
