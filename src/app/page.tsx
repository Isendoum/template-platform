import Link from "next/link";
export default function Home() {
  return (
    <div className="flex flex-col space-y-10 w-[100%] h-[100vh] items-center justify-center">
      <Link
        href="/login"
        className="inline-block px-6 py-3 text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600">
        <span className="text-3xl ">Login</span>
      </Link>

      <Link
        className="inline-block px-6 py-3 text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600"
        href="/signUp">
        <span className="text-3xl ">Sign up</span>
      </Link>
    </div>
  );
}
