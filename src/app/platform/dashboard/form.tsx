"use client";

import CustomButton from "@/components/core/buttons/Button";

import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import SimpleSpace from "@/components/core/spaces/SimpleSpace";
import SelectInput from "@/components/core/inputs/SelectInput";
import { useAiContext } from "@/context/AiProvider";

type Inputs = {
   select: string;
};

export const Form = () => {
   const [loading, setLoading] = useState(false);
   const {
      setCategory,
      canReset,
      setShouldFetch,
      setCanReset,
      shouldFetch,
      category,
   } = useAiContext();

   // we can assing to watch a spesific field
   // const emailW = watch("email");
   const validationSchema = yup.object({
      select: yup.string().required(),
   });
   const {
      register,
      reset,
      handleSubmit,
      // setValue,
      watch,
      formState: { errors },
   } = useForm<Inputs>({ resolver: yupResolver(validationSchema) });
   const onSubmit = async (values: Inputs) => {
      setLoading(true);
      setCategory(values.select);
      setShouldFetch(true);
      setLoading(false);
   };
   const selectW = watch("select");
   return (
      <SimpleSpace>
         <SelectInput
            options={[
               { label: "Anime", value: "anime" },
               { label: "Fashion", value: "fashion" },
               { label: "Sports", value: "sports" },
               { label: "Electronics", value: "electronics" },
               { label: "Cryptocurrencies", value: "cryptocurrencies" },
               { label: "Cooking", value: "cooking" },
               { label: "Gardening", value: "gardening" },
               { label: "Music", value: "music" },
               { label: "Literature", value: "literature" },
               { label: "Travel", value: "travel" },
               { label: "Health & Wellness", value: "health_wellness" },
               { label: "Photography", value: "photography" },
               { label: "Technology", value: "technology" },
               { label: "Art", value: "art" },
               { label: "Education", value: "education" },
            ]}
            disabled={canReset}
            error={errors.select?.message}
            label="Select a category and generate website content"
            {...register("select", { value: category })}
         />

         {canReset ? (
            <CustomButton
               disabled={loading}
               onClick={() => {
                  reset({ select: undefined });
                  setCategory("");
                  setCanReset(false);
               }}
            >
               Reset
            </CustomButton>
         ) : (
            <CustomButton
               loading={shouldFetch}
               disabled={shouldFetch || selectW === "" || selectW === undefined}
               onClick={handleSubmit(onSubmit)}
               type="submit"
            >
               Submit
            </CustomButton>
         )}
         <div></div>
      </SimpleSpace>
   );
};
