import SimpleSpace from "@/components/core/spaces/SimpleSpace";
import { LoginForm } from "./form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="container mx-auto px-6 py-12 h-full flex justify-center items-center">
      <SimpleSpace>
        <LoginForm />
        <div className="flex flex-col">
          <Link
            className="inline-block mt-4 self-center"
            href="/forgot-password">
            <span className="text-1xl text-black hover:underline">{`Forgot password`}</span>
          </Link>
          <Link className="inline-block mt-4 self-center" href="/signUp">
            <span className="text-1xl text-black hover:underline">{`Don't have an account? Sign up!`}</span>
          </Link>
        </div>
      </SimpleSpace>
    </div>
  );
}
