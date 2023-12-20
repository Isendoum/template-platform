import CustomButton from "@/components/core/buttons/Button";
import { Form } from "./form";

const Dashboard = () => {
   return (
      <div className="flex flex-col w-[100%] max-h-[100%]">
         <h1 className="block font-sans text-5xl font-semibold leading-tight tracking-normal text-inherit antialiased mb-4">
            Dashboard
         </h1>
         <div>
            <h2 className="block font-san text-4xl text-center">Form</h2>
            <Form />
         </div>
         <div>
            <h2 className="block font-san text-4xl text-center">Buttons</h2>
            <p>Text</p>
            <CustomButton variant="text">Text</CustomButton>
            <p>Primary</p>
            <CustomButton variant="primary">Primary</CustomButton>
            <p>Success</p>
            <CustomButton variant="success">Success</CustomButton>
         </div>
      </div>
   );
};
export default Dashboard;
