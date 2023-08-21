import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
export async function GET() {
  const session = await getServerSession();

  const data = await prisma.user.findFirst({
    where: { email: { equals: session?.user?.email } },
  });

  return NextResponse.json({ data });
}
