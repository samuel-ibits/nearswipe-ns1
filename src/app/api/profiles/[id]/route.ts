import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Profile } from "@/lib/models/Profile";
import { requireAuth } from "@/lib/middleware/requireAuth";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const decoded = requireAuth(req);
        await dbConnect();
        const { id } = await params;

        const profile = await Profile.findOne({ _id: id, user: decoded.sub });

        if (!profile) {
            return NextResponse.json(
                { message: "Profile not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ profile }, { status: 200 });
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

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const decoded = requireAuth(req);
        await dbConnect();
        const { id } = await params;
        const body = await req.json();

        const profile = await Profile.findOne({ _id: id, user: decoded.sub });

        if (!profile) {
            return NextResponse.json(
                { message: "Profile not found" },
                { status: 404 }
            );
        }

        // If setting to published, unpublish others
        if (body.isPublished && !profile.isPublished) {
            await Profile.updateMany(
                { user: decoded.sub, _id: { $ne: id }, isPublished: true },
                { isPublished: false }
            );
        }

        Object.assign(profile, body);
        await profile.save();

        return NextResponse.json({ profile }, { status: 200 });
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

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const decoded = requireAuth(req);
        await dbConnect();
        const { id } = await params;

        const profile = await Profile.findOneAndDelete({ _id: id, user: decoded.sub });

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
        if (err.message === "Unauthorized") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
