"use client";

import CustomButton from "@/components/core/buttons/Button";
import TextInput from "@/components/core/inputs/TextInput";
import ButtonLoader from "@/components/core/loaders/ButtonLoader";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

type Inputs = {
  username: string;
  password: string;
};
export const LoginForm = () => {
  const validationSchema = yup
    .object({
      username: yup.string(),
      password: yup.string(),
    })
    .required();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isLoading, isSubmitting },
  } = useForm<Inputs>({ resolver: yupResolver(validationSchema) });
  const router = useRouter();

  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/platform/dashboard";

  const onSubmit = async (values: Inputs) => {
    try {
      const res = await signIn("google", { redirect: false });
      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        setError("invalid username or password");
      }
    } catch (error: any) {
      setError(error?.message);
    } finally {
    }
  };

  const input_style = `form-control block w-full px-4 py-5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded 
    transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`;

  return (
    <div>
      {error && (
        <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
      )}

      <CustomButton
        disabled={isSubmitting}
        onClick={handleSubmit(onSubmit)}
        type="submit">
        Sign In with Google
        {isSubmitting && <ButtonLoader />}
      </CustomButton>
    </div>
  );
};
