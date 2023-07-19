"use client";
import { axiosInstance } from "@/lib/axios/index";

import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

const Dashboard = () => {
  const [data, setData] = useState("");
  const healthCheck = useCallback(async () => {
    try {
      const res = await axiosInstance.get("auth/get");
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    healthCheck();
  }, []);

  return (
    <div className="flex flex-col w-[100%] max-h-[100%]">
      <h1 className="block font-sans text-5xl font-semibold leading-tight tracking-normal text-inherit antialiased">
        Dashboard
      </h1>
      {data}
    </div>
  );
};
export default Dashboard;
