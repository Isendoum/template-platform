"use client";

import CustomButton from "@/components/core/buttons/Button";
import ButtonLoader from "@/components/core/loaders/ButtonLoader";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

type Inputs = {
  username: string;
  password: string;
};
export const LoginForm = () => {
  const router = useRouter();

  const [error, setError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/platform/dashboard";

  const onSubmit = async () => {
    try {
      setLoggingIn(true);
      const res = await signIn("google", { callbackUrl: callbackUrl });
    } catch (error: any) {
      setError(error?.message);
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <div>
      {error && (
        <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
      )}

      <CustomButton disabled={loggingIn} onClick={onSubmit}>
        Sign In with Google{loggingIn && <ButtonLoader />}
      </CustomButton>
    </div>
  );
};
