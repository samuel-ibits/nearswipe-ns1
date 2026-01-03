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

    const { email, password, firstName, lastName, country, phone } = parsed.data;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 400 }
      );
    }

    const joinedAt = new Date();
    const hashedPassword = await bcrypt.hash(password, 12);
    // Generate base username from email or name
    const baseName = firstName && lastName ? `${firstName}${lastName}` : email.split('@')[0];
    const username = await generateUsername(baseName);
    const verificationCode = generateVerificationCode();

    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      country,
      phone,
      verificationCode,
      isVerified: false,
      created_at: joinedAt,
      // Status and Role will use defaults from Model ('active', 'user')
    });

    const savedUser = await newUser.save();

    // Create NSIdentity automatically
    const newIdentity = new NSIdentity({
      user_id: savedUser._id,
      username: username, // Assign generated username to Identity
    });

    await newIdentity.save();

    await sendVerificationEmail(email, verificationCode);

    return NextResponse.json(
      { message: "Verification code sent to your email", userId: savedUser._id, nsId: newIdentity._id },
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
