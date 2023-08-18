"use client";

import CustomButton from "@/components/core/buttons/Button";
import TextInput from "@/components/core/inputs/TextInput";
import ButtonLoader from "@/components/core/loaders/ButtonLoader";
import { axiosInstance } from "@/lib/axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

type Inputs = {
  password: string;
  passwordConfirm: string;
};
export const ResetPasswordForm = () => {
  const validationSchema = yup
    .object({
      email: yup.string().email(),
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
  const params = useSearchParams();
  console.log(params.get("code"));

  const [error, setError] = useState("");

  const onSubmit = async (values: Inputs) => {
    try {
      const res = await axiosInstance.post("/account/updateUserPassword", {
        ...values,
        code: params.get("code"),
      });

      router.push("/success?message=Password has been successfully reset.");
    } catch (error: any) {
      console.log(error);
      setError(error?.message);
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
          type="password"
          label={"Password"}
          error={errors["password"]}
          {...register("password")}
        />
      </div>
      <div className="mb-6">
        <TextInput
          type="password"
          label={"Confirm Password"}
          error={errors["passwordConfirm"]}
          {...register("passwordConfirm")}
        />
      </div>

      <CustomButton
        disabled={isSubmitting}
        onClick={handleSubmit(onSubmit)}
        type="submit">
        Reset password
        {isSubmitting && <ButtonLoader />}
      </CustomButton>
    </form>
  );
};
