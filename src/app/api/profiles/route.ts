import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Profile } from "@/lib/models/Profile";
import { getOrCreateIdentity } from "@/lib/identity"; // Import new helper
import { requireAuth } from "@/lib/middleware/requireAuth";

export async function GET(req: NextRequest) {
    try {
        const decoded = requireAuth(req);
        await dbConnect();

        // Resolve Identity (Robustly)
        const identity = await getOrCreateIdentity(decoded.sub);

        const profiles = await Profile.find({ nsId: identity._id }).sort({
            isActive: -1, // Active first
            created_at: -1,
        });

        return NextResponse.json({ profiles }, { status: 200 });
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

export async function POST(req: NextRequest) {
    try {
        const decoded = requireAuth(req);
        await dbConnect();

        // Resolve Identity (Robustly)
        const identity = await getOrCreateIdentity(decoded.sub);

        const body = await req.json();

        // If creating an active profile, deactivate others
        if (body.isActive) {
            await Profile.updateMany(
                { nsId: identity._id, isActive: true },
                { isActive: false }
            );
        }

        const newProfile = await Profile.create({
            ...body,
            nsId: identity._id, // Link to Identity
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
