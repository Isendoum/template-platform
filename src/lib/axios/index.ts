import axios from "axios";
import { getSession, signOut } from "next-auth/react";

let axiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
  responseType: "json",
  headers: {
    "content-type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  async (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const session = await getSession();
    const refreshToken = session?.refreshToken;
    if (error.response && error.response.status === 401) {
      try {
        const refreshTokenResponse = await axiosInstance.post(
          "/auth/refreshToken",
          {
            refreshToken: refreshToken,
          }
        );
        axiosInstance.interceptors.response.eject(originalRequest);
        const newToken = refreshTokenResponse.data.accessToken;
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newToken}`;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        // Retry the original request with the updated token
        return axiosInstance(originalRequest);
      } catch (error) {
        console.log(error);

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

export { axiosInstance };
