import axios from "axios";
import { getSession, signIn, signOut } from "next-auth/react";
let token;

const setGetSessionJwt = async () => {
  const session = await getSession();
  token = session?.jwt;
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return token;
};

let axiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
  responseType: "json",
  headers: {
    "content-type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

axiosInstance.interceptors.request.use(async (req) => {
  const token = await setGetSessionJwt();
  req.headers.Authorization = `Bearer ${token}`;
  return req;
});

axiosInstance.interceptors.response.use(
  async (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401) {
      try {
        const sessionOld = await getSession();
        const refreshToken = sessionOld?.refreshToken;
        axiosInstance.interceptors.response.eject(originalRequest);

        const res = await signIn("credentials", {
          redirect: false,
          refreshToken: refreshToken!,
        });
        if (res?.error) {
          console.log("In sign in axios 401 error");
          await signOut({ redirect: true });
          throw error;
        }
        if (res?.ok) {
          const token = await setGetSessionJwt();
          originalRequest.headers.Authorization = `Bearer ${token}`;
          // this causes loops
          return axiosInstance(originalRequest);
        }
      } catch (error) {
        // You can also consider refreshing the page to reset the application state
        await signOut({ redirect: true });

        // Throw the error to stop the further processing of the request
        throw error;
      }
    }
    if (error.response && error.response.status === 403) {
      axiosInstance.interceptors.response.eject(originalRequest);
      await signOut({ redirect: true });
    }

    // For other error statuses, simply throw the error to be handled elsewhere
    throw error;
  }
);

export { axiosInstance };
