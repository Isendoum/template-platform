import { NextResponse } from "next/server";
import { addSystemPromptAndQuestion, cleanAnswer } from "@/lib/utils/aiTools";
import { makeTextInference } from "@/services/huggingFaceService";
export async function GET(request) {
   const { searchParams } = new URL(request.url);
   const cat = searchParams.get("cat");
   const dataT = {
      inputs: addSystemPromptAndQuestion({
         system: `An array of 8 strings. Each string represents a feature of a ${
            cat ? cat : "sports"
         } website. Reply always with the array and nothing else don't add any | symbol in the end. DON'T put the array inside a json object.
            Example:

            User: Features
            Assistant: ["Player Stats", "Game Schedule", "Season Highlights"]
            
            User: Features
            Assistant: ["Chat","Videos","Episodes"]
            `,
         input: "Features ",
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
