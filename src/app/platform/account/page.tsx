import SimpleSpace from "@/components/core/spaces/SimpleSpace";
import BasicUserForm from "./BasicUserInfo";

const Account = async () => {
  return (
    <div className="flex flex-col w-[100%] max-h-[100%]">
      <h1 className="block font-sans text-5xl font-semibold leading-tight tracking-normal text-inherit antialiased mb-8">
        Account
      </h1>
      <div className="spacing-4 flex flex-col">
        <SimpleSpace>
          <h4 className="text-[#07074D] text-xl font-medium mb-8">
            Basic account info
          </h4>
          <BasicUserForm />
          <div className="text-xs text-black text-center">
            these info cannot be changed
          </div>
        </SimpleSpace>
        <SimpleSpace>
          <h4 className="text-[#07074D] text-xl font-medium mb-8">
            Additional information
          </h4>
        </SimpleSpace>
      </div>
    </div>
  );
};

export default Account;
