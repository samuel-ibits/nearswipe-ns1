import mongoose from "mongoose";

const WalletSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        balance: {
            type: Number,
            default: 0,
        },
        currency: {
            type: String,
            default: "NGN",
        },
    },
    { timestamps: true }
);

const Wallet = mongoose.models.Wallet || mongoose.model("Wallet", WalletSchema);

export default Wallet;
