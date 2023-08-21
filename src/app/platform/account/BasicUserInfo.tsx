"use client";

import CustomButton from "@/components/core/buttons/Button";
import TextInput from "@/components/core/inputs/TextInput";
import { axiosInstance } from "@/lib/axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn, useSession } from "next-auth/react";
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
  const { data } = useSession();
  const [error, setError] = useState("");

  return (
    <form>
      {error && (
        <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
      )}
      <div className="min-h-[200px]">
        {data?.user ? (
          <div>
            <label className="font-semibold text-[#07074D]">Username</label>
            <div className="mb-6 text-[#07074D]">{data?.user?.name}</div>
            <label className="font-semibold text-[#07074D]">Email</label>
            <div className="mb-6 text-[#07074D]">{data?.user?.email}</div>
          </div>
        ) : (
          <div className="mb-6 text-[#07074D]">loading info...</div>
        )}
      </div>
    </form>
  );
};

export default BasicInfoForm;
