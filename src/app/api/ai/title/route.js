import { NextResponse } from "next/server";

import { addSystemPromptAndQuestion, cleanAnswer } from "@/lib/utils/aiTools";
import { makeTextInference } from "@/services/huggingFaceService";

export async function GET(request) {
   const { searchParams } = new URL(request.url);
   const cat = searchParams.get("cat");
   const dataT = {
      inputs: addSystemPromptAndQuestion({
         system: `Give a title for a ${
            cat ? cat : "sports"
         } website. Just the name without any other text or description or .com or Note in the end.
            Example:
            
            User: Title
            Assistant: SportWave
            
            User: Title
            Assistant: ShadeCarrot
            `,
         input: "Title",
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
