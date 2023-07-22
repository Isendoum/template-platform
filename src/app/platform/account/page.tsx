import SimpleSpace from "@/components/core/spaces/SimpleSpace";
import BasicInfoForm from "./BasicInfoForm";

const Account = async () => {
  //   const session = await getServerSession(authOptions);
  //   console.log("session page", session);
  return (
    <div className="flex flex-col w-[100%] max-h-[100%]">
      <h1 className="block font-sans text-5xl font-semibold leading-tight tracking-normal text-inherit antialiased">
        Account
      </h1>
      <SimpleSpace>
        <BasicInfoForm />
      </SimpleSpace>
    </div>
  );
};

export default Account;
