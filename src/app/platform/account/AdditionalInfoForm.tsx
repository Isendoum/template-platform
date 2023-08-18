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
  firstName: string;
  lastName: string;
  address: string;
};

export const AdditionalInfoForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // we can assing to watch a spesific field
  // const emailW = watch("email");
  const validationSchema = yup
    .object({
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      address: yup.string().required(),
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
      await axiosInstance.post("account/updateUserAdditionalInfo", values);
      setLoading(false);
    } catch (error: any) {
      alert(error);
      setLoading(false);
      setError(error);
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
          label={"First name"}
          error={errors["firstName"]}
          {...register("firstName")}
        />
      </div>
      <div className="mb-6">
        <TextInput
          type="text"
          label={"Last name"}
          error={errors["lastName"]}
          {...register("lastName")}
        />
      </div>
      <div className="mb-6">
        <TextInput
          type="text"
          label={"Address"}
          error={errors["address"]}
          {...register("address")}
        />
      </div>
      <CustomButton onClick={handleSubmit(onSubmit)} type="submit">
        update
      </CustomButton>
    </form>
  );
};
