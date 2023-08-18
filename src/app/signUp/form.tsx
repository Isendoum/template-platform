"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomButton from "@/components/core/buttons/Button";
import TextInput from "@/components/core/inputs/TextInput";
import { axiosInstance } from "@/lib/axios";
type Inputs = {
  username: string;
  email: string;
  password: string;
  password2: string;
};

export const SignUpForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // we can assing to watch a spesific field
  // const emailW = watch("email");
  const validationSchema = yup
    .object({
      username: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required(),
      password2: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("password confirmation is required"),
    })
    .required();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(validationSchema) });

  const onSubmit = async (values: Inputs) => {
    try {
      setLoading(true);
      await axiosInstance.post("auth/signUp", values);
      setLoading(false);
      router.push("/success?message=A confirmation email has been sent.");
    } catch (error: any) {
      alert(error);
      setLoading(false);
      setError(error?.message);
    }
  };

  return (
    <form>
      {error && (
        <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
      )}
      <div className="mb-6">
        <TextInput
          type="text"
          label={"Username"}
          error={errors["username"]}
          {...register("username")}
        />
      </div>
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
      <div className="mb-6">
        <TextInput
          type="password"
          label={"Confirm Password"}
          error={errors["password2"]}
          {...register("password2")}
        />
      </div>
      <CustomButton onClick={handleSubmit(onSubmit)} type="submit">
        Sign Up
      </CustomButton>
    </form>
  );
};
