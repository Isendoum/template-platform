"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

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
