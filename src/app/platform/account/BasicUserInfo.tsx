"use client";

import CustomButton from "@/components/core/buttons/Button";
import TextInput from "@/components/core/inputs/TextInput";
import { axiosInstance } from "@/lib/axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

type Inputs = {
  username: string;
  email: string;
};
const BasicInfoForm = () => {
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const getAccountInfo = async () => {
    try {
      const res = await axiosInstance.get("account/getUserInfo");
      setUser(res?.data);
    } catch (error) {}
  };
  useEffect(() => {
    (async () => {
      await getAccountInfo();
    })();
  }, []);

  const input_style = `form-control block w-full px-4 py-5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded 
    transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`;

  return (
    <form>
      {error && (
        <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
      )}
      <div className="min-h-[200px]">
        {user ? (
          <div>
            <label className="font-semibold text-[#07074D]">Username</label>
            <div className="mb-6 text-[#07074D]">{user?.username}</div>
            <label className="font-semibold text-[#07074D]">Email</label>
            <div className="mb-6 text-[#07074D]">{user?.email}</div>
          </div>
        ) : (
          <div className="mb-6 text-[#07074D]">loading info...</div>
        )}
      </div>
    </form>
  );
};

export default BasicInfoForm;
