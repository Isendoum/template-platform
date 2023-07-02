import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { fieldFactory } from "./fieldFactory";

import CustomButton from "../buttons/Button";
import { IField } from "./types";

const FormRenderer = ({
  onSubmit,
  schema,
  formConfig,
}: {
  onSubmit: (data: any) => void;
  schema: any;
  formConfig: IField[];
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<any>({ resolver: yupResolver(schema) });

  return (
    <form>
      {fieldFactory(errors, register, formConfig)}
      <CustomButton onClick={handleSubmit(onSubmit)} type="submit">
        Sign Up
      </CustomButton>
    </form>
  );
};

export default FormRenderer;
