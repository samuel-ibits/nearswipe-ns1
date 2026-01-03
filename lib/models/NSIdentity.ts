import mongoose from "mongoose";

const NSIdentitySchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true, // One identity per user
        },
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        default_profile_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Profile",
        },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export const NSIdentity =
    mongoose.models.NSIdentity || mongoose.model("NSIdentity", NSIdentitySchema);
