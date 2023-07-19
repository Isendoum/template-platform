import { NextResponse } from "next/server";

export async function POST(req, res) {
  // const { body } = req;
  const body = await req.json();
  console.log(body);
  try {
    // const res = supabase.auth.signUp({
    //   email: body.email,
    //   password: body.password,
    // });
    // console.log(res);
    return NextResponse.json({ message: "ok" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.toString() }, { status: 400 });
  }
}
