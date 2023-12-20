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
import RadioInput from "@/components/core/inputs/RadioInput";
import SwitchInput from "@/components/core/inputs/SwitchInput";
import NumberInput from "@/components/core/inputs/NumberInput";
import Modal from "@/components/core/modals/Modal";
type Inputs = {
   email: string;
   select: string;
   autocomplete: string;
   date: string;
   radio: string;
   switch: string;
   age: number;
};

export const Form = () => {
   const [loading, setLoading] = useState(false);
   const [showModal, setShowModal] = useState(false);
   const [message, setMessage] = useState("");

   // we can assing to watch a spesific field
   // const emailW = watch("email");
   const validationSchema = yup.object({
      //   username: yup.string(),
      email: yup.string().email().required(),
      select: yup.string().required(),
      autocomplete: yup.string().required(),
      date: yup.date().typeError("Enter a valid date"), // this changes how the date appears when is yup.date()
      age: yup.number().typeError("Enter a valid number"),
      switch: yup.bool().oneOf([true], "Field must be checked"),
      radio: yup.string().required(),
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
            setMessage(JSON.stringify(values, undefined, 2));
            setShowModal(true);
         }, 1000);
      } catch (error: any) {
         alert(error);
         setLoading(false);
      }
   };
   return (
      <div>
         <SimpleSpace>
            <TextInput
               error={errors.email?.message}
               label="Email"
               {...register("email")}
            />
            <SelectInput
               options={[{ label: "Red", value: "red" }]}
               error={""}
               label="Select"
               {...register("select")}
            />
            <AutoCompleteInput
               label="Autocomplete"
               error={errors.autocomplete?.message}
               options={[
                  { label: "Senior", value: "senior" },
                  { label: "Mid", value: "mid" },
                  { label: "Junior", value: "junior" },
                  { label: "Ele", value: "ele" },
                  { label: "Omg", value: "omg" },
                  { label: "Titan", value: "titan" },
               ]}
               {...register("autocomplete")}
            />
            <DateInput
               error={errors.date?.message}
               label="Date"
               {...register("date")}
            />
            <RadioInput
               error={errors.radio?.message}
               options={[
                  { label: "Yes", value: "true" },
                  { label: "No", value: "false" },
               ]}
               label="Radio"
               {...register("radio")}
            />
            <NumberInput
               error={errors.age?.message}
               min={18}
               label="Age"
               step="1"
               {...register("age")}
            />
            <SwitchInput
               error={errors.switch?.message}
               label="Agree with terms and conditions"
               {...register("switch")}
            />

            <CustomButton
               loading={loading}
               disabled={loading}
               onClick={handleSubmit(onSubmit)}
               type="submit"
            >
               Submit
            </CustomButton>
         </SimpleSpace>
         <Modal show={showModal} onClose={() => setShowModal(false)}>
            <div className="text-black">{message}</div>
         </Modal>
      </div>
   );
};
