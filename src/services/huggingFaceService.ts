import axios from "axios";

export const makeTextInference = async (data: any) => {
   const response = await axios.post(
      "https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct",
      {
         ...data,
         parameters: {
            stop: ["<|end_of_text|>", "<|eot_id|>"],
         },
         temperature: 0.7,
         top_k: 40,
         top_p: 0.95,
         min_p: 0.05,
         repeat_penalty: 1.1,
         max_tokens: -1,
      },
      {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
         },
      },
   );
   return response;
};

export const generateImage = async (data: any) => {
   const response = await axios.post(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1",
      data,
      {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`, // Ensure API key is set
         },
         responseType: "arraybuffer", // Expect binary data
      },
   );
   return response;
};
