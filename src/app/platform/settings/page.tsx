"use client";

import CustomButton from "@/components/core/buttons/Button";
import SimpleSpace from "@/components/core/spaces/SimpleSpace";
import { useTheme } from "next-themes";
const Settings = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex flex-col w-[100%] max-h-[100%]">
      <h1 className="block font-sans text-5xl font-semibold leading-tight tracking-normal text-inherit antialiased">
        Settings
      </h1>
      <SimpleSpace className="mt-10">
        <h1 className="text-xl font-bold mb-4 gap-4">Themes</h1>
        <div className="grid grid-cols-2 gap-4 flex-row">
          <CustomButton onClick={() => setTheme("light")}>Light</CustomButton>
          <CustomButton onClick={() => setTheme("dark")}>Dark</CustomButton>
        </div>
      </SimpleSpace>
    </div>
  );
};

export default Settings;
