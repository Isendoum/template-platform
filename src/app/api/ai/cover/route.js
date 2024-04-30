import { NextResponse } from "next/server";
import { generateImage } from "@/services/huggingFaceService";

export async function GET(request) {
   const { searchParams } = new URL(request.url);
   const cat = searchParams.get("cat");
   let seed = Math.floor(Math.random() * 100);
   const dataT = {
      seed: seed,
      parameters: {
         width: 768,
         height: 512,
         num_inference_steps: 10,
      },

      inputs: `A cover photo for a ${
         cat ? cat : "sports"
      } website. 4k, photo realistic, detailed, cover`, // Remove unnecessary JSON stringification
   };

   try {
      const response = await generateImage(dataT);

      const imageBuffer = Buffer.from(response.data); // Convert array buffer to buffer

      return new NextResponse(imageBuffer, {
         headers: {
            "Content-Type": "image/jpeg", // Set appropriate content type
            "Cache-Control": "no-cache",
            "Access-Control-Allow-Origin": "*",
         },
      });
   } catch (error) {
      console.error("Error in GET endpoint:", error);

      // Return an error response
      return new NextResponse("An error occurred while fetching the image", {
         status: 500, // Internal Server Error status
         headers: {
            "Content-Type": "text/plain",
         },
      });
   }
}
