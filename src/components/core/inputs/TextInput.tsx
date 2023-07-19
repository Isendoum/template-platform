import React, { HTMLProps } from "react";
import { UseFormRegister } from "react-hook-form";

type TextInputProps = HTMLProps<HTMLInputElement>;

const TextInput = React.forwardRef<
  HTMLInputElement & TextInputProps,
  { label: string; error?: any; type?: string } & ReturnType<
    UseFormRegister<any>
  >
>(({ onChange, onBlur, name, label, error, type }, ref) => (
  <div className="w-full min-w-36 px-3 ">
    <div className="mb-5">
      <label
        className="mb-3 block text-base font-medium text-[#07074D]"
        htmlFor={label}>
        {label}
      </label>
      <input
        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-sm"
        type={type}
        name={name}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  </div>
));

TextInput.displayName = "TextInput";

export default TextInput;
