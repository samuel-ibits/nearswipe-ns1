import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema(
  {
    nsId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NSIdentity",
      required: true,
    },
    profileType: {
      type: String,
      enum: ["business", "personal", "custom"],
      default: "personal",
    },
    brandName: { type: String, required: true }, // Display name or Company name
    description: { type: String },

    // Flexible arrays for contacts/socials rather than fixed structure
    socials: [
      {
        platform: { type: String }, // e.g., 'linkedin', 'twitter'
        url: { type: String },
        label: { type: String }, // User friendly label
      }
    ],
    websites: [
      {
        url: { type: String },
        label: { type: String },
      }
    ],

    theme: { type: String, default: "light" }, // light/dark or specific theme ID
    isActive: { type: Boolean, default: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export const Profile =
  mongoose.models.Profile || mongoose.model("Profile", ProfileSchema);
