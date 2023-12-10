"use client";

import CustomButton from "@/components/core/buttons/Button";

import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "@/components/core/inputs/TextInput";
import SimpleSpace from "@/components/core/spaces/SimpleSpace";
import SelectInput from "@/components/core/inputs/SelectInput";
import AutoCompleteInput from "@/components/core/inputs/AutoCompleteInput";
import DateInput from "@/components/core/inputs/DateInput";
type Inputs = {
   email: string;
   color: string;
   job: string;
   date: string;
};

export const Form = () => {
   const [loading, setLoading] = useState(false);

   // we can assing to watch a spesific field
   // const emailW = watch("email");
   const validationSchema = yup.object({
      //   username: yup.string(),
      email: yup.string().email().required(),
      //   password: yup.string(),
      //   password2: yup
      //      .string()
      //      .oneOf([yup.ref("password")], "Passwords must match")
      //      .required("password confirmation is required"),
   });
   const {
      register,
      handleSubmit,
      // setValue,
      // watch,
      formState: { errors },
   } = useForm<Inputs>({ resolver: yupResolver(validationSchema) });
   const onSubmit = async (values: Inputs) => {
      try {
         setLoading(true);

         setTimeout(() => {
            setLoading(false);
            alert(JSON.stringify(values, undefined, 2));
         }, 1000);
      } catch (error: any) {
         alert(error);
         setLoading(false);
      }
   };
   return (
      <SimpleSpace>
         <TextInput
            error={errors.email?.message}
            label="Email"
            {...register("email")}
         />
         <SelectInput
            options={[{ label: "Red", value: "red" }]}
            error={""}
            label="Color"
            {...register("color")}
         />
         <AutoCompleteInput
            label="Job"
            options={[
               { label: "Senior", value: "senior" },
               { label: "Mid", value: "mid" },
               { label: "Junior", value: "junior" },
            ]}
            {...register("job")}
         />
         <DateInput label="Date" {...register("date")} />

         <CustomButton
            loading={loading}
            onClick={handleSubmit(onSubmit)}
            type="submit"
         >
            Sign Up
         </CustomButton>
      </SimpleSpace>
   );
};
