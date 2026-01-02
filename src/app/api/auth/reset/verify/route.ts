import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { User } from "@/lib/models/User";

export async function POST(req: Request) {
  const { otp } = await req.json();

  try {
    await connectDB();
    const user = await User.findOne({ verificationCode: otp });

    if (!user) throw new Error("Invalid or expired OTP");

    return NextResponse.json(user, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json(
        { success: false, message: err.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Unknown error" },
      { status: 500 }
    );
  }
}
