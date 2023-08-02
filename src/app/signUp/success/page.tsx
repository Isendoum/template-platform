"use client";
import CustomButton from "@/components/core/buttons/Button";
import SimpleSpace from "@/components/core/spaces/SimpleSpace";
import { useRouter } from "next/navigation";

export default function SignUpSuccessPage() {
  const router = useRouter();
  return (
    <div className="container mx-auto px-6 py-12 h-full flex justify-center items-center">
      <SimpleSpace>
        <div className="text-black text-center mb-4">
          A confirmation email has been sent.
        </div>
        <CustomButton onClick={() => router.replace("/")} type="submit">
          {`<--`}
        </CustomButton>
      </SimpleSpace>
    </div>
  );
}
