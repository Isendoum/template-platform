// src/contexts/AiCoverContext.js
import React, {
   createContext,
   useContext,
   useState,
   useEffect,
   SetStateAction,
   Dispatch,
} from "react";
import useSWR from "swr";
import { fetcher, imageFetcher } from "@/lib/network";
import SkeletonLoader from "@/components/core/loaders/SkeletonLoader";

type IAiContext = {
   featuresData: string;
   imageUrl: string | null;
   titleData: string;
   descriptionData: string;
   allLoaded: boolean;
   canReset: boolean;
   shouldFetch: boolean;
   setCategory: Dispatch<SetStateAction<string | undefined>>;
   setShouldFetch: Dispatch<SetStateAction<boolean>>;
   setAllLoaded: Dispatch<SetStateAction<boolean>>;
   setCanReset: Dispatch<SetStateAction<boolean>>;
   category: string | undefined;
};

const AiCoverContext = createContext<IAiContext | null>(null);

export const useAiContext = (): IAiContext => {
   const context = useContext(AiCoverContext);
   if (context === null) {
      throw new Error(
         "useAiContext must be used within an AiCoverContextProvider",
      );
   }
   return context;
};

export const AiProvider = ({ children }: { children: React.ReactNode }) => {
   const [imageUrl, setImageUrl] = useState<string | null>(null);
   const [shouldFetch, setShouldFetch] = useState<boolean>(false);
   const [allLoaded, setAllLoaded] = useState(false);
   const [category, setCategory] = useState<string | undefined>("");
   const [canReset, setCanReset] = useState<boolean>(false);

   const {
      data: coverData,
      // error: coverError,
      // isLoading: coverIsLoading,
   } = useSWR(
      category !== "" ? `/api/ai/cover?cat=${category}` : null,
      imageFetcher,
      {
         suspense: true,
         fallbackData: null,
         revalidateOnFocus: false,
      },
   );
   const {
      data: featuresData,
      // error: featuresError,
      // isLoading: featuresIsLoading,
   } = useSWR(
      category !== "" ? `/api/ai/features?cat=${category}` : null,
      fetcher,
      {
         suspense: false,
         fallbackData: null,
         revalidateOnFocus: false,
      },
   );

   const {
      data: titleData,
      // error: titleError,
      // isLoading: titleIsLoading,
   } = useSWR(
      category !== "" ? `/api/ai/title?cat=${category}` : null,
      fetcher,
      {
         suspense: false,
         fallbackData: null,
         revalidateOnFocus: false,
      },
   );

   const {
      data: descriptionData,
      // error: descriptionError,
      // isLoading: descriptionIsLoading,
   } = useSWR(
      category !== "" ? `/api/ai/description?cat=${category}` : null,
      fetcher,
      {
         suspense: false,
         fallbackData: null,
         revalidateOnFocus: false,
      },
   );

   useEffect(() => {
      if (coverData) {
         const objectUrl = URL.createObjectURL(coverData);
         setImageUrl(objectUrl);

         return () => URL.revokeObjectURL(objectUrl);
      }
   }, [coverData]);

   useEffect(() => {
      if (featuresData && descriptionData && titleData && imageUrl) {
         setAllLoaded(true);
         setShouldFetch(false);
         setCanReset(true);
      }
   }, [featuresData, descriptionData, titleData, imageUrl]);

   useEffect(() => {
      if (!canReset) {
         setAllLoaded(false);
         setImageUrl(null);
      }
   }, [canReset]);

   const value: IAiContext | null = {
      imageUrl,
      featuresData,
      titleData,
      descriptionData,
      setCategory,
      allLoaded,
      setShouldFetch,
      setAllLoaded,
      category,
      canReset,
      setCanReset,
      shouldFetch,
   };

   return (
      <AiCoverContext.Provider value={value}>
         {shouldFetch && !allLoaded && (
            <SkeletonLoader
               style={{ height: "100%", width: "100%", zIndex: 10 }}
            >
               <span className="text-3xl bold">Loading Content...</span>
            </SkeletonLoader>
         )}
         {children}
      </AiCoverContext.Provider>
   );
};
