import axios from "axios";
import { getServerSession } from "next-auth";
import { getSession, signOut, useSession } from "next-auth/react";

export const axiosInstance = async () => {
  const session = await getSession();
  const token = session?.jwt;
  const refreshToken = session?.refreshToken;
  const axiosClient = axios.create({
    baseURL: "http://localhost:8080/",
    responseType: "json",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response && error.response.status === 401) {
        try {
          const refreshTokenResponse = await axiosClient.post(
            "/auth/refreshToken",
            {
              refreshToken: refreshToken,
            }
          );
          const newToken = refreshTokenResponse.data.accessToken;
          axiosClient.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newToken}`;
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          // Retry the original request with the updated token
          return axiosClient(originalRequest);
        } catch (error) {
          console.log(error);
          document.cookie = ""; // Replace this with the appropriate code to clear cookies

          // You can also consider refreshing the page to reset the application state
          await signOut({ redirect: true });

          // Throw the error to stop the further processing of the request
          throw error;
        }
      }

      // For other error statuses, simply throw the error to be handled elsewhere
      throw error;
    }
  );

  return axiosClient;
};
