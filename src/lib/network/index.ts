import axios from "axios";
export const fetcher = (url: string) => axios.get(url).then((res) => res.data);

// Fetcher function to get Blob data
export const imageFetcher = async (url: string) => {
   const response = await axios.get(url, {
      responseType: "blob", // Retrieve as Blob
   });
   return response.data; // Return the Blob
};
