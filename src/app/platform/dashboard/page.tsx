import CustomButton from "@/components/core/buttons/Button";
import DateInput from "@/components/core/inputs/DateInput";
import TextInput from "@/components/core/inputs/TextInput";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { supabase } from "../../../lib/supabaseClient";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  console.log(JSON.stringify(session, null, 2));

  let { data: Cars, error } = await supabase.from("Cars").select("*");

  return (
    <div className="flex flex-col w-[100%] max-h-[100%]">
      <h1 className="block font-sans text-5xl font-semibold leading-tight tracking-normal text-inherit antialiased">
        Dashboard
      </h1>
      {Cars?.map((car) => (
        <div>
          {car.name} {car.color}
        </div>
      ))}
    </div>
  );
};
export default Dashboard;
