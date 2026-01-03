import { User } from "@/lib/models/User";
import { NSIdentity } from "@/lib/models/NSIdentity";
import { generateUsername } from "@/lib/server-utils";

/**
 * Retrieves the NSIdentity for a user.
 * If verifyExists is false (default), it attempts to create one if missing.
 */
export async function getOrCreateIdentity(userId: string) {
    let identity = await NSIdentity.findOne({ user_id: userId });

    if (!identity) {
        // Identity missing? Let's fix it on the fly (Auto-migration)
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }

        const baseName =
            user.firstName && user.lastName
                ? `${user.firstName}${user.lastName}`
                : user.email.split("@")[0];

        const username = await generateUsername(baseName);

        identity = await NSIdentity.create({
            user_id: user._id,
            username: username,
        });
    }

    return identity;
}
