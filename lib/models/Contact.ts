import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
    {
        nsId: { // User who collected this contact
            type: mongoose.Schema.Types.ObjectId,
            ref: "NSIdentity",
            required: true,
        },
        name: { type: String, required: true },
        email: { type: String },
        phone: { type: String },
        jobTitle: { type: String },
        company: { type: String },
        notes: { type: String },
        source: {
            type: String,
            enum: ["card_tap", "qr_scan", "link_share", "manual"],
            default: "card_tap",
        },
        capturedAt: { type: Date, default: Date.now },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export const Contact =
    mongoose.models.Contact || mongoose.model("Contact", ContactSchema);
