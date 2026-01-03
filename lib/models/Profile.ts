import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    company: { type: String },
    position: { type: String },
    picture: { type: String },
    socialMedia: [
      {
        platform: { type: String, required: true },
        url: { type: String, required: true },
        icon: { type: String }, // Optional: to store icon class or name if needed
      },
    ],
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Profile =
  mongoose.models.Profile || mongoose.model("Profile", ProfileSchema);
