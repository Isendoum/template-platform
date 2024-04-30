"use client";

import React from "react";

import { useAiContext } from "@/context/AiProvider";

// Define a fetcher function to get data from an endpoint
interface AiDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {}

// Create the component to fetch data using SWR
const AiDescription: React.FC<AiDescriptionProps> = () => {
   const { descriptionData } = useAiContext();

   return (
      <div className="space px-8 py-10 mb-8 animate-fade-in">
         <h1 className="text-xl">{descriptionData}</h1>
      </div>
   );
};

export default AiDescription;
