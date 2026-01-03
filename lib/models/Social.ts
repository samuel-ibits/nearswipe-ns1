import mongoose from "mongoose";

export enum Platform {
  Facebook = "Facebook",
  Twitter = "Twitter",
  Instagram = "Instagram",
  LinkedIn = "LinkedIn",
  TikTok = "TikTok",
  YouTube = "YouTube",
  Website = "Website",
  X = "X",
}

export const SocialSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  platform: { type: String, enum: Object.values(Platform), required: true },
  url: { type: String },
  icon: { type: String },
  handle: { type: String },
});

export const Social =
  mongoose.models.Social || mongoose.model("Social", SocialSchema);
