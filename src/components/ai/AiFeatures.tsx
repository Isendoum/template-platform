"use client";

import React from "react";

import { isArray } from "lodash";
import SimpleSpace from "../core/spaces/SimpleSpace";
import { useAiContext } from "@/context/AiProvider";

// Define a fetcher function to get data from an endpoint
interface AiFeaturesProps extends React.HTMLAttributes<HTMLDivElement> {}

// Create the component to fetch data using SWR
const AiFeatures: React.FC<AiFeaturesProps> = () => {
   // Fetch the title from the endpoint using SWR
   const { featuresData } = useAiContext();

   // Display the fetched data
   return (
      <SimpleSpace className="animate-fade-in flex flex-col text-center p-8 w-[80%]">
         <div className="grid grid-rows-4 grid-cols-1 lg:grid-cols-4 lg:grid-rows-2 justify-start w-[100%]">
            {isArray(featuresData) &&
               featuresData.map((ele: string) => (
                  <>
                     {ele ? (
                        <p key={ele} className="text-xl p-2 hover-grow">
                           {ele}
                        </p>
                     ) : null}
                  </>
               ))}
         </div>
      </SimpleSpace>
   );
};

export default AiFeatures;
