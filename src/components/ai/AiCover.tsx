"use client";
/* eslint-disable @next/next/no-img-element */
import React from "react";

import { useAiContext } from "@/context/AiProvider";

interface AiCoverProps extends React.HTMLAttributes<HTMLDivElement> {
   children?: React.ReactNode;
}

const AiCover: React.FC<AiCoverProps> = ({ children }) => {
   const { imageUrl } = useAiContext();

   return (
      <div
         className="animate-fade-in"
         style={{
            backgroundImage: `url(${imageUrl})`, // Set the background image
            backgroundSize: "cover", // Ensures it covers the container
            backgroundAttachment: "fixed", // Makes the image "scroll"
            width: "100%", // Ensure it fills the width
            height: "100%", // Ensure it fills the height
            position: "relative", // Position relative for absolute children
            textAlign: "center",
         }}
      >
         {children}
      </div>
   );
};

export default AiCover;

/* eslint-disable @next/next/no-img-element */
//React.FC<React.HTMLAttributes<HTMLDivElement>>
