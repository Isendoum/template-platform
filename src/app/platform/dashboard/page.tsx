"use client";
import { useAiContext } from "@/context/AiProvider";
import { Form } from "./form";
import { useRouter } from "next/navigation";

const Dashboard = () => {
   const { allLoaded, shouldFetch } = useAiContext();
   const router = useRouter();
   return (
      <div className="flex flex-col w-[100%] max-h-[100%]">
         <h1 className="block font-sans text-5xl font-semibold leading-tight tracking-normal text-inherit antialiased mb-4">
            Dashboard
         </h1>
         <Form />
         <div className="flex flex-col w-[100%] max-h-[100%] items-center">
            {allLoaded && (
               <div>
                  Content is ready!
                  <span
                     onClick={() => router.push("/")}
                     className="text-white font-bold cursor-pointer"
                  >
                     {" go to home page "}
                  </span>
                  and check what you generated!
               </div>
            )}
            {shouldFetch && <div>Content generating...</div>}
         </div>
      </div>
   );
};
export default Dashboard;
