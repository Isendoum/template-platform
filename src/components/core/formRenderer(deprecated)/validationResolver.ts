import * as yup from "yup";
import { IField } from "./types";

export const validationResolver = (formConfig: IField[]) => {
  let schemaObject = {};

  formConfig.forEach((field) => {
    let fieldYup = null;

    switch (field.validation?.type) {
      case "string":
        fieldYup = yup.string();

        if (field.validation?.oneOf) {
          fieldYup = fieldYup?.oneOf(
            [yup.ref(field.validation.oneOf)],
            "Passwords must match"
          );
        }
        if (field.validation?.type2 === "email") {
          fieldYup = fieldYup?.email("Please enter a valid email");
        }
        if (field.validation?.required) {
          fieldYup = fieldYup?.required("Required field");
        }
        if (field.validation?.min) {
          fieldYup = fieldYup?.min(
            field.validation.min,
            `${field.label} must be at least ${field.validation.min} characters`
          );
        }
        if (field.validation?.max) {
          fieldYup = fieldYup?.max(
            field.validation.max,
            `${field.label} must be at most ${field.validation.max} characters`
          );
        }
        break;
        case "date":
          
      default:
        break;
    }

    // if (field.validation?.type === "string") {
    //   fieldYup = yup.string();

    //   if (field.validation?.oneOf) {
    //     fieldYup = fieldYup?.oneOf(
    //       [yup.ref(field.validation.oneOf)],
    //       "Passwords must match"
    //     );
    //   }
    //   if (field.validation?.type2 === "email") {
    //     fieldYup = fieldYup?.email("Please enter a valid email");
    //   }
    //   if (field.validation?.required) {
    //     fieldYup = fieldYup?.required("Required field");
    //   }
    //   if (field.validation?.min) {
    //     fieldYup = fieldYup?.min(
    //       field.validation.min,
    //       `${field.label} must be at least ${field.validation.min} characters`
    //     );
    //   }
    //   if (field.validation?.max) {
    //     fieldYup = fieldYup?.max(
    //       field.validation.max,
    //       `${field.label} must be at most ${field.validation.max} characters`
    //     );
    //   }
    // }

    schemaObject = { ...schemaObject, [field.name]: fieldYup };
  });

  return yup.object(schemaObject).required();
};
