import mongoose from "mongoose";

const TicketKeySchema = new mongoose.Schema(
    {
        verificationKey: { type: String, required: true, unique: true },
        ticketId: { type: String, required: true },
        eventId: { type: String, required: true },
        isExpired: { type: Boolean, default: false },
        isGroup: { type: Boolean, default: false },
        isUsed: { type: Number, default: 0 },
        groupLimit: { type: Number, default: 1 },
        isCheckedIn: { type: Boolean, default: false },
        checkInTime: { type: Date },
    },
    { timestamps: true }
);

export const TicketKey =
    mongoose.models.TicketKey || mongoose.model("TicketKey", TicketKeySchema);
export default TicketKey;
