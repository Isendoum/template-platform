import Link from "next/link";
export default function Home() {
  return (
    <div className="flex flex-col w-[100%] h-[100vh] items-center">
      <div className="animate-fade-in p-8 rounded-lg text-center">
        <h1 className="text-4xl font-bold p-8">Welcome to Template app</h1>
      </div>
      <div className="animate-fade-in flex flex-col text-center p-8 rounded-lg w-[80%] mb-16">
        <div className="flex flex-col lg:flex-row justify-around w-[100%]">
          <p className="text-xl p-2 hover-grow">
            A next js (13.4.3) template platform. Start building your platform
            with the basics done.
          </p>
        </div>
      </div>

      <div className="animate-fade-in flex flex-col text-center p-8 rounded-lg w-[80%] bg-gray-800">
        <h2 className="text-3xl font-bold p-8">Features included</h2>
        <div className="flex flex-col lg:flex-row justify-start w-[100%]">
          <p className="text-xl p-2 hover-grow">
            Google authentication with Next Auth.
          </p>
          <p className="text-xl p-2 hover-grow">
            Postgresql for data persistence with Prisma.
          </p>
          <p className="text-xl p-2 hover-grow">
            Build forms with react-hook-forms.
          </p>
          <p className="text-xl p-2 hover-grow">Already implemented inputs.</p>
        </div>
      </div>
    </div>
  );
}
