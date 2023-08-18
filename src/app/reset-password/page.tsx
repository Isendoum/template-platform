"use client";
import CustomButton from "@/components/core/buttons/Button";
import SimpleSpace from "@/components/core/spaces/SimpleSpace";
import { useRouter } from "next/navigation";
import { ResetPasswordForm } from "./form";

export default function SignUpEmailConfirmErrorPage() {
  const router = useRouter();
  return (
    <div className="container mx-auto px-6 py-12 h-full flex justify-center items-center">
      <SimpleSpace>
        <ResetPasswordForm />
      </SimpleSpace>
    </div>
  );
}
