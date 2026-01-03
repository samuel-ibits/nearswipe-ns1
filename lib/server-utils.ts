import { NSIdentity } from "./models/NSIdentity";

export async function generateUsername(baseName: string | Date): Promise<string> {
  let seed = "";

  if (baseName instanceof Date) {
    // Fallback for legacy calls if any remain
    const timestamp = baseName.getTime().toString();
    seed = `user${timestamp.slice(-6)}`;
  } else {
    // Clean the base name: remove special chars, lowercase
    seed = baseName.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    if (seed.length < 3) seed = "user" + Math.floor(Math.random() * 10000);
  }

  let username = seed;
  let count = 0;

  // Check against NSIdentity uniqueness now, not User
  while (await NSIdentity.findOne({ username })) {
    count += 1;
    username = `${seed}${count}`;
  }

  return username;
}

