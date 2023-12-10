"use client";

import CustomButton from "@/components/core/buttons/Button";
import TextInput from "@/components/core/inputs/TextInput";
import ButtonLoader from "@/components/core/loaders/LoadingIndicator";
import { axiosInstance } from "@/lib/axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

type Inputs = {
   email: string;
};
export const EmailResendForm = () => {
   const validationSchema = yup
      .object({ email: yup.string().required().email() })
      .required();
   const {
      register,
      handleSubmit,
      // setValue,
      // watch,
      formState: { errors, isSubmitting },
   } = useForm<Inputs>({ resolver: yupResolver(validationSchema) });
   const router = useRouter();

   const [error, setError] = useState("");

   const onSubmit = async (values: Inputs) => {
      try {
         await axiosInstance.get("/account/resendConfirmAccountEmail", {
            params: { email: values.email },
         });
         router.push("/success?message=A confirmation email has been sent.");
      } catch (error: any) {
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
               label={"Email"}
               error={errors["email"]}
               {...register("email")}
            />
         </div>

         <CustomButton
            disabled={isSubmitting}
            onClick={handleSubmit(onSubmit)}
            type="submit"
         >
            Resend
            {isSubmitting && <ButtonLoader />}
         </CustomButton>
      </form>
   );
};
