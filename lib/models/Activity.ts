import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema(
    {
        cardId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Card",
        },
        profileId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Profile",
        },
        actionType: {
            type: String,
            enum: ["tap", "view", "contact_save", "link_click"],
            required: true,
        },
        deviceType: { type: String }, // mobile, desktop, etc.
        location: { type: String }, // IP based or approximate
        metadata: { type: Map, of: String },
        timestamp: { type: Date, default: Date.now },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export const Activity =
    mongoose.models.Activity || mongoose.model("Activity", ActivitySchema);
