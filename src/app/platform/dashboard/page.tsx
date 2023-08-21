"use client";
import { axiosInstance } from "@/lib/axios/index";
import axios from "axios";

import { useCallback, useEffect, useState } from "react";

const Dashboard = () => {
  const [data, setData] = useState("");
  const healthCheck = useCallback(async () => {
    try {
      const res = await axios.get("/api/user");
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
    </div>
  );
};
export default Dashboard;
