import CustomButton from "@/components/core/buttons/Button";
import DateInput from "@/components/core/inputs/DateInput";
import TextInput from "@/components/core/inputs/TextInput";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const Settings = async () => {
  //   const session = await getServerSession(authOptions);
  //   console.log("session page", session);
  return (
    <div className="flex flex-col w-[100%] max-h-[100%]">
      <h1 className="block font-sans text-5xl font-semibold leading-tight tracking-normal text-inherit antialiased">
        Settings
      </h1>
    </div>
  );
};

export default Settings;
