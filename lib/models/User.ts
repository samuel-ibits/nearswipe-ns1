import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: false }, // Optional at signup, filled later
  lastName: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  phone: { type: String, unique: true }, // Changed from phoneNumber to phone to match spec
  country: { type: String },
  password: { type: String, required: true }, // stored as hash
  status: { type: String, enum: ["active", "inactive", "suspended"], default: "active" },
  created_at: { type: Date, default: Date.now },
  metadata: { type: Map, of: String }, // For flexible extra data

  // Legacy/System fields (kept for compatibility/auth logic if needed)
  isVerified: { type: Boolean, default: false },
  verificationCode: { type: String },
  refreshTokenJTI: { type: String, default: null },
  role: { type: String, enum: ["admin", "client", "manager", "user"], default: "user" },
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
