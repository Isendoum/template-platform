import SimpleSpace from "@/components/core/spaces/SimpleSpace";
import { LoginForm } from "./form";

export default function LoginPage() {
  return (
    <div className="container mx-auto px-6 py-12 h-full flex justify-center items-center">
      <SimpleSpace>
        <LoginForm />
      </SimpleSpace>
    </div>
  );
}
