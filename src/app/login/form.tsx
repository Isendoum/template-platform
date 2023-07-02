"use client";

import CustomButton from "@/components/core/buttons/Button";
import TextInput from "@/components/core/inputs/TextInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

type Inputs = {
  email: string;
  password: string;
};
export const LoginForm = () => {
  const validationSchema = yup
    .object({
      email: yup.string().email().required(),
      password: yup.string().required(),
    })
    .required();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(validationSchema) });
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/platform/dashboard";

  const onSubmit = async (values: Inputs) => {
    try {
      setLoading(true);

      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl,
      });

      setLoading(false);

      console.log(res);
      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        setError("invalid email or password");
      }
    } catch (error: any) {
      setLoading(false);
      setError(error);
    }
  };

  const input_style = `form-control block w-full px-4 py-5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded 
    transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`;

  return (
    <form>
      {error && (
        <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
      )}

      <div className="mb-6">
        <TextInput
          type="email"
          label={"Email"}
          error={errors["email"]}
          {...register("email")}
        />
      </div>
      <div className="mb-6">
        <TextInput
          type="password"
          label={"Password"}
          error={errors["password"]}
          {...register("password")}
        />
      </div>
      <CustomButton onClick={handleSubmit(onSubmit)} type="submit">
        Sign Up
      </CustomButton>
    </form>
  );
};
