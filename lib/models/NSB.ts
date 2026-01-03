import mongoose from "mongoose";

const NSBSchema = new mongoose.Schema(
    {
        nsId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "NSIdentity",
            required: true,
        },
        provider: {
            type: String,
            enum: ["paystack", "stripe", "manual"],
            default: "paystack",
        },
        reference: { type: String, required: true },
        amount: { type: Number },
        currency: { type: String, default: "NGN" },
        status: {
            type: String,
            enum: ["pending", "success", "failed"],
            default: "pending",
        },
        metadata: { type: Map, of: String },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export const NSB =
    mongoose.models.NSB || mongoose.model("NSB", NSBSchema);
