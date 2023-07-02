import DrawerMenu from "@/components/core/drawerMenu";
import "../globals.css";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "../providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col lg:flex-row min-h-[100%] min-w-[100%] max-h-[100%]">
      <DrawerMenu />
      <div
        className="flex w-[100%] h-[100vh] min-h-[100%] flex-col items-center overflow-y-auto overflow-x-hidden p-6"
        style={{ scrollbarWidth: "thin" }}>
        {children}
      </div>
    </section>
  );
}
