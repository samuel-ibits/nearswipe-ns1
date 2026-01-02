// app/api/admin/signup/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { sendVerificationEmail } from "@/lib/mailer";
import { generateVerificationCode } from "@/lib/functions";
import connectDB from "@/lib/db";
import { User } from "@/lib/models/User";

const schema = z.object({
  email: z.string().email(),
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

    const { email } = parsed.data;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return NextResponse.json(
        { message: "Account not found" },
        { status: 400 }
      );
    }

    const verificationCode = generateVerificationCode();

    existingUser.verificationCode = verificationCode;

    await existingUser.save();

    // Send verification email
    await sendVerificationEmail(email, verificationCode);

    // logout user from the server
    const deleteCookieOptions = `HttpOnly; Path=/; Max-Age=0; ${
      process.env.NODE_ENV === "production" ? "Secure; SameSite=Lax;" : ""
    }`;

    const response = new NextResponse(
      JSON.stringify({ message: "A verification code was sent to your email" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    response.headers.append(
      "Set-Cookie",
      `access-token=; ${deleteCookieOptions}`
    );
    response.headers.append(
      "Set-Cookie",
      `refresh-token=; ${deleteCookieOptions}`
    );

    return response;
  } catch (error) {
    console.error("Reset Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
