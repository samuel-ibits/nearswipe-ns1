import mongoose from "mongoose";

const CardSchema = new mongoose.Schema(
    {
        nsId: { // Owner of the card
            type: mongoose.Schema.Types.ObjectId,
            ref: "NSIdentity",
            required: true,
        },
        cardUid: { // Physical NFC ID or Unique Identifier
            type: String,
            required: true,
            unique: true,
        },
        secretKey: { // Simple security mechanism
            type: String,
            select: false, // Hidden by default
        },
        trackingId: { // Public ID for tracking if needed
            type: String,
        },
        status: {
            type: String,
            enum: ["active", "inactive", "blocked"],
            default: "inactive",
        },
        linkedProfileId: { // Which profile does this card point to?
            type: mongoose.Schema.Types.ObjectId,
            ref: "Profile",
        },
        issuedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export const Card =
    mongoose.models.Card || mongoose.model("Card", CardSchema);
