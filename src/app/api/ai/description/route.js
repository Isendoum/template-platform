import { NextResponse } from "next/server";

import { addSystemPromptAndQuestion, cleanAnswer } from "@/lib/utils/aiTools";
import { makeTextInference } from "@/services/huggingFaceService";
export async function GET(request) {
   const { searchParams } = new URL(request.url);
   const cat = searchParams.get("cat");
   const dataT = {
      inputs: addSystemPromptAndQuestion({
         system: `Give a description for a ${
            cat ? cat : "sports"
         } website. No more than 20 words. Just the description without any other text or title.
         Example:

         User: Description
         Assistant: Your one-stop shop for the latest electronics, gadgets, and innovations, crafted to simplify your life

         User: Description
         Assistant: Your one-stop shop for the latest sports news, scores, stats, and analysis from around the world, updated in real-time
         `,
         input: "Description",
      }),
   };

   try {
      const response = await makeTextInference(dataT);

      const data = response.data;

      return new NextResponse(cleanAnswer(data), {
         headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            "Access-Control-Allow-Origin": "*",
         },
      });

      // Assume data is an array of chunks
   } catch (error) {
      console.error("Error in GET endpoint:", error);
   }
}
