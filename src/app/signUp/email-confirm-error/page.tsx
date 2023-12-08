"use client";

import SimpleSpace from "@/components/core/spaces/SimpleSpace";
import { EmailResendForm } from "./form";

export default function SignUpEmailConfirmErrorPage() {
   return (
      <div className="container mx-auto px-6 py-12 h-full flex justify-center items-center">
         <SimpleSpace>
            <div className="text-black text-center mb-4">Confirmation code has expired.</div>
            <EmailResendForm />
         </SimpleSpace>
      </div>
   );
}
