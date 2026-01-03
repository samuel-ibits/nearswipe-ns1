import mongoose from "mongoose";

export interface IConfig {
    _id: string;
    exchangeRate: number;
    maintenanceMode: boolean;
    allowSignups: boolean;
}

const ConfigSchema = new mongoose.Schema(
    {
        exchangeRate: { type: Number, default: 1500 },
        maintenanceMode: { type: Boolean, default: false },
        allowSignups: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export const Config =
    mongoose.models.Config || mongoose.model("Config", ConfigSchema);
