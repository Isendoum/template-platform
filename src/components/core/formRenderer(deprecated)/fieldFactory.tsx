import TextInput from "../inputs/TextInput";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { IField } from "./types";
import DateInput from "../inputs/DateInput";
export const fieldFactory = (
  errors: FieldErrors<any>,
  register: UseFormRegister<any>,
  formConfig: IField[]
) => {
  return formConfig.map((field) => {
    switch (field.type) {
      case "text":
        return (
          <div className="mb-6">
            <TextInput
              type={field?.type2 || field?.type}
              label={field.label}
              error={errors[field.name]}
              {...register(field.name)}
            />
          </div>
        );
      case "date":
        return (
          <div className="mb-6">
            <DateInput
              type={field?.type2 || field?.type}
              label={field.label}
              error={errors[field.name]}
              {...register(field.name)}
            />
          </div>
        );

      default:
        break;
    }
  });
};
