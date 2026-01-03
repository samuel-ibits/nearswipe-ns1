// app/api/admin/signup/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/lib/mailer";
import { generateVerificationCode } from "@/lib/functions";
import { generateUsername } from "@/lib/server-utils";
import connectDB from "@/lib/db";
import { User } from "@/lib/models/User";
import { NSIdentity } from "@/lib/models/NSIdentity";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  country: z.string().optional(),
  // phoneNumber is optional now or later
  phone: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    await connectDB();

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid input", errors: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { phone, email, password } = parsed.data;

    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 400 }
      );
    }

    const joinedAt = new Date();
    const hashedPassword = await bcrypt.hash(password, 12);
    const username = await generateUsername(joinedAt);
    const verificationCode = generateVerificationCode();

    const newUser = new User({
      phone,
      email,
      password: hashedPassword,
      username,
      verificationCode,
      isVerified: false,
      joinedAt,
    });

    await newUser.save();

    await sendVerificationEmail(email, verificationCode);

    return NextResponse.json(
      { message: "Verification code sent to your email" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Sign-Up Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
