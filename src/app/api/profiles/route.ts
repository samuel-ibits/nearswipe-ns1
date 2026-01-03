import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Profile } from "@/lib/models/Profile";
import { requireAuth } from "@/lib/middleware/requireAuth";

export async function GET(req: NextRequest) {
    try {
        const decoded = requireAuth(req);
        await dbConnect();

        const profiles = await Profile.find({ user: decoded.sub }).sort({
            createdAt: -1,
        });

        return NextResponse.json({ profiles }, { status: 200 });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        if (err.message === "Unauthorized") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const decoded = requireAuth(req);
        await dbConnect();

        const body = await req.json();

        // If creating a published profile, unpublish others
        if (body.isPublished) {
            await Profile.updateMany(
                { user: decoded.sub, isPublished: true },
                { isPublished: false }
            );
        }

        const newProfile = await Profile.create({
            ...body,
            user: decoded.sub,
        });

        return NextResponse.json({ profile: newProfile }, { status: 201 });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        if (err.message === "Unauthorized") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        return NextResponse.json(
            { message: "Internal Server Error", error: err.message },
            { status: 500 }
        );
    }
}
