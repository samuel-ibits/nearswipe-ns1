import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        date: { type: Date },
        location: { type: String },
        organizer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        tickets: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Ticket",
            },
        ],
    },
    { timestamps: true }
);

export const Event =
    mongoose.models.Event || mongoose.model("Event", EventSchema);
export default Event;
