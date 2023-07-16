"use client";

import { axiosInstance } from "@/lib/axios";
import { getServerSession } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import { useCallback } from "react";

type Props = {
  children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};
