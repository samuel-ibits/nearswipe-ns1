import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectDB from "@/lib/db";
import { User } from "@/lib/models/User";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, password } = body;

    connectDB();

    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json(
        { message: "Account does not exist" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    user.password = hashedPassword;
    user.verificationCode = null;

    await user.save();

    return NextResponse.json(
      { message: "Password reset successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Reset Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
