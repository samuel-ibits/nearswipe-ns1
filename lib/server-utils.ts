// lib/server-utils.ts
import { User } from "./models/User";

export async function generateUsername(joinedAt: Date): Promise<string> {
  // Use the last 6 digits of the timestamp
  const timestamp = joinedAt.getTime().toString(); // e.g. 1716289639000
  const suffix = timestamp.slice(-6); // e.g. "639000"
  const baseUsername = `user${suffix}`;
  let username = baseUsername;
  let count = 1;

  // Ensure the username is unique
  while (await User.findOne({ username })) {
    username = `${baseUsername}${count}`;
    count += 1;
  }

  return username;
}

