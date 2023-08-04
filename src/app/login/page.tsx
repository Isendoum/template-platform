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
            className="inline-block mt-4 self-center px-6 py-3 text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600"
            href="/signUp">
            <span className="text-1xl ">{`Don't have an account? Sign up!`}</span>
          </Link>
        </div>
      </SimpleSpace>
    </div>
  );
}
