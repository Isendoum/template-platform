import React from "react";
import { UseFormRegister } from "react-hook-form";

const SelectInput = React.forwardRef<
  HTMLSelectElement,
  {
    label: string;
    error?: any;
    options: { label: string; value: string }[];
  } & ReturnType<UseFormRegister<any>>
>(({ onChange, onBlur, name, label, error, options }, ref) => {
  return (
    <div className="w-full min-w-36 px-3 ">
      <div className="mb-5">
        <label
          className="mb-3 block text-base font-medium text-[#07074D]"
          htmlFor={name}
        >
          {label}
        </label>
        <select
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-sm"
          name={name}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
        >
          {options?.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {error && <p className="text-red-500">{error.message}</p>}
      </div>
    </div>
  );
});

SelectInput.displayName = "SelectInput";

export default SelectInput;
