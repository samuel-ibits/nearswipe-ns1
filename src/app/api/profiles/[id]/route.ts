import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Profile } from "@/lib/models/Profile";
import { getOrCreateIdentity } from "@/lib/identity";
import { requireAuth } from "@/lib/middleware/requireAuth";

async function getIdentityId(req: NextRequest) {
    const decoded = requireAuth(req);
    await dbConnect();
    // Robustly get identity
    const identity = await getOrCreateIdentity(decoded.sub);
    return identity._id;
}

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const nsId = await getIdentityId(req);
        const { id } = await params;

        const profile = await Profile.findOne({ _id: id, nsId });

        if (!profile) {
            return NextResponse.json(
                { message: "Profile not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ profile }, { status: 200 });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        if (err.message === "Unauthorized") return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        if (err.message === "Identity not found") return NextResponse.json({ message: "Identity not found" }, { status: 404 });

        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const nsId = await getIdentityId(req);
        const { id } = await params;
        const body = await req.json();

        const profile = await Profile.findOne({ _id: id, nsId });

        if (!profile) {
            return NextResponse.json(
                { message: "Profile not found" },
                { status: 404 }
            );
        }

        // If setting to active, deactivate others
        if (body.isActive && !profile.isActive) {
            await Profile.updateMany(
                { nsId, _id: { $ne: id }, isActive: true },
                { isActive: false }
            );
        }

        Object.assign(profile, body);
        await profile.save();

        return NextResponse.json({ profile }, { status: 200 });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        if (err.message === "Unauthorized") return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        return NextResponse.json(
            { message: "Internal Server Error", error: err.message },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const nsId = await getIdentityId(req);
        const { id } = await params;

        const profile = await Profile.findOneAndDelete({ _id: id, nsId });

        if (!profile) {
            return NextResponse.json(
                { message: "Profile not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Profile deleted successfully" },
            { status: 200 }
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        if (err.message === "Unauthorized") return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
