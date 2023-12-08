import SimpleSpace from "@/components/core/spaces/SimpleSpace";
import { SignUpForm } from "./form";

export default function SignUpPage() {
   return (
      <div className="container mx-auto px-6 py-12 h-full flex justify-center items-center">
         <SimpleSpace>
            <SignUpForm />
         </SimpleSpace>
      </div>
   );
}
