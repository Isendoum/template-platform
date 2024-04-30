"use client";

import React from "react";

import { useAiContext } from "@/context/AiProvider";

// Create the component to fetch data using SWR
const AiTitle = () => {
   const { titleData } = useAiContext();

   // Display the fetched data
   return (
      <div className="px-8 py-10 mb-8 animate-fade-in">
         <h1 className="text-3xl">{titleData}</h1>
      </div>
   );
};

export default AiTitle;
